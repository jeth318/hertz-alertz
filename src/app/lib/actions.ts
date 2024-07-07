import { revalidatePath } from "next/cache";
import { fakeSessionUser } from "./placeholder-data";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

export async function getSubscriptionsDataByUserId(id: number) {
  const allSubscriptionsPromise =
    await sql`SELECT * FROM subscriptions AS s WHERE s.user_id = ${id}`;
  const rows = await allSubscriptionsPromise.rows;

  const prettyData = rows.map((row) => ({
    id: row.id,
    from_city: row.from_city,
    to_city: row.to_city,
  }));
  return prettyData;
}

export async function deleteSubscription(id: number) {
  console.log("IDDDDDD", id);

  try {
    await sql`
        DELETE FROM subscriptions AS s WHERE s.id = ${id}  
      `;
    console.log("Subscription deleted OK");
  } catch (error) {
    console.error("Database Error: Failed to Delete Subscription");
    return {
      message: "Database Error: Failed to Delete Subscription.",
    };
  } finally {
    revalidatePath("/subscriptions");
    redirect("/subscriptions");
  }
}

export async function createNewSubscription(
  userId: number,
  formData: FormData
) {
  const { fromCity, toCity } = {
    fromCity: formData.get("fromCity")?.toString(),
    toCity: formData.get("toCity")?.toString(),
  };

  console.log({ fromCity, toCity, userId });
  /*   if (typeof fromCity !== "string" || typeof toCity !== "string") {
    console.log("Validation error for cities in create subscription");
    return {
      message: "Validation error for cities in create subscription.",
    };
  } */

  if (fromCity === toCity) {
    console.error(
      "Database Error: Pickup and destination cities cannot be identical."
    );

    return {
      message:
        "Database Error: Pickup and destination cities cannot be identical.",
    };
  }

  try {
    await sql`
    INSERT INTO subscriptions (user_id, from_city, to_city)
    VALUES (${userId}, ${fromCity}, ${toCity})
  `;
    console.log("Subscription inserted OK");
  } catch (error) {
    console.error("Database Error: Failed to Create Subscription");
    return {
      message: "Database Error: Failed to Create Subscription.",
    };
  } finally {
    revalidatePath("/subscriptions");
    redirect("/subscriptions");
  }
}
