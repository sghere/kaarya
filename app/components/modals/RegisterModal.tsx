"use client";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import { Input } from "../Input";
import { Button } from "../Button";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Modal
      onSubmit={handleSubmit(onSubmit)}
      onClose={registerModal.onClose}
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Login"
      footer={
        <>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
          <hr className="border-gray-200" />
          <Button variant="outline">
            <FcGoogle /> Google
          </Button>
          <Button variant="outline">
            <AiFillGithub />
            Github
          </Button>
        </>
      }
    >
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
    </Modal>
  );
};

export default RegisterModal;
