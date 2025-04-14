import { User } from "next-auth";
import prisma from "@/app/lib/prisma";
import { EventCallbacks } from "next-auth";

interface Message {
  user: User;
}

export const authEvents: Partial<EventCallbacks> = {
  async signIn(message: Message) {
    const { user } = message;
    if (!user.email) return;
    const existingUser = await prisma?.user.findUnique({
      where: { email: user.email },
    });
    if (existingUser) {
      const wallet = await prisma.wallet.findUnique({
        where: { userId: existingUser.id },
      });
      if (!wallet) {
        await prisma.wallet.create({
          data: {
            userId: existingUser.id,
            balance: 10,
            transaction_logs: {
              create: {
                amount: 10,
                reason: "signup bonus",
              },
            },
          },
        });
      }
    }
  },
};
