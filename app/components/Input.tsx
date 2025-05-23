import * as React from "react";
import { cn } from "../lib/utils";
import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface InputProps extends React.ComponentProps<"input"> {
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
  id: string;
  rules?: RegisterOptions;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, required, type, rules, register = () => {}, ...props },
    ref
  ) => {
    const { id, errors = {}, placeholder } = props;

    return (
      <div className="w-full">
        <input
          // ref={ref}.
          {...props}
          {...register(id, rules)}
          type={type}
          className={cn(
            "p-4 rounded-xl w-full border border-gray-200 outline-none focus:outline-none",
            { "border-red-600 border-2 text-red-600": errors[id] },
            className
          )}
          placeholder={placeholder || id}
        />
        {errors[id]?.message && (
          <p className="text-red-600">{String(errors[id].message)}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
