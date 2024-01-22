"use client";

import { isSidebarAdminOpen } from "@/store";
import { PiTextAlignJustifyThin } from "react-icons/pi";
import { useSetAtom } from "jotai";

export default function ButtonOpenSidebarAdmin() {
  const setOpenSidebar = useSetAtom(isSidebarAdminOpen);

  return (
    <button
      className="text-xl font-bold lg:hidden pl-0 w-fit h-fit"
      onClick={() => setOpenSidebar(true)}
    >
      <PiTextAlignJustifyThin className="w-6 h-6" />
    </button>
  );
}
