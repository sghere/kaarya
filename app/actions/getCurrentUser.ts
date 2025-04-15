import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/app/lib/prisma";

export async function getSession() {
  return await getServerSession(authOptions);
}

const getCurrentUser = async () => {
  try {
    const session = await getSession();
    console.log("🔥 SESSION:", session);

    if (!session?.user?.email) {
      console.log("❌ No session email");
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { wallet: true },
    });

    console.log("✅ CURRENT USER:", currentUser);

    return currentUser || null;
  } catch (error) {
    console.error("❌ ERROR in getCurrentUser:", error);
    return null;
  }
};

export default getCurrentUser;
