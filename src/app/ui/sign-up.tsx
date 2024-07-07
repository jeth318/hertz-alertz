"use client";

import { useFormState } from "react-dom";
import { addEntry, signUp } from "../lib/actions";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function SignUp() {
  const session = useSession();

  const [validationError, setValidationError] = useState("");
  const [state, formAction] = useFormState(signUp, null);

  useEffect(() => {
    if (state?.errorCode === "EXISTING_ACCOUNT") {
      setValidationError("EXISTING_ACCOUNT");
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row">
          <label>
            Namn
            <input name="name" type="text" />
          </label>
        </div>
        <div>
          <label>
            Email
            <input name="email" type="email" />
          </label>
        </div>
        <div>
          <label>
            Password
            <input name="password" type="password" />
          </label>
        </div>
        <button>Sign Up</button>
        {validationError && (
          <div>
            EXISTING USER <Link href="/login">Click here to login</Link>
          </div>
        )}
      </div>
    </form>
  );
}
