"use client";

import { useFormState } from "react-dom";
import { authenticate } from "../lib/actions";

const errorMap: Record<string, string> = {
  USER_NOT_FOUND: "Hittade ingen användare med den angivna epostaddressen",
  INVALID_CREDENTIALS: "Felaktigt lösenord",
  INVALID_INPUT: "Felaktiga uppgifter",
};

function getErrorMessage(errorCode: string) {
  return errorMap[errorCode];
}

export default function SignIn() {
  const [errorMessage, formAction, isPending] = useFormState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction}>
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
      <div className="flex h-8 items-end space-x-1">
        {errorMessage && (
          <p className="text-sm text-red-500">
            {getErrorMessage(errorMessage)}
          </p>
        )}
      </div>
    </form>
  );
}
