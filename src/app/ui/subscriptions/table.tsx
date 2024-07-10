import { deleteSubscription } from "@/app/lib/actions";
import { Subscription } from "@/app/lib/definitions";
import Link from "next/link";

type Props = {
  subscriptions: Subscription[];
};

export default function Table({ subscriptions }: Props) {
  function TableDesktop() {
    return (
      <table className="hidden min-w-full rounded-md text-gray-900 md:table">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => {
            return (
              <tr key={subscription.id}>
                <td>{subscription.from_city}</td>
                <td>{subscription.to_city}</td>
                <td>Edit</td>
                <td>Delete</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  function TableMobile2() {
    return (
      <div className="overflow-x-auto overflow-y-auto max-h-96 rounded-lg">
        <table className="table">
          <thead>
            <tr className="dark:text-white">
              <th>
                <b>Från</b>
              </th>
              <th>
                <b>Till</b>
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

  return (
    <>
      <TableMobile2 />
      {/* <TableDesktop /> */}
    </>
  );
}
