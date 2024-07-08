import Table from "../ui/subscriptions/table";
import Link from "next/link";
import { getSubscriptionsDataByUserId } from "../lib/actions";
import UserGreeting from "../ui/user/greeting";
import routeGuard from "../lib/route-guard";
export default async function Page() {
  const { userId, name } = await routeGuard();
  const subscriptions = await getSubscriptionsDataByUserId(userId);
  return (
    <main className="h-screen">
      <div className="flex flex-col p-">
        <UserGreeting name={name || ""} />

        <div className="flex p-2 justify-between">
          <div>
            <Link className="btn btn-primary" href="/subscriptions/create">
              Add new
            </Link>
          </div>
          <div>
            <Link className="btn btn-secondary self-end" href="/">
              Sign out
            </Link>
          </div>
        </div>
        <div className="self-end"></div>
        <Table subscriptions={subscriptions} />
        <div className="flex justify-center"></div>
      </div>
    </main>
  );
}
