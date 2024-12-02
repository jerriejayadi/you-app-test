"use client";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  groupClassname?: string;
  label?: string;
}

export default function Select({ label, groupClassname, ...props }: InputProps) {
  const { className, ...restProps } = { ...props };
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <div className={cn("w-full ", groupClassname)}>
      {label && <label className="mb-2">{label}</label>}
      <div
        className={cn(
          "flex focus-within:outline focus-within:outline-white/20 bg-white/5 rounded-lg w-full px-4 py-4 transition-all duration-150",
          className
        )}
      >
        <input
          {...restProps}
          type={props.type === "password" && isVisible ? "text" : props.type}
          className={cn(
            "bg-transparent focus:outline-none placeholder:text-white/40 w-full",
            props.className
          )}
        />
        {props.type === "password" && (
          <button
            type="button"
            onClick={() => {
              setIsVisible(!isVisible);
            }}
            className="w-fit flex justify-end"
          >
            {isVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-eye size-5"
              >
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-eye-off size-5"
              >
                <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                <path d="m2 2 20 20" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
