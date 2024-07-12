import Link from "next/link";
import { auth } from "../../../auth";
import classes from "./classes";

export default async function Navbar() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;

  return (
    <div className="navbar w-full justify-center bg-base-100 dark:bg-stone-800 dark:text-stone-300 sticky top-0 z-10 shadow-md">
      <div className="flex justify-between w-full md:max-w-[50rem] lg:max-w-[70rem] px-2">
        <div className="flex flex-end">
          <Link href="/" className="font-medium text-xl p-0">
            Hertz Alertz 🚕
          </Link>
        </div>
        <div className="flex">
          <ul className="menu menu-horizontal">
            <li>
              {isLoggedIn && (
                <Link className={classes.button} href="/api/auth/signout">
                  Logga ut
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
