import { Nunito } from "next/font/google";

import type { Metadata } from "next";

import "../globals.css";
import Navbar from "../components/navbar/Navbar";
import RegisterModal from "../components/modals/RegisterModal";
import ToasterProvider from "../providers/ToasterProvider";
import LoginModal from "../components/modals/LoginModal";
import getCurrentUser from "../actions/getCurrentUser";
import { User } from "../generated/prisma";
import { redirect } from "next/navigation";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaarya",
  description: "A freelancer marketplace",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/login");
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
