import Table from "../ui/subscriptions/table";
import Link from "next/link";
import { getSubscriptionsDataByUserId } from "../lib/actions";
import routeGuard from "../lib/route-guard";
export default async function Page() {
  const { userId, name } = await routeGuard();
  const subscriptions = await getSubscriptionsDataByUserId(userId);
  return (
    <div>
      <div className="flex justify-between p-2 items-center bg-slate-100 dark:bg-black rounded-md">
        <h3 className="text-md p-2">
          <b>Mina bevakningar</b>
        </h3>
        <div>
          <Link
            className="btn btn-primary dark:btn-ghost dark:border-gray-400 dark:text-stone-300"
            href="/subscriptions/create"
          >
            Ny bevakning
          </Link>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex p-2 justify-between">
          <div></div>
        </div>
        <div className="self-end"></div>
        <Table subscriptions={subscriptions} />
        <div className="flex justify-center"></div>
      </div>
    </div>
  );
}
