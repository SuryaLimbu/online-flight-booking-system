import Sidebar from "../components/sidebar/sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid sm:grid-cols-6">
      {/* Include shared UI here e.g. a header or sidebar */}
      <div>
        <Sidebar />
      </div>
      <div className=" sm:col-span-5 p-6">{children}</div>
    </section>
  );
}
