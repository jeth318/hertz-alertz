import Link from "next/link";
import { auth } from "../../auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;
  console.log({ session });

  return (
    <div className="bg-white dark:bg-slate-800 rounded-md py-4">
      <div className="container flex justify-center bg:white dark:bg-slate-800">
        <Image
          className="dark:hidden"
          src="/car-running.gif"
          height={200}
          width={200}
          alt="car-running"
        />
      </div>
      <p className="p-4">
        Den här tjänsten hjälper dig att övervaka och hitta gratisresor hos
        Hertz. Genom att skapa bevakningar för resor från, till, och mellan
        specifika städer kan du få e-postmeddelanden när nya resor som matchar
        dina kriterier blir tillgängliga.
      </p>
      <div className="flex justify-center pt-4">
        {!isLoggedIn && (
          <Link className="btn btn-primary w-40" href="/sign-up">
            Skapa konto
          </Link>
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
