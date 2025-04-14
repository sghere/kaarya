import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession, User } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { withAuth } from "../withAuth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      // If no session or user data, return an unauthorized response
      return NextResponse.json(
        { message: "You must be logged in to view wallet balance" },
        { status: 401 }
      );
    }

    const email = session.user.email;
    if (!email)
      return NextResponse.json({ message: "Invalid user" }, { status: 404 });

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // Fetch the wallet balance for the logged-in user
    const wallet = await prisma.wallet.findUnique({
      where: {
        userId: user?.id,
      },
    });

    if (!wallet) {
      // If the user does not have a wallet, return an error
      return NextResponse.json(
        { message: "Wallet not found for this user" },
        { status: 404 }
      );
    }

    // Return the wallet balance
    return NextResponse.json({ balance: wallet.balance });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error retrieving wallet balance", error: error.message },
      { status: 500 }
    );
  }
}

export const POST = withAuth(async (user: User, request) => {
  try {
    const { amount } = await request.json();

    if (!amount || amount <= 99)
      return NextResponse.json({ message: "Invalid Values" }, { status: 400 });

    const result = await prisma.$transaction(async (tx) => {
      const wallet = await tx.wallet.upsert({
        where: { userId: user.id },
        update: { balance: { increment: amount } },
        create: { userId: user.id, balance: amount },
      });

      await tx.transaction_logs.create({
        data: {
          walletId: wallet.id,
          amount,
          reason: "Wallet Top-up",
        },
      });

      return wallet.balance;
    });

    return NextResponse.json(
      { message: "Money added successfulyy", balance: result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
});
