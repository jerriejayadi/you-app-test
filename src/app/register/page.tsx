"use client";
import Input from "@/components/Input";
import { postRegister } from "@/service/auth";
import { PostRegisterPayload } from "@/types/Auth/PostRegister";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

interface RegisterFormProps {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}

export default function Register() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<RegisterFormProps>({
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });
  const [disabled, setDisabled] = useState<boolean>(false);
  const [passwordNotSame, setPasswordNotSame] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = { ...form };
    value[e.target.name as keyof typeof value] = e.target.value;
    setForm(value);
  };

  const checkIsFormEmpty = () => {
    return Object.values(form).some((value) => value.trim() === "");
  };

  const handleSubmit = () => {
    if (form.password !== form.confirm_password) {
      setPasswordNotSame(true);
    } else {
      const payload: PostRegisterPayload = {
        email: form.email,
        username: form.username,
        password: form.password,
      };
      postRegister(payload).then((res) => {
        alert(res.message);
        router.push(`/login`);
      });
    }
  };

  useEffect(() => {
    const isEmpty = checkIsFormEmpty();
    setPasswordNotSame(false);
    if (isEmpty) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [form]);
  return (
    <main className="flex flex-col items-start  min-h-screen px-4 py-9 text-white">
      <button className="flex gap-1  items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-left text-white size-6 shrink-0"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <p>Back</p>
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-6 flex-grow items-start justify-center w-full"
      >
        <p className="text-2xl font-semibold px-2">Register</p>
        <div className="flex flex-col gap-4 w-full">
          <Input
            className="text-xs"
            onChange={handleInputChange}
            name="email"
            placeholder="Enter Email"
            type="email"
          />
          <Input
            className="text-xs"
            onChange={handleInputChange}
            name="username"
            placeholder="Create Username"
          />
          <Input
            className="text-xs"
            onChange={handleInputChange}
            name="password"
            placeholder="Create Password"
            type="password"
          />
          <Input
            className="text-xs"
            onChange={handleInputChange}
            name="confirm_password"
            placeholder="Confirm Password"
            type="password"
          />
        </div>
        {passwordNotSame && (
          <p className="text-xs bg-red-500/60 px-4 py-2 w-full">
            Password not same
          </p>
        )}

        <button
          disabled={disabled || loading}
          className="w-full rounded-lg flex items-center justify-center bg-custom-linear px-4 py-3 disabled:opacity-30 active:opacity-60 transition-all duration-150 shadow-custom-linear disabled:shadow-none "
        >
          Register
        </button>
        <div className="w-full">
          <p className="text-center text-xs">
            Have an account?{" "}
            <Link className="text-golden underline" href="/login">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}
