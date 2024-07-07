import Table from "../ui/subscriptions/table";
import { subscriptions } from "../lib/placeholder-data";
import Link from "next/link";
import { getSubscriptionsDataByUserId } from "../lib/actions";
import UserGreeting from "../ui/user/greeting";
import { auth } from "../../../auth";
export default async function Page() {
  const session = await auth();
  console.log(session);
  const userId = session?.user?.id;
  const subscriptions = await getSubscriptionsDataByUserId(userId || "");

  return (
    <main>
      <div className="flex flex-col">
        <UserGreeting name={session?.user?.name || ""} />
        <Link href="/">Go home</Link>
        <Link href="/subscriptions/create">Create new</Link>
      </div>
      <Table subscriptions={subscriptions} />
    </main>
  );
}
