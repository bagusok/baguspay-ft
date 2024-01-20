"use client";

import { INavbarItem, sidebarAdmin } from "@/lib/data/navbar.data";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function SidebarItemWthoutChild({ data }: { data: INavbarItem }) {
  const [isOpen, setIsOpen] = useState(false);

  const pathName = usePathname();

  useEffect(() => {
    if (pathName == data.url) {
      setIsOpen(true);
    }
  }, [pathName, data.url]);

  return (
    <Link
      href={data.url}
      className={cn(
        "w-full flex-none rounded-md text-sm font-semibold h-10 inline-flex items-center justify-between px-4 hover:bg-slate-200 dark:hover:bg-slate-50/20",
        {
          "bg-primary text-primary-foreground": isOpen,
        }
      )}
    >
      {data.title}
    </Link>
  );
}

export function SidebarItemWithChild({ data }: { data: INavbarItem }) {
  const [isOpen, setIsOpen] = useState(false);

  const pathName = usePathname();

  useEffect(() => {
    if (pathName.includes(data.url)) {
      setIsOpen(true);
    }
  }, [pathName, data.url]);

  return (
    <>
      <button
        className={cn(
          "w-full flex-none rounded-md text-sm font-semibold h-10 inline-flex items-center justify-between px-4 hover:bg-slate-200 dark:hover:bg-slate-50/20",
          {
            "bg-primary text-primary-foreground":
              isOpen && pathName.includes(data.url),
            "bg-slate-200 dark:bg-slate-50/20 dark:text-white text-primary":
              isOpen,
          }
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{data.title}</span>
        <span>
          <ChevronDownIcon
            className={cn("transition-all duration-300 ease-in-out ", {
              "transform rotate-180": isOpen,
            })}
          />
        </span>
      </button>
      <ul
        className={cn("pl-4 border-l", {
          "transition-all duration-500 ease-in-out block": isOpen,
          hidden: !isOpen,
        })}
      >
        {data?.child?.map((item, index) => {
          return (
            <li key={index}>
              <Link
                href={item.url}
                className={cn(
                  "w-full text-sm text-muted-foreground font-light h-8 inline-flex items-center justify-between px-4 border-l border-primary hover:underline",
                  {
                    "font-semibold": pathName == item.url,
                  }
                )}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
