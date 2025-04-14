import bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { title, description, budget, address } = body;
  const gig = await prisma.gig.create({
    data: {
      title,
      description,
      budget: Number(budget),
      address,
    },
  });

  return NextResponse.json(gig);
}
