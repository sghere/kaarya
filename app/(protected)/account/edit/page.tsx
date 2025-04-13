"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { callbackify } from "util";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";

const EditProfile = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      number: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    try {
      setIsLoading(true);
      axios.put("/api/profile", {
        name: data.name,
        number: data.number,
      });
      toast.success("Profile updated successfully!");
      router.push("/account");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }

    console.log({ data });
  };
  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    <div className="p-6 grid gap-4">
      <h1 className="text-4xl font-bold">Edit profile</h1>

      <Input
        id="name"
        errors={errors}
        rules={{
          required: "Email is required",
        }}
        register={register}
      />

      <Input
        id="number"
        errors={errors}
        rules={{
          minLength: {
            value: 10,
            message: "Please insert valid phone no",
          },
        }}
        register={register}
      />
      <Button type="submit" onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </div>
    // </form>
  );
};

export default EditProfile;
