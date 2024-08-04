"use server";

import bcrypt from "bcrypt";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { auth, signIn } from "../../../auth";
import { AuthError } from "next-auth";
import { capitalizeFirst } from "./utils";

export async function addEntry(state: any, formData: FormData) {
  return {
    success: true,
    data: {
      hej: "på dig",
    },
  };
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return error.cause?.err?.message;
    }
    throw error;
  }
}

export async function signUp(state: any, formData: FormData) {
  const { emailData, passwordData, nameData } = {
    emailData: formData.get("email")?.toString(),
    passwordData: formData.get("password")?.toString(),
    nameData: formData.get("name")?.toString(),
  };

  const checkExistingUserPromise =
    await sql`SELECT * FROM users AS u WHERE u.email = ${emailData}`;

  const existingUser = checkExistingUserPromise.rows[0];
  if (existingUser) {
    console.warn("User already exists. Sign in instead.");
    return {
      success: false,
      errorCode: "EXISTING_ACCOUNT",
      message: "User already exists. Sign in instead.",
    };
  } else {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(passwordData as string, salt);
    const insertedUser = await sql`
      INSERT INTO users (name, email, password)
      VALUES (${nameData}, ${emailData}, ${hashedPassword})`;

    redirect("/subscriptions");
  }
}

export async function getCitiesData() {
  const citiesPromise = await sql`SELECT * FROM cities ORDER BY name`;
  const rows = citiesPromise.rows;

  const prettyData = rows.map((row) => ({
    id: row.id,
    name: row.name,
  }));
  return prettyData;
}

export async function getSubscriptionsDataByUserId(id: string) {
  const allSubscriptionsPromise =
    await sql`SELECT * FROM subscriptions AS s WHERE s.user_id = ${id}`;
  const rows = allSubscriptionsPromise.rows;

  const prettyData = rows.map((row) => ({
    id: row.id,
    from_city: row.from_city,
    to_city: row.to_city,
  }));
  return prettyData;
}

export async function deleteSubscription(prevState: any, formData: FormData) {
  const { userId } = {
    userId: formData.get("userId")?.toString(),
  };
  try {
    await sql`
        DELETE FROM subscriptions AS s WHERE s.id = ${userId}  
      `;
    console.log("Subscription deleted OK");
  } catch (error) {
    console.error("Database Error: Failed to Delete Subscription", error);
    return {
      message: "Database Error: Failed to Delete Subscription.",
    };
  } finally {
    revalidatePath("/subscriptions");
    redirect("/subscriptions");
  }
}

export async function createNewSubscription(
  prevState: any,
  formData: FormData
) {
  const session = await auth();
  const userId = session?.user?.id || "";

  const { fromCityData, toCityData } = {
    fromCityData: formData.get("fromCity")?.toString(),
    toCityData: formData.get("toCity")?.toString(),
  };

  if (fromCityData === toCityData) {
    console.error(
      "Database Error: Pickup and destination cities cannot be identical."
    );

    return {
      errorCode: "IDENTICAL_CITIES",
      message:
        "Database Error: Pickup and destination cities cannot be identical.",
    };
  }
  const fromCity = fromCityData === "ALLA" ? null : fromCityData;
  const toCity = toCityData === "ALLA" ? null : toCityData;
  try {
    await sql`
    INSERT INTO subscriptions (user_id, from_city, to_city)
    VALUES (${userId}, ${fromCity ? fromCity : null}, ${toCity ? toCity : null})
  `;
    console.log("Subscription inserted OK");
  } catch (error) {
    console.error("Database Error: Failed to Create Subscription", error);
    return {
      message: "Database Error: Failed to Create Subscription.",
    };
  } finally {
    revalidatePath("/subscriptions");
    redirect("/subscriptions");
  }
}
