import { SessionProvider } from "next-auth/react";
import SignIn from "../ui/sign-in";
import SignUp from "../ui/sign-up";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!!session?.user?.id) {
    redirect("/");
  }
  return (
    <SessionProvider session={session}>
      <SignUp />
    </SessionProvider>
  );
}
