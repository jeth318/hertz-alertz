import { redirect } from "next/navigation";
import { auth } from "../../../auth";

const routeGuard = async () => {
  "use server";

  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }
  return {
    userId: session.user?.id,
    email: session.user?.email,
    name: session.user?.name,
    sessionUser: session?.user,
  };
};

export default routeGuard;
