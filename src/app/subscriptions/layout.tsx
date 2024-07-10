import routeGuard from "../lib/route-guard";

//export const experimental_ppr = true;
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await routeGuard();
  return (
    <div className="flex flex-col md:flex-row md:overflow-hidden dark:bg-slate-600 bg-base-100 md:p-4 rounded-md shadow-lg">
      <div className="flex-grow md:overflow-y-auto">{children}</div>
    </div>
  );
}
