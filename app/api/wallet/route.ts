import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession, User } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

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
