import routeGuard from "../lib/route-guard";

//export const experimental_ppr = true;
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await routeGuard();
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="flex-grow md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
