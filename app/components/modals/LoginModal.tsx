"use client";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import { Input } from "../Input";
import { Button } from "../Button";
import toast from "react-hot-toast";
import Link from "next/link";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
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
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("Logged in successfully");
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };
  return (
    <Modal
      onClose={loginModal.onClose}
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Log in"
      footer={
        <>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
          <hr className="border-gray-200" />
          <Button variant="outline" onClick={() => signIn("google")}>
            <FcGoogle /> Continue with Google
          </Button>
          <Button variant="outline" onClick={() => signIn("github")}>
            <AiFillGithub />
            Continue with Github
          </Button>
          <div className="flex">
            Dont have an account ?
            <div className="text-sky-600 cursor-pointer hover:text-sky-800 pl-2">
              Sign up
            </div>
          </div>
        </>
      }
    >
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
    </Modal>
  );
};

export default LoginModal;
