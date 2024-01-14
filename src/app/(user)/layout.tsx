import UserNavbar from "@/components/ui/user/navbar";
import navbarItems from "@/lib/data/navbar.data";
import UserSidebar from "@/components/ui/user/sidebar";
import UserFooter from "@/components/ui/user/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BagusPay",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-dvw min-h-dvh md:flex">
        <div className="flex-auto flex flex-col">
          <UserNavbar navItems={navbarItems} />
          <div className="p-6 md:px-16 ">
            <UserSidebar></UserSidebar>
            <div className="min-h-dvh">{children}</div>
            <UserFooter></UserFooter>
          </div>
        </div>
      </main>
    </>
  );
}
