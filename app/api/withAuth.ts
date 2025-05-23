import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import prisma from "../lib/prisma";

type Handler = (user: User, ...args: any[]) => Promise<Response>;

export function withAuth(handler: Handler) {
  return async function (...args: any[]) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const existingUser = await prisma?.user.findUnique({
      where: { email: session.user.email },
    });

    if (!existingUser || existingUser === null || existingUser === undefined)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    return handler(existingUser as User, ...args);
  };
}
