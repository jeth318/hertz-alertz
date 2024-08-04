"use client";

import { createNewSubscription, getCitiesData } from "../../lib/actions";
import { capitalizeFirst } from "@/app/lib/utils";
import classes from "../classes";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import routeGuard from "@/app/lib/route-guard";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { Router } from "next/router";
import { City } from "@/app/lib/definitions";

const errorMap: Record<string, string> = {
  IDENTICAL_CITIES: "Du kan inte ange samma stad i båda fälten",
  INVALID_CREDENTIALS: "Felaktigt lösenord",
  INVALID_INPUT: "Felaktiga uppgifter",
};

function getErrorMessage(errorCode: string) {
  return errorMap[errorCode];
}

type Props = {
  cities: City[];
};
export default function CreateSubscription({ cities }: Props) {
  /*   const createNewSubscriptionWithUserId = createNewSubscription.bind(
    null,
    fakeSessionUser.id
  ); */
  const session = useSession();
  const userId = session?.data?.user?.id || "";

  const [hasError, setHasError] = useState(false);
  const [errorState, formAction] = useFormState(createNewSubscription, null);

  useEffect(() => {
    if (errorState) {
      setHasError(true);
    }
  }, [errorState]);
  console.log("State", errorState);

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
          <form action={formAction}>
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
          {hasError && errorState?.errorCode && (
            <div role="alert" className="alert alert-info">
              <span className="text-white">
                {getErrorMessage(errorState?.errorCode)}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
