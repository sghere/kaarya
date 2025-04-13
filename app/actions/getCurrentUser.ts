import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/app/lib/prisma";

export async function getSession() {
  return await getServerSession(authOptions);
}

const getCurrentUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) return null;

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
      include: { wallet: true },
    });
    if (!currentUser) return null;
    return currentUser;
  } catch (error) {
    return console.error(error);
  }
};

export default getCurrentUser;
