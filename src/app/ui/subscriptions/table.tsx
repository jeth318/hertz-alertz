import { deleteSubscription } from "@/app/lib/actions";
import { Subscription } from "@/app/lib/definitions";
import Link from "next/link";

type Props = {
  subscriptions: Subscription[];
};

export default function Table({ subscriptions }: Props) {
  return (
    <div className="overflow-x-auto overflow-y-auto max-h-96 rounded-md">
      <table className="table">
        <tbody className="">
          {subscriptions.map((subscription) => {
            return (
              <tr
                className="border border-l-0 border-r-0 border-t-stone-400 border-b-stone-400"
                key={subscription.id}
              >
                <td>
                  <div className="flex flex-col gap-2">
                    {subscription.from_city && (
                      <div className="flex flex-row">
                        <div className="text-green-500 text-2xl min-w-10">{`->`}</div>{" "}
                        <p className="leading-loose">
                          {subscription.from_city}
                        </p>
                      </div>
                    )}
                    {subscription.to_city && (
                      <div className="flex flex-row gap-2">
                        <div className="text-purple-500 text-2xl min-w-8">{`<-`}</div>{" "}
                        <p className="leading-loose">{subscription.to_city}</p>
                      </div>
                    )}
                  </div>
                </td>
                <td className="text-right pl-2 pr-2">
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
