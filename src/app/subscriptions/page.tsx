import Table from "../ui/subscriptions/table";
import Link from "next/link";
import { getSubscriptionsDataByUserId } from "../lib/actions";
import routeGuard from "../lib/route-guard";
export default async function Page() {
  const { userId, name } = await routeGuard();
  const subscriptions = await getSubscriptionsDataByUserId(userId);
  return (
    <div className="flex flex-col gap-4 dark:text-stone-300">
      <div className="flex flex-col bg-base-100 dark:bg-black rounded-md shadow-md">
        <div className="p-4 flex flex-row items-center justify-between">
          <h3 className="text-xl font-semibold">Mina bevakningar</h3>
          <Link
            className="btn btn-sm btn-primary "
            href="/subscriptions/create"
          >
            Skapa ny
          </Link>
        </div>
      </div>
      <div className="flex justify-between p-4 items-center bg-base-100 dark:bg-black rounded-md shadow-md">
        <div className="flex flex-col gap-4">
          <p className="text-sm">
            Här kan du välja att bevaka resor från de städer som Hertz har
            bilar. Du kan välja att få e-post om alla resor från en stad, till
            en stad eller mer specifikt mellan två städer.
          </p>
        </div>
      </div>
      <div className="flex flex-col dark:bg-black bg-base-100 rounded-md">
        <Table subscriptions={subscriptions} />
      </div>
    </div>
  );
}
