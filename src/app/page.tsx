import Link from "next/link";
import { auth } from "../../auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;

  return (
    <div className="flex flex-col bg-base-100 dark:text-stone-300 dark:bg-black rounded-md py-4 shadow-lg">
      <div className="flex justify-center max-h-28">
        <Image
          src="/car-animation.webp"
          placeholder="empty"
          height={200}
          width={200}
          alt="car-running"
        />
      </div>
      <p className="p-4">
        Den här tjänsten hjälper dig att övervaka och hitta gratisresor via{" "}
        <a
          className="link link-secondary"
          href="https://www.hertzfreerider.se/sv-se/"
        >
          Hertz Freerider
        </a>
        . Genom att skapa bevakningar för resor från, till, och mellan specifika
        städer kan du få e-postmeddelanden när nya resor som matchar dina
        kriterier blir tillgängliga.
      </p>
      <div className="flex justify-center pt-4">
        {!isLoggedIn && (
          <div className="flex flex-row gap-4 items-center">
            <Link className="btn btn-primary w-40" href="/login">
              Logga in
            </Link>
            <Link className="link w-40  text-center " href="/sign-up">
              Skapa konto
            </Link>
          </div>
        )}
        {isLoggedIn && (
          <Link className="btn btn-primary" href="/subscriptions">
            Mina bevakningar
          </Link>
        )}
      </div>
    </div>
  );
}
