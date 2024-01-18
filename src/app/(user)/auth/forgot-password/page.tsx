"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  return (
    <section className="w-full inline-flex justify-center md:mt-14">
      <div className="md:w-[30rem] rounded-md bg-card flex flex-col gap-2 shadow-sm py-5 md:px-10">
        <h1 className="text-center text-xl md:text-2xl font-bold">
          Forgot Password
        </h1>
        <p className="text-muted-foreground text-sm text-light mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
          doloribus.
        </p>
        <form action="" className="flex flex-col gap-2">
          <div className="w-full">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="yayoy@gmail.com"
              required
            />
          </div>

          <Button type="submit" className="mt-3">
            Submit
          </Button>
        </form>
        <div className="mt-3 inline-flex justify-center items-center gap-3">
          <Link href="/auth/register" className="text-sm hover:underline">
            Register
          </Link>
          <span>|</span>
          <Link href="/auth/login" className="text-sm hover:underline">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
