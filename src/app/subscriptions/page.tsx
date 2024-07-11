import Table from "../ui/subscriptions/table";
import Link from "next/link";
import { getSubscriptionsDataByUserId } from "../lib/actions";
import routeGuard from "../lib/route-guard";
export default async function Page() {
  const { userId, name } = await routeGuard();
  const subscriptions = await getSubscriptionsDataByUserId(userId);
  return (
    <div>
      <div className="flex justify-between p-4 items-center  dark:bg-black rounded-md">
        <div className="flex flex-col dark:text-stone-300 gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Mina bevakningar</h3>
            <Link
              className="btn btn-sm md:btn-md btn-primary "
              href="/subscriptions/create"
            >
              Skapa ny
            </Link>
          </div>
          <div className="flex flew-row gap-8 borderp-2">
            <p className="text-green-500 text-xl">{`-> Från`}</p>
            <p className="text-purple-500 text-xl">{`<- Till`}</p>
          </div>
          <p>
            {" "}
            Här kan du välja att bevaka resor från de städer som Hertz har
            bilar. Du kan välja att få e-post om alla resor från en stad, till
            en stad eller mer specifikt mellan två städer.
          </p>
        </div>
        <div></div>
      </div>
      <div className="flex flex-col">
        <div className="flex p-2 justify-between">
          <div></div>
        </div>
        <div className="self-end"></div>
        <Table subscriptions={subscriptions} />
        <div className="flex justify-center"></div>
      </div>
    </div>
  );
}
