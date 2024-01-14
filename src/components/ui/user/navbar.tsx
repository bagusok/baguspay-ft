"use client";

import { useWindowSize } from "@/hooks/useWindowSize";
import { INavbarItem } from "@/lib/data/navbar.data";
import { cn } from "@/lib/utils";
import { isSidebarOpen } from "@/store";
import { Menu } from "@headlessui/react";
import { useSetAtom } from "jotai";
import Link from "next/link";
import { Fragment } from "react";

export default function UserNavbar({
  navItems = [],
}: {
  navItems: INavbarItem[];
}) {
  const isMobile = useWindowSize().width < 768;
  const openSidebar = useSetAtom(isSidebarOpen);

  return (
    <>
      <header className="h-16 md:h-20 bg-white inline-flex justify-between items-center md:border-b-[0.5px] md:border-slate-300 shadow-sm md:px-10 px-6">
        <div id="title">
          {isMobile ? (
            <>
              <button
                className="hover:opacity-70"
                onClick={() => openSidebar(true)}
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.12126 6.54225C4.40304 5.34099 5.34099 4.40304 6.54225 4.12126V4.12126C7.58329 3.87707 8.66671 3.87707 9.70775 4.12126V4.12126C10.909 4.40304 11.847 5.34099 12.1287 6.54225V6.54225C12.3729 7.58329 12.3729 8.66671 12.1287 9.70775V9.70775C11.847 10.909 10.909 11.847 9.70775 12.1287V12.1287C8.66671 12.3729 7.58329 12.3729 6.54225 12.1287V12.1287C5.34099 11.847 4.40304 10.909 4.12126 9.70776V9.70776C3.87707 8.66671 3.87707 7.58329 4.12126 6.54225V6.54225Z"
                    stroke="#363853"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M4.12126 20.2922C4.40304 19.091 5.34099 18.153 6.54225 17.8713V17.8713C7.58329 17.6271 8.66671 17.6271 9.70775 17.8713V17.8713C10.909 18.153 11.847 19.091 12.1287 20.2922V20.2922C12.3729 21.3333 12.3729 22.4167 12.1287 23.4578V23.4578C11.847 24.659 10.909 25.597 9.70775 25.8787V25.8787C8.66671 26.1229 7.58329 26.1229 6.54225 25.8787V25.8787C5.34099 25.597 4.40304 24.659 4.12126 23.4578V23.4578C3.87707 22.4167 3.87707 21.3333 4.12126 20.2922V20.2922Z"
                    stroke="#0095FF"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M17.8713 6.54225C18.153 5.34099 19.091 4.40304 20.2922 4.12126V4.12126C21.3333 3.87707 22.4167 3.87707 23.4578 4.12126V4.12126C24.659 4.40304 25.597 5.34099 25.8787 6.54225V6.54225C26.1229 7.58329 26.1229 8.66671 25.8787 9.70775V9.70775C25.597 10.909 24.659 11.847 23.4578 12.1287V12.1287C22.4167 12.3729 21.3333 12.3729 20.2922 12.1287V12.1287C19.091 11.847 18.153 10.909 17.8713 9.70776V9.70776C17.6271 8.66671 17.6271 7.58329 17.8713 6.54225V6.54225Z"
                    stroke="#363853"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M17.8713 20.2922C18.153 19.091 19.091 18.153 20.2922 17.8713V17.8713C21.3333 17.6271 22.4167 17.6271 23.4578 17.8713V17.8713C24.659 18.153 25.597 19.091 25.8787 20.2922V20.2922C26.1229 21.3333 26.1229 22.4167 25.8787 23.4578V23.4578C25.597 24.659 24.659 25.597 23.4578 25.8787V25.8787C22.4167 26.1229 21.3333 26.1229 20.2922 25.8787V25.8787C19.091 25.597 18.153 24.659 17.8713 23.4578V23.4578C17.6271 22.4167 17.6271 21.3333 17.8713 20.2922V20.2922Z"
                    stroke="#363853"
                    strokeWidth="1.5"
                  />
                </svg>
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
                    <Menu.Button className="hover:text-blue-700 inline-flex items-center">
                      {item.title}{" "}
                      <svg
                        className="ui-open:rotate-180 transition-all duration-100"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17 9.5L12 14.5L7 9.5"
                          stroke="#363853"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Menu.Button>
                    <Menu.Items className="absolute flex flex-col bg-white py-2 px-6 rounded shadow text-sm gap-2 top-16 z-30">
                      {item.child &&
                        item.child.map((child, index2) => {
                          return (
                            <Menu.Item key={index2} as={Fragment}>
                              {({ active }: { active: boolean }) => (
                                <Link
                                  href={child.url}
                                  className={cn("hover:text-blue-700", {
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
                    className="hover:text-blue-700"
                    href={item.url}
                    key={index}
                    passHref
                  >
                    {item.title}
                  </Link>
                );
              }
            })}

          {/* Bell Icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3V4.00474M9.00909 17.9034C10.9968 18.1269 13.0032 18.1269 14.9909 17.9034C14.9768 18.0967 14.9465 18.2887 14.9001 18.4772L14.8182 18.8106C14.5614 19.855 13.7455 20.6678 12.7039 20.917C12.2411 21.0277 11.7589 21.0277 11.2961 20.917C10.2545 20.6678 9.43862 19.855 9.18181 18.8106L9.09985 18.4772C9.0535 18.2887 9.02316 18.0967 9.00909 17.9034Z"
              stroke="#0095FF"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M10.1584 4.30225C8.15001 4.95327 6.58212 6.58677 6.0278 8.63262L5.4375 10.8112L4.9702 12.9275C4.82626 13.5794 4.63043 14.2498 4.52719 14.9094C4.50929 15.0238 4.5 15.141 4.5 15.2604C4.5 16.3266 5.24755 17.2453 6.28759 17.4572L6.65518 17.5321C10.1825 18.2507 13.8175 18.2507 17.3448 17.5321L17.7124 17.4572C18.7525 17.2453 19.5 16.3266 19.5 15.2604C19.5 15.141 19.4907 15.0238 19.4728 14.9094C19.3696 14.2498 19.1737 13.5794 19.0298 12.9275L18.5625 10.8112L17.9793 8.58838C17.45 6.57087 15.9398 4.95993 13.9671 4.3084C12.7349 3.90148 11.3927 3.90214 10.1584 4.30225Z"
              stroke="#363853"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          {/* Serach icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.4697 21.5303C20.7626 21.8232 21.2374 21.8232 21.5303 21.5303C21.8232 21.2374 21.8232 20.7625 21.5303 20.4696L20.4697 21.5303ZM16.8048 17.8654L20.4697 21.5303L21.5303 20.4696L17.8655 16.8048L16.8048 17.8654Z"
              fill="#0095FF"
            />
            <path
              d="M3.31573 8.324C3.89864 5.83897 5.83897 3.89864 8.324 3.31573C10.1187 2.89476 11.9864 2.89476 13.781 3.31573C16.2661 3.89864 18.2064 5.83897 18.7893 8.324C19.2103 10.1187 19.2103 11.9864 18.7893 13.781C18.2064 16.2661 16.2661 18.2064 13.781 18.7893C11.9864 19.2103 10.1187 19.2103 8.324 18.7893C5.83897 18.2064 3.89864 16.2661 3.31573 13.7811C2.89476 11.9864 2.89476 10.1187 3.31573 8.324Z"
              stroke="#0095FF"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M3.31573 8.324C2.89476 10.1187 2.89476 11.9864 3.31573 13.7811C3.89864 16.2661 5.83897 18.2064 8.324 18.7893C10.1187 19.2103 11.9864 19.2103 13.781 18.7893C16.2661 18.2064 18.2064 16.2661 18.7893 13.781C19.2103 11.9864 19.2103 10.1187 18.7893 8.324C18.2064 5.83897 16.2661 3.89864 13.781 3.31573C11.9864 2.89476 10.1187 2.89476 8.324 3.31573"
              stroke="#363853"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </header>
    </>
  );
}
