import { redirect } from "next/navigation";
import SignIn from "../ui/sign-in";
import { auth } from "../../../auth";

export default async function Page() {
  const session = await auth();
  if (session?.user?.id) {
    redirect("/subscriptions");
  }
  return <SignIn />;
}
