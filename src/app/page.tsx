import Link from "next/link";
import { auth } from "../../auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;
  console.log({ session });

  return (
    <div className="flex flex-col bg-base-100 dark:bg-slate-700 rounded-md py-4 shadow-lg">
      <div className="flex justify-center">
        <Image
          className="dark:hidden"
          src="/car-running.gif"
          height={200}
          width={200}
          alt="car-running"
        />
        <div className="dark:flex hidden">
          <Image src="/car-black.svg" height={100} width={100} alt="car" />
        </div>
      </div>
      <p className="p-6">
        Den här tjänsten hjälper dig att övervaka och hitta gratisresor hos
        Hertz. Genom att skapa bevakningar för resor från, till, och mellan
        specifika städer kan du få e-postmeddelanden när nya resor som matchar
        dina kriterier blir tillgängliga.
      </p>
      <div className="flex justify-center pt-4">
        {!isLoggedIn && (
          <div className="flex flex-row gap-4 items-center">
            <Link className="btn btn-primary w-40" href="/sign-in">
              Logga in
            </Link>
            <Link className="link w-40  text-right " href="/sign-up">
              Skapa konto
            </Link>
          </div>
        )}
        {isLoggedIn && (
          <Link className="btn btn-primary" href="/subscriptions">
            Bevakningar
          </Link>
        )}
      </div>
    </div>
  );
}
