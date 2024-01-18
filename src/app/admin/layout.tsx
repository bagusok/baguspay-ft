import SidebarAdmin from "./sidebar-admin";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-row">
      <SidebarAdmin />
      <section className="w-full md:pl-4">{children}</section>
    </main>
  );
}
