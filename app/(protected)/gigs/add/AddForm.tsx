"use client";

import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { TextArea } from "@/app/components/Textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddForm = () => {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      budget: "",
      address: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // setIsLoading(true);
      axios.post("", {
        title: data.name,
        description: data.description,
        budget: data.budget,
        address: data.address,
      });
      console.log(data);
      toast.success("Profile updated successfully!");
      // router.push("/account");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div className="p-6 pb-[100px]">
      <div className="AddForm grid gap-4">
        <h1 className="text-xl font-bold">Add a gig</h1>
        <Input
          id="file"
          type="file"
          placeholder="File"
          rules={{ required: "Image is required" }}
          errors={errors}
          register={register}
        />
        <Input
          id="title"
          placeholder="Title"
          rules={{ required: "Title is required" }}
          errors={errors}
          register={register}
        />
        <TextArea
          id="description"
          rules={{ required: "Description is required" }}
          errors={errors}
          register={register}
        />
        <Input
          id="budget"
          type="number"
          rules={{ required: "Budget is required" }}
          errors={errors}
          register={register}
        />
        {/* <Input
          id="Address Line 1"
          placeholder="Address line 1"
          rules={{ required: "Address is required" }}
          errors={errors}
          register={register}
        />
        <Input
          id="Address Line 2"
          placeholder="Address line 2 (Optional)"
          errors={errors}
          register={register}
        />
        <Input
          id="city"
          placeholder="City"
          errors={errors}
          register={register}
        />
        <Input
          id="state"
          placeholder="State"
          errors={errors}
          register={register}
        />
        <Input
          id="zipcode"
          placeholder="zipcode"
          errors={errors}
          register={register}
        />
        <Input
          id="country"
          placeholder="Country"
          errors={errors}
          register={register}
        />
        <Input
          id="zipcode"
          placeholder="zipcode"
          errors={errors}
          register={register}
        />
        <Input
          id="country"
          placeholder="Country"
          errors={errors}
          register={register}
        /> */}
        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddForm;
