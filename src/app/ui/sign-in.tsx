"use client";

import { useFormState } from "react-dom";
import { authenticate } from "../lib/actions";
import { useEffect, useState } from "react";
import Image from "next/image";

const errorMap: Record<string, string> = {
  USER_NOT_FOUND: "Hittade ingen användare med den angivna epostaddressen",
  INVALID_CREDENTIALS: "Felaktigt lösenord",
  INVALID_INPUT: "Felaktiga uppgifter",
};

function getErrorMessage(errorCode: string) {
  return errorMap[errorCode];
}

export default function SignIn() {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, formAction, isPending] = useFormState(
    authenticate,
    undefined
  );

  useEffect(() => {
    if (errorMessage) {
      setHasError(true);
    }
  }, [errorMessage]);

  return (
    <form className="shadow-md" action={formAction}>
      <div className="p-8 align-center rounded-md dark:bg-slate-700 dark:text-black bg-base-100 mx-auto flex flex-col gap-4">
        <div className="flex justify-center">
          <Image
            className="dark:hidden"
            alt="moving-car"
            width={150}
            height={50}
            src="/car-running.gif"
          />
        </div>

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="dark:white currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            onChange={() => setHasError(false)}
            name="email"
            type="text"
            className="grow"
            placeholder="Email"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="dark:white currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            onChange={() => setHasError(false)}
            name="password"
            type="password"
            placeholder="Password"
            className="grow"
          />
        </label>
        {/*       <div className="flex justify-center bg-base-100 rounded-md">
        <form action={formAction}>
          <div className="flex flex-col">
            <label>
              Email
              <input className="border" name="email" type="email" />
            </label>
            <label>
              Password
              <input name="password" type="password" />
            </label>
            <button className="btn btn-primary">Hello daisyUI!</button>
            <div className="flex h-8 items-end space-x-1">
              {errorMessage && (
                <p className="text-sm text-red-500">
                  {getErrorMessage(errorMessage)}
                </p>
              )}
            </div>
          </div>
        </form>
      </div> */}
        {hasError && errorMessage && (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{getErrorMessage(errorMessage)}</span>
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Logga in
        </button>
      </div>
    </form>
  );
}
