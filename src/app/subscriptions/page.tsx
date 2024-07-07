import Table from "../ui/subscriptions/table";
import { subscriptions } from "../lib/placeholder-data";
import Link from "next/link";
import { getSubscriptionsDataByUserId } from "../lib/actions";
export default async function Page() {
  const subscriptions = await getSubscriptionsDataByUserId(2);

  return (
    <main>
      <div className="flex flex-col">
        <Link href="/">Go home</Link>
        <Link href="/subscriptions/create">Create new</Link>
      </div>
      <Table subscriptions={subscriptions} />
    </main>
  );
}
