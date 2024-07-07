import Image from "next/image";
import Link from "next/link";
import { auth } from "../../auth";

export default async function Home() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;
  console.log({ session });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-2xl bold">Hertz Alertz 🚕</h1>
        <div className="mt-10"></div>
        <div className="flex flex-col gap-8">
          {!isLoggedIn && <Link href="/sign-up">Create account</Link>}
          <Link href={`/api/auth/${isLoggedIn ? "signout" : "signin"}`}>
            {isLoggedIn ? "Logga ut" : "Logga in"}
          </Link>
          <Link href="/subscriptions">Show my subscriptions</Link>
        </div>
      </div>
    </main>
  );
}
