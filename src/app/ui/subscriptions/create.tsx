import { cities, fakeSessionUser } from "@/app/lib/placeholder-data";
import { createNewSubscription } from "../../lib/actions";
export default function CreateSubscription() {
  /*   const createNewSubscriptionWithUserId = createNewSubscription.bind(
    null,
    fakeSessionUser.id
  ); */
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4 flex flex-row justify-between items-center">
      <form
        action={async (formData) => {
          "use server";
          await createNewSubscription(fakeSessionUser.id, formData);
        }}
      >
        <div className="flex flex-row">
          <div className="flex flex-col">
            <label htmlFor="from_city">Från</label>
            <label htmlFor="to_city">Till</label>
          </div>
          <div>
            <div className="flex flex-col">
              <select name="fromCity" id="fromCity">
                <option value="Alla">Alla</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              <select name="toCity" id="to_city">
                <option value="Alla">Alla</option>
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
