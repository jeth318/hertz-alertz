import Link from "next/link";
import { auth } from "../../../auth";

export default async function Navbar() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;
  console.log({ session });

  return (
    <div className="navbar bg-base-100 justify-center">
      <div className="flex justify-between min-w-full w-256">
        <div className="flex flex-end">
          <Link href="/" className="btn btn-ghost text-xl">
            Hertz Alertz 🚕{" "}
          </Link>
        </div>
        <div className="flex">
          <ul className="menu menu-horizontal">
            <li>
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
