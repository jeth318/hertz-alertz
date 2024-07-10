import Link from "next/link";
import { auth } from "../../../auth";

export default async function Navbar() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;
  console.log({ session });

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
                <Link
                  className="btn dark:text-stone-300 btn-ghost self-end btn-sm"
                  href="/api/auth/signout"
                >
                  Logga ut
                </Link>
              )}
              {/*               <details className="dropdown">
                <summary>Menu</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li>
                    <Link href="/subscriptions">Subscriptions</Link>
                  </li>
                  <li>
                    <a>Item 2</a>
                  </li>
                </ul>
              </details> */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
