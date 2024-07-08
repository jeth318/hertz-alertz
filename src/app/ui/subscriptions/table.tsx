import { deleteSubscription } from "@/app/lib/actions";
import { Subscription } from "@/app/lib/definitions";

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

  function TableMobile() {
    return (
      <div className="p-2 rounded-md bg-white md:container mx-auto flex flex-col gap-2">
        {subscriptions.map((sub) => {
          return (
            <div
              key={sub.id}
              className="bg-blue-100 mb-2 w-full rounded-md  p-4 flex flex-row justify-between items-center"
            >
              <div className="flex flex-row">
                <div className="w-12">
                  {sub.from_city && <p className="mr-2">Från</p>}
                  {sub.to_city && <p className="mr-2">Till</p>}
                </div>
                <div>
                  {sub.from_city && (
                    <div>
                      <b>{sub.from_city}</b>
                    </div>
                  )}
                  {sub.to_city && (
                    <div>
                      <b>{sub.to_city}</b>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-row">
                <form
                  action={async () => {
                    "use server";
                    await deleteSubscription(sub.id);
                  }}
                >
                  <button type="submit" className="btn btn-sm">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <TableMobile />
      {/* <TableDesktop /> */}
    </>
  );
}
