import { deleteSubscription } from "@/app/lib/actions";
import { Subscription } from "@/app/lib/definitions";
import Link from "next/link";

type Props = {
  subscriptions: Subscription[];
};

export default function Table({ subscriptions }: Props) {
  return (
    <div className="overflow-y-auto max-h-60 rounded-md dark:rounded-none">
      <table className="table  table-pin-rows table-pin-cols ">
        <thead className=" sticky">
          <tr>
            <th className="dark:bg-black">
              <div className="flex dark:text-stone-300 items-center gap-1">
                <p>Från</p> <p className="text-purple-500 text-xl">{`->`}</p>
              </div>
            </th>

            <th className="dark:bg-black items-center">
              <div className="flex items-center gap-1 dark:text-stone-300">
                <p>Till</p> <p className="text-green-500 text-xl">{`->`}</p>
              </div>
            </th>
            <th className="dark:bg-black"></th>
          </tr>
        </thead>
        <tbody className="dark:text-stone-300">
          {subscriptions.map((subscription) => {
            return (
              <tr key={subscription.id} className="border-b">
                <td className="p-0 pl-2 border-r">
                  {subscription.from_city || (
                    <i className="dark:text-gray-700 text-gray-300">
                      Hela landet
                    </i>
                  )}
                </td>
                <td className="border-r">
                  {subscription.to_city || (
                    <i className="dark:text-gray-700 text-gray-300">
                      Hela landet
                    </i>
                  )}{" "}
                </td>
                <td className="text-right p-0 pr-2">
                  <form
                    action={async () => {
                      "use server";
                      await deleteSubscription(subscription.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="btn btn-sm dark:bg-amber-950 dark:border-red-800"
                    >
                      ❌
                    </button>
                  </form>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
