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
      <main className="w-full">
        <UserNavbar navItems={navbarItems} />
        <div className="p-6 md:px-14 lg:px-32 ">
          <UserSidebar navItems={navbarItems}></UserSidebar>
          {children}
          <UserFooter></UserFooter>
        </div>
      </main>
    </>
  );
}
