import Table from "../ui/subscriptions/table";
import Link from "next/link";
import { getSubscriptionsDataByUserId } from "../lib/actions";
import routeGuard from "../lib/route-guard";
import classes from "../ui/classes";
export default async function Page() {
  const { userId, name, email } = await routeGuard();
  const subscriptions = await getSubscriptionsDataByUserId(userId);
  return (
    <div className="flex flex-col gap-4 dark:text-stone-300">
      <div className="flex flex-col bg-base-100 dark:bg-black rounded-md shadow-md">
        <div className="p-4 flex flex-col">
          <h3 className="text-xl font-semibold">Mina bevakningar</h3>
          <p className="text-sm pb-4 dark:text-stone-500">{email}</p>
          <Link
            className={`${classes.button} self-start`}
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
            bilar. När en resa matchar en bevakning får du en notis via e-post.
          </p>
        </div>
      </div>
      <div className="flex flex-col dark:bg-black bg-base-100 rounded-md">
        <Table subscriptions={subscriptions} userId={userId} />
      </div>
    </div>
  );
}
