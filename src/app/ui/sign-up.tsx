"use client";

import { useFormState } from "react-dom";
import { signUp } from "../lib/actions";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SignUp() {
  const [validationError, setValidationError] = useState("");
  const [state, formAction] = useFormState(signUp, null);

  useEffect(() => {
    if (state?.errorCode === "EXISTING_ACCOUNT") {
      setValidationError("EXISTING_ACCOUNT");
    }
  }, [state]);

  return (
    <div className="card dark:bg-black bg-base-100 shadow-xl dark:text-black">
      <div className="card-body p-2">
        <h2 className="card-title dark:text-stone-300 pt-2 pl-2">
          Dina uppgifter
        </h2>
        <form className="pt-4" action={formAction}>
          <div className="flex flex-col gap-4">
            <label className="input input-bordered flex items-center gap-2 dark:bg-gray-900 dark:text-stone-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                name="email"
                className="grow"
                placeholder="E-post"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 dark:bg-gray-900 dark:text-stone-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                name="name"
                className="grow"
                placeholder="Förnamn (om du vill)"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 dark:bg-gray-900 dark:text-stone-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                name="password"
                placeholder="Lösenord"
                className="grow"
              />
            </label>
            {validationError && (
              <div>
                EXISTING USER <Link href="/login">Click here to login</Link>
              </div>
            )}
          </div>
          <div className="card-actions justify-end pt-6">
            <button
              type="submit"
              className="btn btn-primary dark:btn-ghost dark:border-gray-400 dark:text-stone-300"
            >
              Registrera
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
