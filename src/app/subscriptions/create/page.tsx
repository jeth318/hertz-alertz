import { getCitiesData, getSubscriptionsDataByUserId } from "@/app/lib/actions";
import CreateSubscription from "@/app/ui/subscriptions/create";
import { auth } from "../../../../auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export default async function Page() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/login");
  }
  const cities = await getCitiesData();
  return (
    <SessionProvider session={session}>
      <CreateSubscription cities={cities} />
    </SessionProvider>
  );
}
