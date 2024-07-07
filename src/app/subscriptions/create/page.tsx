import CreateSubscription from "@/app/ui/subscriptions/create";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Link href="/subscriptions">Back to subscriptions</Link>
      <CreateSubscription />
    </>
  );
}
