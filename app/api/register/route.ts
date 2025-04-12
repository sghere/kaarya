import bcrypt from "bcrypt";
import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { Name, Email, Password } = body;
  const hashedPassword = await bcrypt.hash(Password, 12);
  const user = await prisma.user.create({
    data: {
      email: Email,
      name: Name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
