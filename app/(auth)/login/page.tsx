import Login from "@/app/components/auth/Login";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Kaarya",
  description: "A freelancer marketplace",
};
const login = () => {
  return <Login />;
};

export default login;
