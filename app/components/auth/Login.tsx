"use client";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../Button";
import { Input } from "../Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      Email: "",
      Password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", { ...data, redirect: true, callbackUrl: "/" });
  };
  return (
    <div className="size-full grid place-items-center">
      <div className="grid gap-4 p-4 w-full sm:w-[400px]">
        <div className="Heading">
          <h3 className="font-bold text-3xl">Welcome Back!</h3>
          <h6 className="text-gray-700">Log in an account</h6>
        </div>
        <div className="Form grid gap-4 py-6">
          <Input
            id="Email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            }}
            register={register}
            errors={errors}
          />
          <Input
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            id="Password"
            type="password"
            errors={errors}
            register={register}
          />
        </div>

        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
        <hr className="border-gray-200" />
        <Button
          variant="outline"
          onClick={() => signIn("google", { redirect: true, callbackUrl: "/" })}
        >
          <FcGoogle /> Continue with Google
        </Button>
        <Button
          variant="outline"
          onClick={() => signIn("github", { redirect: true, callbackUrl: "/" })}
        >
          <AiFillGithub />
          Continue with Github
        </Button>
        <div className="flex">
          Dont have an account ?
          <div
            className="text-sky-600 cursor-pointer hover:text-sky-800 pl-2"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
