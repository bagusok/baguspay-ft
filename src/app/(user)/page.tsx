"use client";
import { useQuery } from "@tanstack/react-query";
import BannerHome from "./banner-home";

export default function Home() {
  return (
    <>
      <main>
        <BannerHome />
      </main>
    </>
  );
}
