import { UserPermission } from "@/types/UserPermission";
import AuthLayout from "../(user)/auth/auth-layout";
import ButtonOpenSidebarAdmin from "./ButtonOpenSidebar";
import SidebarAdmin from "./sidebar-admin";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-row relative">
      <AuthLayout roles={[UserPermission.ADMIN]}>
        <SidebarAdmin />
        <section className="w-full px-4 md:px-10">
          <header className="w-full h-16 inline-flex justify-between items-center mb-5">
            <ButtonOpenSidebarAdmin />
            <h1 className="text-lg font-bold">BagusPay</h1>
            <div className="inline-flex gap-4">
              <div className="rounded-full w-10 h-10 bg-slate-200"></div>
            </div>
          </header>
          {children}
        </section>
      </AuthLayout>
    </main>
  );
}
