import { createNewSubscription, getCitiesData } from "../../lib/actions";
import { auth } from "../../../../auth";
import Image from "next/image";
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
    <>
      <div className="card bg-base-100 dark:bg-black">
        <div className="card-body p-4 gap-4">
          <h2 className="card-title">Ny bevakning</h2>
          <p className="text-sm">
            Här kan du skapa nya bevakningar på resor från, till eller både från
            och till olika städer. Du kommer få e-postmeddelande när det finns
            resor som matchar dessa.
          </p>
          <form
            action={async (formData) => {
              "use server";
              return await createNewSubscriptionWithId(formData);
            }}
          >
            <div className="flex flex-row dark:text-black">
              <div className="flex w-full flex-col gap-4">
                <select
                  name="fromCity"
                  id="fromCity"
                  className="select select-bordered w-full max-w-md dark:bg-gray-900 dark:text-stone-300"
                >
                  <option disabled selected>
                    Från
                  </option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <select
                  name="toCity"
                  id="to_city"
                  className="select select-bordered w-full max-w-md dark:bg-gray-900 dark:text-stone-300"
                >
                  <option disabled selected>
                    Till
                  </option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="card-actions justify-end pt-4">
              <button
                type="submit"
                className="btn btn-primary dark:btn-ghost dark:border-gray-400 dark:text-stone-300"
              >
                Lägg till
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
