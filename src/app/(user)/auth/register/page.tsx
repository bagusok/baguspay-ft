"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  return (
    <section className="w-full inline-flex justify-center md:mt-14">
      <div className="md:w-[30rem] rounded-md bg-card flex flex-col gap-2 shadow-sm py-5 md:px-10">
        <h1 className="text-center text-xl md:text-2xl font-bold">Register</h1>
        <p className="text-muted-foreground text-sm text-light mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
          doloribus.
        </p>
        <form action="" className="flex flex-col gap-2">
          <div className="w-full">
            <Label htmlFor="email">Long Name</Label>
            <Input type="text" name="email" placeholder="John Dow" required />
          </div>
          <div className="w-full">
            <Label htmlFor="email">Username</Label>
            <Input type="text" name="email" placeholder="jonzD12" required />
          </div>
          <div className="w-full">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="email@mail.com"
              required
            />
          </div>
          <div className="w-full">
            <Label htmlFor="email">Phone Number</Label>
            <Input type="text" name="number" placeholder="62" required />
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
          <div className="w-full">
            <Label htmlFor="email">Confirm Password</Label>
            <div className="relative">
              <Input
                type={hideConfirmPassword ? "password" : "text"}
                name="password"
                placeholder="P@ssW0!2D"
                className="pr-10"
                required
              />
              {hideConfirmPassword ? (
                <EyeOpenIcon
                  className="absolute right-3 -translate-y-6"
                  onClick={() => setHideConfirmPassword((prev) => !prev)}
                />
              ) : (
                <EyeClosedIcon
                  className="absolute right-3 -translate-y-6"
                  onClick={() => setHideConfirmPassword((prev) => !prev)}
                />
              )}
            </div>
          </div>

          <Button type="submit" className="mt-3">
            Register
          </Button>
        </form>
        <div className="mt-3">
          <p className="text-center text-sm text-muted-foreground">
            Have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Login
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
