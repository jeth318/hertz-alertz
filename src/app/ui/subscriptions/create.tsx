import { fakeSessionUser } from "@/app/lib/placeholder-data";
import { createNewSubscription, getCitiesData } from "../../lib/actions";
import { auth } from "../../../../auth";
export default async function CreateSubscription() {
  /*   const createNewSubscriptionWithUserId = createNewSubscription.bind(
    null,
    fakeSessionUser.id
  ); */
  const cities = await getCitiesData();
  const session = await auth();
  const createNewSubscriptionWithId = createNewSubscription.bind(
    null,
    session?.user?.id as string
  );
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4 flex flex-row justify-between items-center">
      <form action={createNewSubscriptionWithId}>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <label htmlFor="from_city">Från</label>
            <label htmlFor="to_city">Till</label>
          </div>
          <div>
            <div className="flex flex-col">
              <select name="fromCity" id="fromCity">
                <option value="ALLA">Alla</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              <select name="toCity" id="to_city">
                <option value="ALLA">Alla</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
