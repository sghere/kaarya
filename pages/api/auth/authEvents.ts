import prisma from "@/app/lib/prisma";

export const authEvents = {
  async signIn(message: any) {
    const { user } = message;
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
