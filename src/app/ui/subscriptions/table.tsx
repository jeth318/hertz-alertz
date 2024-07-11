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
        <thead>
          <tr className="dark:text-stone-300">
            <th>
              <p className="text-lg text-amber-300">
                <b>Från</b>
              </p>
            </th>
            <th>
              <p className="text-lg text-amber-300">
                <b>Till</b>
              </p>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => {
            return (
              <tr key={subscription.id}>
                <td>{subscription.from_city}</td>
                <td>{subscription.to_city}</td>
                <td className="text-right">
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
