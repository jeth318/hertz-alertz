import { getSession } from "next-auth/react";
import { auth, signIn } from "../../../auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await auth();
  if (session?.user?.id) {
    redirect("/subscriptions");
  }
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("credentials", formData);
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  );
}
