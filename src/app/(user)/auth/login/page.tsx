"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosIn } from "@/lib/axios";
import { apiUrl } from "@/lib/constant";
import { userTokenAtom } from "@/store";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useAtom } from "jotai";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [getUserToken, setUserToken] = useAtom(userTokenAtom);

  const router = useRouter();

  if (getUserToken) {
    return redirect("/");
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const login = await axiosIn.post(`${apiUrl}/auth/login`, {
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      });

      if (login?.data.statusCode == 200) {
        setUserToken(login.data.data.token);
        toast.success("Login success");
      } else {
        toast.error("Login failed");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Error");
    }

    setIsLoading(false);
  };

  return (
    <section className="w-full inline-flex justify-center md:mt-14 px-4 md:px-0">
      <div className="md:w-[30rem] rounded-md bg-card flex flex-col gap-2 shadow-sm py-5 md:px-10">
        <h1 className="text-center text-xl md:text-2xl font-bold">Login</h1>
        <p className="text-muted-foreground text-sm text-light mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
          doloribus.
        </p>
        <form onSubmit={handleLogin} className="flex flex-col gap-2">
          <div className="w-full">
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              name="email"
              placeholder="email@mail.com"
              required
            />
          </div>
          <div className="w-full">
            <Label htmlFor="email">Password</Label>
            <div className="relative">
              <Input
                type={hidePassword ? "password" : "text"}
                name="password"
                placeholder="P@ssW0!2D"
                className="pr-10"
                required
              />
              {hidePassword ? (
                <EyeOpenIcon
                  className="absolute right-3 -translate-y-6"
                  onClick={() => setHidePassword((prev) => !prev)}
                />
              ) : (
                <EyeClosedIcon
                  className="absolute right-3 -translate-y-6"
                  onClick={() => setHidePassword((prev) => !prev)}
                />
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="mt-3 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
        <div className="mt-3">
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-primary hover:underline"
            >
              Register
            </Link>
          </p>

          <p className="text-center text-sm text-muted-foreground mt-2">
            Forgot password?{" "}
            <Link
              href="/auth/forgot-password"
              className="text-primary hover:underline"
            >
              Reset password
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
