import { Nunito } from "next/font/google";
import type { Metadata } from "next";
import "../globals.css";
import Navbar from "../components/navbar/Navbar";
import ToasterProvider from "../providers/ToasterProvider";
import getCurrentUser from "../actions/getCurrentUser";
import { redirect } from "next/navigation";
import BottomNavbar from "../components/navbar/BottomNavbar";

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
        <Navbar currentUser={currentUser} />
        {children}
        <BottomNavbar currentUser={currentUser} />
      </body>
    </html>
  );
}
