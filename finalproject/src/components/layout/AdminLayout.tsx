import Sidebar from "./Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-950 min-h-screen">
      <Sidebar />

      <main className="ml-64 min-h-screen overflow-hidden">
        {children}
      </main>
    </div>
  );
}