"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { sidebarAdmin } from "@/lib/data/navbar.data";
import { SidebarItemWithChild, SidebarItemWthoutChild } from "./sidebar-item";
import { cn } from "@/lib/utils";
import { useAtom, useSetAtom } from "jotai";
import { isSidebarAdminOpen, userTokenAtom } from "@/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SidebarAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useAtom(isSidebarAdminOpen);
  const setUserToken = useSetAtom(userTokenAtom);
  const router = useRouter();

  const handleLogout = () => {
    toast.success("Logout success");
    setUserToken(null);
    router.push("/auth/login");
  };

  return (
    <section
      id="sidebar"
      className={cn(
        "col-span-2  md:w-72 lg:w-full h-dvh bg-slate-100 dark:bg-card left-0 right-0 lg:sticky lg:top-0 flex flex-col gap-3 px-3 py-5 overflow-y-auto top-0 transition-all ease-in-out duration-300 z-20",
        {
          "-translate-x-0 fixed": isSidebarOpen,
          "-translate-x-full lg:translate-x-0 absolute": isSidebarOpen == false,
        }
      )}
    >
      <div className="inline-flex justify-between items-center mb-5 flex-initial">
        <h1 className="text-xl font-bold">Admin Page</h1>
        <button
          className="text-xl font-bold lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <ArrowLeftIcon />
        </button>
      </div>
      {sidebarAdmin.map((item, index) => {
        if (item.isHaveChild) {
          return <SidebarItemWithChild data={item} key={index} />;
        } else {
          return <SidebarItemWthoutChild data={item} key={index} />;
        }
      })}

      <button
        onClick={handleLogout}
        className="mt-5 w-full flex-none rounded-md text-sm font-semibold h-10 inline-flex items-center justify-between px-4 hover:bg-slate-200 dark:hover:bg-slate-50/20"
      >
        Logout
      </button>
    </section>
  );
}
