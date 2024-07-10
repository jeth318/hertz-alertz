import { getSubscriptionsDataByUserId } from "@/app/lib/actions";
import CreateSubscription from "@/app/ui/subscriptions/create";
import { auth } from "../../../../auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/login");
  }
  return <CreateSubscription />;
}
