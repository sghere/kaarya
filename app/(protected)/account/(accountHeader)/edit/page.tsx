"use client";

import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import getCurrentUser from "@/app/actions/getCurrentUser";

const EditProfile = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      axios.put("/api/profile", {
        name: data.name,
        number: data.number,
      });
      toast.success("Profile updated successfully!");
      router.push("/account");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="py-6 grid gap-4">
      {/* <h1 className="text-4xl font-bold">Edit profile</h1> */}

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
  );
};

export default EditProfile;
