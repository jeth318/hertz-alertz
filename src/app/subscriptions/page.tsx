import Table from "../ui/subscriptions/table";
import Link from "next/link";
import { getSubscriptionsDataByUserId } from "../lib/actions";
import UserGreeting from "../ui/user/greeting";
import routeGuard from "../lib/route-guard";
export default async function Page() {
  const { userId, name } = await routeGuard();
  const subscriptions = await getSubscriptionsDataByUserId(userId);
  return (
    <main>
      <div className="flex flex-col">
        <UserGreeting name={name || ""} />
        <Link href="/">Go home</Link>
        <Link href="/subscriptions/create">Create new</Link>
      </div>
      <Table subscriptions={subscriptions} />
    </main>
  );
}
