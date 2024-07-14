"use client";

import { useFormState } from "react-dom";
import { signUp } from "../lib/actions";
import { useEffect, useState } from "react";
import Link from "next/link";
import classes from "./classes";

const errorMap: Record<string, string> = {
  INVALID_CREDENTIALS: "Felaktigt lösenord",
  EXISTING_ACCOUNT: "Det finns redan ett konto med den angina e-postadressen.",
};

function getErrorMessage(errorCode: string) {
  return errorMap[errorCode];
}

export default function SignUp() {
  const [hasError, setHasError] = useState(false);
  const [state, formAction] = useFormState(signUp, null);

  const [formDetails, setFormDetails] = useState({
    email: "",
    name: "",
    password: "",
  });

  useEffect(() => {
    if (state?.errorCode) {
      setHasError(true);
    }
  }, [state]);
  return (
    <div className={classes.card}>
      <div className="card-body p-2">
        <h2 className="card-title dark:text-stone-300 pt-2 pl-2">
          Dina uppgifter
        </h2>
        <form className="pt-4" action={formAction}>
          <div className="flex flex-col gap-4">
            {/*             <label className={classes.label}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                onChange={(e) => {
                  setFormDetails({
                    ...formDetails,
                    name: e.target.value,
                  });
                  setHasError(false);
                }}
                type="text"
                name="name"
                className="grow"
                placeholder="Förnamn (om du vill)"
              />
            </label> */}
            <label className={classes.label}>
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
                onChange={(e) => {
                  setFormDetails({
                    ...formDetails,
                    email: e.target.value,
                  });
                  setHasError(false);
                }}
                type="text"
                name="email"
                className="grow"
                placeholder="E-post"
              />
            </label>

            <label className={classes.label}>
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
                onChange={(e) => {
                  setFormDetails({
                    ...formDetails,
                    password: e.target.value,
                  });
                  setHasError(false);
                }}
                type="password"
                name="password"
                minLength={5}
                placeholder="Lösenord"
                className="grow"
              />
            </label>
          </div>
          <div className="card-actions justify-end pt-6">
            <button
              type="submit"
              className={`${classes.button} ${
                formDetails.email && formDetails.password.length > 4
                  ? ""
                  : "btn-disabled"
              }`}
            >
              Registrera
            </button>
          </div>
        </form>
        {hasError && state?.errorCode && (
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
            <span>{getErrorMessage(state?.errorCode)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
