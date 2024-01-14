import SidebarDesktop from "@/components/ui/user/sidebar";
import UserNavbar from "@/components/ui/user/navbar";
import navbarItems from "@/lib/data/navbar.data";
import UserSidebar from "@/components/ui/user/sidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-dvw min-h-dvh md:flex ">
        <div className="flex-auto flex flex-col">
          <UserNavbar navItems={navbarItems} />
          <div className="p-6 md:p-8">
            <UserSidebar></UserSidebar>
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
