"use client";

import { deleteSubscription } from "@/app/lib/actions";
import { Subscription } from "@/app/lib/definitions";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";

type Props = {
  userId?: string;
  subscriptions: Subscription[];
};

export default function Table({ subscriptions, userId }: Props) {
  const [errorMessage, formAction, isPending] = useFormState(
    deleteSubscription,
    undefined
  );

  return (
    <div className="overflow-y-auto rounded-md dark:rounded-none shadow-md">
      <table className="table table-pin-rows table-pin-cols">
        <thead className="sticky">
          <tr className="dark:border-stone-500">
            <th className="dark:bg-black">
              <div className="flex dark:text-stone-300 items-center gap-1">
                <p>Från</p> <p className="text-purple-500 text-xl">{`->`}</p>
              </div>
            </th>

            <th className="dark:bg-black items-center">
              <div className="flex items-center gap-1 dark:text-stone-300">
                <p>Till</p> <p className="text-green-500 text-xl">{`->`}</p>
              </div>
            </th>
            <th className="dark:bg-black"></th>
          </tr>
        </thead>
        <tbody className="dark:text-stone-300">
          {!subscriptions.length && (
            <tr>
              <td className="p-1" colSpan={3}>
                {subscriptions?.length && (
                  <div className="p-0 skeleton h-32 w-full"></div>
                )}
              </td>
            </tr>
          )}
          {subscriptions.map((subscription) => {
            return (
              <tr
                key={subscription.id}
                className="border-b dark:border-stone-500"
              >
                <td className="px-2 border-r  dark:border-stone-500 w-[40%]">
                  {subscription.from_city || (
                    <i className="dark:text-stone-300 ">Alla städer</i>
                  )}
                </td>
                <td className="px-2 border-r dark:border-stone-500 w-[40%]">
                  {subscription.to_city || (
                    <i className="dark:text-stone-300 ">Alla städer</i>
                  )}{" "}
                </td>
                <td className="text-center w-[15%] p-0">
                  <form action={formAction}>
                    <input
                      type="hidden"
                      name="userId"
                      value={subscription.id}
                    />
                    <button
                      type="submit"
                      name="id"
                      className="border-stone-400 dark:border-red-800"
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
