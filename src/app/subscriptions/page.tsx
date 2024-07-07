import Table from "../ui/subscriptions/table";
import { subscriptions } from "../lib/placeholder-data";
export default function Page() {
  return (
    <main>
      <Table subscriptions={subscriptions} />
    </main>
  );
}
