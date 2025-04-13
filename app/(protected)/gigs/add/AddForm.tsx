"use client";

import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

const AddForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>();

  return (
    <div className="p-6">
      <div className="AddForm grid gap-4">
        <h1 className="text-xl font-bold">Add a gig</h1>
        <Input
          id="title"
          rules={{ required: "Title is required" }}
          errors={errors}
          register={register}
        />
        <Input
          id="description"
          type="textarea"
          rules={{ required: "Description is required" }}
          errors={errors}
          register={register}
        />
        <Input
          id="budget"
          type="textarea"
          rules={{ required: "Budget is required" }}
          errors={errors}
          register={register}
        />
        <Input
          id="address"
          type="textarea"
          rules={{ required: "Address is required" }}
          errors={errors}
          register={register}
        />
        <Button type="submit">Submit</Button>
      </div>
    </div>
  );
};

export default AddForm;
