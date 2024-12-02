"use client";
import Input from "@/components/Input";
import useCookies from "@/hooks/useCookies";
import { postLogin } from "@/service/auth";
import { getProfile } from "@/service/users";
import { PostLoginPayload } from "@/types/Auth/PostLogin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

interface LoginFormProps {
  email: string;
  password: string;
}

export default function Login() {
  const { getCookie, setCookie } = useCookies();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<LoginFormProps>({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = { ...form };
    value[e.target.name as keyof typeof value] = e.target.value;
    setForm(value);
  };

  const checkIsFormEmpty = () => {
    return Object.values(form).some((value) => value.trim() === "");
  };

  const handleSubmit = () => {
    const value = { ...form };
    let payload: PostLoginPayload;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value.email)) {
      payload = { ...form, email: value.email, username: "" };
    } else {
      payload = { ...form, email: "", username: value.email };
    }

    postLogin(payload).then((res) => {
      if (res.access_token) {
        setCookie("access_token", res.access_token);
        router.push(`/`);
      } else {
        alert(res.message);
      }
    });
  };

  useEffect(() => {
    const isEmpty = checkIsFormEmpty();
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
        <p className="text-2xl font-semibold px-2">Login</p>
        <div className="flex flex-col gap-4 w-full">
          <Input
            className="text-xs"
            onChange={handleInputChange}
            name="email"
            placeholder="Enter Username/Email"
          />
          <Input
            className="text-xs"
            onChange={handleInputChange}
            name="password"
            placeholder="Enter Password"
            type="password"
          />
        </div>
        <button
          disabled={disabled || loading}
          className="w-full rounded-lg flex items-center justify-center bg-custom-linear px-4 py-3 disabled:opacity-30 active:opacity-60 transition-all duration-150 shadow-custom-linear disabled:shadow-none "
        >
          Login
        </button>
        <div className="w-full">
          <p className="text-center text-xs">
            No Account?{" "}
            <Link className="text-golden underline" href="/register">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}
