"use client";

import { INavbarItem } from "@/lib/data/navbar.data";
import { cn } from "@/lib/utils";
import { isSidebarOpen } from "@/store";
import { CaretRightIcon } from "@radix-ui/react-icons";
import { useAtom } from "jotai";

export default function UserSidebar({
  navItems = [],
}: {
  navItems?: INavbarItem[];
}) {
  const [openSidebar, setOpenSidebar] = useAtom(isSidebarOpen);

  return (
    <>
      <div
        id="sidebar"
        className={cn(
          "absolute md:hidden top-0 bottom-0 left-0 right-0 bg-background p-5 ease-in-out duration-200 z-50",
          {
            "translate-x-0": openSidebar,
            "-translate-x-full": !openSidebar,
          }
        )}
      >
        <div className="inline-flex justify-between w-full">
          <h1 className="text-2xl font-semibold">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </h1>
          <button
            id="back-button-sidebar"
            className="hover:opacity-70"
            onClick={() => setOpenSidebar(false)}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.5381 21.9905C15.1752 22.4068 14.5435 22.45 14.1272 22.0871L8.00955 16.7538C7.79171 16.5639 7.66669 16.289 7.66669 16C7.66669 15.711 7.79171 15.4361 8.00955 15.2462L14.1272 9.9129C14.5435 9.54997 15.1752 9.59324 15.5381 10.0095C15.901 10.4258 15.8578 11.0575 15.4415 11.4204L11.3355 15L23.3334 15C23.8856 15 24.3334 15.4477 24.3334 16C24.3334 16.5523 23.8856 17 23.3334 17L11.3355 17L15.4415 20.5796C15.8578 20.9425 15.901 21.5742 15.5381 21.9905Z"
                fill="#363853"
              />
            </svg>
          </button>
        </div>
        <div className="mt-5 w-full bg-card py-4 px-3 rounded shadow-sm">
          <h2 className="text-lg font-semibold">Hi, Buyer</h2>
          <p className="text-muted-foreground text-sm font-light font mt-2">
            Please login to get cheaper price. If you dont have an account,
            please create account by clicking the button below.
          </p>
          <div id="sidebar__btn-login" className="inline-flex gap-2 mt-3">
            <button className="bg-primary text-white font-semibold py-2 px-4 rounded">
              Login
            </button>
            <button className="bg-card text-primary font-semibold py-2 px-4 rounded border border-primary">
              Create Account
            </button>
          </div>
        </div>
        <ul id="sidebar__menu-item">
          {/* Transaction */}
          <li className="mt-5 flex flex-col">
            <h3 className="text-sm font-medium">Transaction</h3>
            <ul className="mt-2 flex flex-col gap-2">
              <li className="bg-card rounded w-full inline-flex items-center justify-between px-2 h-16">
                <a href="#" className="py-2 px-4 block w-full">
                  <span className="text-base font-light">My Transaction</span>
                </a>
                <CaretRightIcon className="scale-125" />
              </li>
              <li className="bg-card rounded w-full inline-flex items-center justify-between px-2 h-16">
                <a href="#" className="py-2 px-4 block w-full">
                  <span className="text-base font-light">
                    Check Transaction by ID
                  </span>
                </a>
                <CaretRightIcon className="scale-125" />
              </li>
            </ul>
          </li>
          {/* Tools */}
          <li className="mt-5 flex flex-col">
            <h3 className="text-sm font-medium">Tools</h3>
            <ul className="mt-2 flex flex-col gap-2">
              <li className="bg-card rounded w-full inline-flex items-center justify-between px-2 h-16">
                <a href="#" className="py-2 px-4 block w-full">
                  <span className="text-base font-light">Hitung Winrate</span>
                </a>
                <CaretRightIcon className="scale-125" />
              </li>
              <li className="bg-card rounded w-full inline-flex items-center justify-between px-2 h-16">
                <a href="#" className="py-2 px-4 block w-full">
                  <span className="text-base font-light">HP Magic While</span>
                </a>
                <CaretRightIcon className="scale-125" />
              </li>
              <li className="bg-card rounded w-full inline-flex items-center justify-between px-2 h-16">
                <a href="#" className="py-2 px-4 block w-full">
                  <span className="text-base font-light">HP Zodiac</span>
                </a>
                <CaretRightIcon className="scale-125" />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}
