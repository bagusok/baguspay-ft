import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { sidebarAdmin } from "@/lib/data/navbar.data";
import { SidebarItemWithChild, SidebarItemWthoutChild } from "./sidebar-item";

export default function SidebarAdmin() {
  return (
    <section
      id="sidebar"
      className="flex-none md:w-72 h-dvh bg-slate-100 dark:bg-card absolute right-0 left-0 md:relative flex flex-col gap-3 px-3 py-5 overflow-y-auto"
    >
      <div className="inline-flex justify-between items-center mb-5 flex-initial">
        <h1 className="text-xl font-bold">Admin Page</h1>
        <button className="text-xl font-bold">
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
    </section>
  );
}
