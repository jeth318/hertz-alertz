import Table from "../ui/subscriptions/table";
import { subscriptions } from "../lib/placeholder-data";
import Link from "next/link";
export default function Page() {
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
