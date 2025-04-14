"use client";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import useApiStore from "@/app/hooks/useApiStore";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GoPlus } from "react-icons/go";

const AddMoney = () => {
  const [Amount, setAmount] = useState<number>(0);

  const amountButtons = [100, 500, 1000, 2000];
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { amount: 0 },
  });
  const { setValue: setBalance } = useApiStore();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const payload = { ...data, reason: "User added topup" };
    axios.post("/api/wallet", payload).then((res) => {
      toast.success("Successfully added");
      const { data } = res;
      if (data.balance) {
        setBalance("wallet", { balance: data.balance });
      }
    });
  };
  return (
    <div className="grid gap-6">
      <span className="grid gap-2">
        <label className="font-medium">Add Credits</label>
        <Input
          //   onChange={(e) => setAmount(e.target.value)}
          id="amount"
          //   value={Amount}
          errors={errors}
          placeholder="Amount eg.500"
          register={register}
        />
        <div className="flex gap-2">
          {amountButtons.map((e) => (
            <Button
              onClick={() => {
                setAmount((amount) => amount + e);
                setValue("amount", Amount + e);
              }}
              variant={"outline"}
              className="h-8 pl-1 pr-2 gap-0"
            >
              <GoPlus />
              {e}
            </Button>
          ))}
          <Button
            variant={"outline"}
            onClick={() => {
              setAmount(0);
              setValue("amount", 0);
            }}
            className="h-8 pl-1 pr-2 gap-0"
          >
            Clear
          </Button>
        </div>
      </span>
      <Button
        disabled={Amount === 0}
        type="submit"
        onClick={handleSubmit(onSubmit)}
      >
        Add {Amount}
      </Button>
    </div>
  );
};

export default AddMoney;
