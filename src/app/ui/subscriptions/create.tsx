import { fakeSessionUser } from "@/app/lib/placeholder-data";
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
  console.log("SESSSSSSSSS", session);

  const createNewSubscriptionWithId = createNewSubscription.bind(
    null,
    session?.user?.id as string
  );
  return (
    <>
      <div className="card bg-base-100 dark:bg-slate-700">
        <figure className="pt-4 ">
          <Image
            className="dark:hidden"
            src="/car-running.gif"
            alt="car-running"
            height={200}
            width={200}
          />
        </figure>
        <div className="card-body p-4 gap-4">
          <h2 className="card-title">Ny bevakning</h2>
          <p className="text-sm">
            Här kan du skapa nya bevakningar på resor från, till eller både från
            och till olika städer. Du kommer få e-postmeddelande när det finns
            resor som matchar dessa.
          </p>
          <form action={createNewSubscriptionWithId}>
            <div className="flex flex-row dark:text-black">
              <div className="flex w-full flex-col gap-4">
                <select
                  name="fromCity"
                  id="fromCity"
                  className="select select-bordered w-full max-w-xs"
                >
                  <option disabled selected>
                    Välj stad
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
                  className="select select-bordered w-full max-w-xs"
                >
                  <option disabled selected>
                    Välj stad
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
              <button type="submit" className="btn btn-primary">
                Lägg till
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
