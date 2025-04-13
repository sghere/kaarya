import type { Metadata } from "next";
import SignUp from "@/app/components/auth/SingUp";

export const metadata: Metadata = {
  title: "SignUp | Kaarya",
  description: "A freelancer marketplace",
};
const Register = () => {
  return <SignUp />;
};

export default Register;
