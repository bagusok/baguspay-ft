export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-dvw min-h-dvh md:flex ">
        <div className="hidden md:block md:w-80 lg:w-96 bg-slate-200 flex-initial"></div>
        <div className="flex-auto flex flex-col">
          <header className="h-16 md:h-20 bg-white inline-flex items-center md:border-b-[0.5px] md:border-slate-300 shadow-sm"></header>
          <div className="p-6 md:p-8">{children}</div>
        </div>
      </main>
    </>
  );
}
