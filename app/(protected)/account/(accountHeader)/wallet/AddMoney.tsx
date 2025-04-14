"use client";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { cn } from "@/app/lib/utils";
import { useState } from "react";
import { GoPlus } from "react-icons/go";

const AddMoney = () => {
  const [Amount, setAmount] = useState<number>(0);
  const amountButtons = [100, 500, 1000, 2000];
  return (
    <div className="grid gap-6">
      <span className="grid gap-2">
        <label className="font-medium">Add Credits</label>
        <Input
          //   onChange={(e) => setAmount(e.target.value)}
          id="amount"
          value={Amount}
          placeholder="Amount eg.500"
        />
        <div className="flex gap-2">
          {amountButtons.map((e) => (
            <Button
              onClick={() => {
                setAmount((amount) => parseInt(amount) + e);
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
            onClick={() => setAmount(0)}
            className="h-8 pl-1 pr-2 gap-0"
          >
            Clear
          </Button>
        </div>
      </span>
      <Button
        className={cn({
          "disabled opacity-70 cursor-not-allowed": Amount === 0,
        })}
      >
        Add {Amount}
      </Button>
    </div>
  );
};

export default AddMoney;
