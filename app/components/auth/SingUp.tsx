"use client";
import { useState } from "react";
import { Input } from "../Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "../Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { cn } from "@/app/lib/utils";

const SingUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      Name: "",
      Email: "",
      Password: "",
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div
      className={cn("size-full grid place-items-center", {
        "disbaled pointer-events-none": isLoading,
      })}
    >
      <div className="grid gap-4 p-4 w-full sm:w-[400px]">
        <div className="Heading">
          <h3 className="font-bold text-3xl">Welcome to Kaarya</h3>
          <h6 className="text-gray-700">Create an account</h6>
        </div>
        <div className="Form grid gap-4 py-6">
          <Input
            id="Name"
            rules={{ required: "Name is required" }}
            required
            register={register}
            errors={errors}
          />
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
          Already have an account ?
          <div
            className="text-sky-600 cursor-pointer hover:text-sky-800 pl-2"
            onClick={() => router.push("/login")}
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
