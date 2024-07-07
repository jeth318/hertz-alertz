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
      <div>
        {subscriptions.map((sub) => {
          return (
            <div
              key={sub.id}
              className="mb-2 w-full rounded-md bg-white p-4 flex flex-row justify-between items-center"
            >
              <div className="flex flex-row">
                <div>
                  {sub.from_city && <p>Från</p>}
                  {sub.to_city && <p>Till</p>}
                </div>
                <div>
                  {sub.from_city && <div>{sub.from_city}</div>}
                  {sub.to_city && <div>{sub.to_city}</div>}
                </div>
              </div>
              <div className="flex flex-row">
                <form action="">
                  <button className="bg-red-200" type="submit">
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
      <TableDesktop />
    </>
  );
}
