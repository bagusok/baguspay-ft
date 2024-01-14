"use client";

import { useWindowSize } from "@/hooks/useWindowSize";
import { INavbarItem } from "@/lib/data/navbar.data";
import { cn } from "@/lib/utils";
import { isSidebarOpen, themeAtom } from "@/store";
import { Menu } from "@headlessui/react";
import {
  CaretDownIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
  TokensIcon,
} from "@radix-ui/react-icons";
import { useAtom, useSetAtom } from "jotai";
import Link from "next/link";
import { Fragment } from "react";
import { HiOutlineBell } from "react-icons/hi2";

export default function UserNavbar({
  navItems = [],
}: {
  navItems: INavbarItem[];
}) {
  const isMobile = useWindowSize().width < 768;
  const openSidebar = useSetAtom(isSidebarOpen);
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <>
      <header className="h-16 bg-background inline-flex justify-between items-center md:px-16 px-6">
        <div id="title">
          {isMobile ? (
            <>
              <button
                className="hover:opacity-70"
                onClick={() => openSidebar(true)}
              >
                <TokensIcon className="scale-150" />
              </button>
            </>
          ) : (
            <h1 className="text-xl font-bold">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </h1>
          )}
        </div>
        <div id="nav" className="inline-flex gap-6 items-center">
          {!isMobile &&
            navItems?.map((item, index) => {
              if (item.child && item.isHaveChild) {
                return (
                  <Menu key={index} className="" as="div">
                    <Menu.Button className="hover:text-primary inline-flex items-center text-base">
                      {item.title}
                      <CaretDownIcon className="ui-open:rotate-180 transition-all duration-100 ml-2" />
                    </Menu.Button>
                    <Menu.Items className="absolute flex flex-col bg-card py-2 px-6 rounded shadow text-sm gap-2 top-16 z-30">
                      {item.child &&
                        item.child.map((child, index2) => {
                          return (
                            <Menu.Item key={index2} as={Fragment}>
                              {({ active }: { active: boolean }) => (
                                <Link
                                  href={child.url}
                                  className={cn("hover:text-primary", {
                                    underline: active,
                                  })}
                                  passHref
                                >
                                  {child.title}
                                </Link>
                              )}
                            </Menu.Item>
                          );
                        })}
                    </Menu.Items>
                  </Menu>
                );
              } else {
                return (
                  <Link
                    className="hover:text-primary hover:underline"
                    href={item.url}
                    key={index}
                    passHref
                  >
                    {item.title}
                  </Link>
                );
              }
            })}

          <HiOutlineBell className="scale-125 ml-4" />
          <MagnifyingGlassIcon className="scale-150" />
          <div className="ml-2">
            <button
              className="rounded-md hover:bg-card p-2 inline-flex items-center justify-center"
              onClick={() =>
                setTheme((theme) => (theme == "light" ? "dark" : "light"))
              }
            >
              {theme == "light" && <SunIcon className="scale" />}
              {theme == "dark" && <MoonIcon />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
