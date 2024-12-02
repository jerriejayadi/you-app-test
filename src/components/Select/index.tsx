"use client";
import { cn } from "@/lib/utils";
import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  groupClassname?: string;
  label?: string;
}

export default function Select({
  label,
  groupClassname,
  ...props
}: SelectProps) {
  const { className, ...restProps } = { ...props };
  return (
    <div className={cn("w-full ", groupClassname)}>
      {label && <label className="mb-2">{label}</label>}
      <div
        className={cn(
          "flex focus-within:outline focus-within:outline-white/20 bg-white/5 rounded-lg w-full px-4 py-4 transition-all duration-150",
          className
        )}
      >
        <select
          {...restProps}
          className={cn(
            "bg-transparent focus:outline-none placeholder:text-white/40 w-full",
            props.className
          )}
        >
          {props.children}
        </select>
      </div>
    </div>
  );
}
