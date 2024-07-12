import { createNewSubscription, getCitiesData } from "../../lib/actions";
import { auth } from "../../../../auth";
import Image from "next/image";
import { capitalizeFirst } from "@/app/lib/utils";
import classes from "../classes";
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
      <div className="bg-base-100 dark:text-stone-300 dark:bg-black shadow-md rounded-md">
        <div className="flex flex-col p-4 gap-4">
          <h1 className="text-xl font-semibold">Ny bevakning</h1>
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
                      {capitalizeFirst(city.name)}
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
                      {capitalizeFirst(city.name)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="card-actions justify-end pt-4">
              <button type="submit" className={classes.button}>
                Lägg till
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
