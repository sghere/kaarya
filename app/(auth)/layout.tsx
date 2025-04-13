import { Nunito } from "next/font/google";
import type { Metadata } from "next";

import "../globals.css";
import { FC, ReactNode } from "react";
import getCurrentUser from "../actions/getCurrentUser";
import { redirect } from "next/navigation";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaarya Auuth",
  description: "A freelancer marketplace",
};

interface AuthLayoutProps {
  children: ReactNode;
}

const layout: FC<AuthLayoutProps> = async ({ children }) => {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    redirect("/");
  }
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
};

export default layout;
