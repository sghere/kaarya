import * as React from "react";
import { cn } from "../lib/utils";
import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface TextAreaProps extends React.ComponentProps<"textarea"> {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  id: string;
  rules: RegisterOptions;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, required, rules, register, ...props }, ref) => {
    const { id, errors } = props;

    return (
      <div className="w-full">
        <textarea
          // ref={ref}.
          {...props}
          {...register(id, rules)}
          className={cn(
            "p-4 rounded-xl w-full border border-gray-200 outline-none focus:outline-none",
            { "border-red-600 border-2 text-red-600": errors[id] },
            className
          )}
          placeholder={id}
        />
        {errors[id]?.message && (
          <p className="text-red-600">{String(errors[id].message)}</p>
        )}
      </div>
    );
  }
);
TextArea.displayName = "TextArea";

export { TextArea };
