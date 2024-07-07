import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import { users, subscriptions, offers, cities } from "../lib/placeholder-data";

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (name, email, password)
        VALUES (${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedOffers() {
  try {
    // Create the "offers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS offers (
        id SERIAL PRIMARY KEY,
        from_city VARCHAR(255) NULL,
        to_city VARCHAR(255) NULL
      );
    `;

    console.log(`Created "offers" table`);

    // Insert data into the "offers" table
    const insertedOffers = await Promise.all(
      offers.map(async (offer) => {
        return client.sql`
          INSERT INTO offers (id, from_city, to_city)
          VALUES (${offer.id}, ${offer.from_city}, ${offer.to_city})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    return {
      createTable,
      offers: insertedOffers,
    };
  } catch (error) {
    console.error("Error creating offers table:", error);
    throw error;
  }
}

async function seedCities() {
  try {
    // Create the "cities" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS cities (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL UNIQUE
        );
      `;

    console.log(`Created "cities" table`);

    // Insert data into the "cities" table
    const insertedCities = await Promise.all(
      cities.map(async (city) => {
        return client.sql`
            INSERT INTO cities (id, name)
            VALUES (${city.id}, ${city.name})
            ON CONFLICT (id) DO NOTHING;
          `;
      })
    );

    return {
      createTable,
      cities: insertedCities,
    };
  } catch (error) {
    console.error("Error creating cities table:", error);
    throw error;
  }
}

async function seedSubscriptions() {
  try {
    // Create the "subscriptions" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        from_city TEXT,
        to_city TEXT,
        CONSTRAINT check_cities_different CHECK (from_city IS DISTINCT FROM to_city),
        CONSTRAINT check_at_least_one_populated CHECK (from_city IS NOT NULL OR to_city IS NOT NULL)
      );
    `;

    console.log(`Created "subscriptions" table`);
    // Insert data into the "subscriptions" table
    const insertedSubscriptions = await Promise.all(
      subscriptions.map(async (subscription) => {
        return client.sql`
          INSERT INTO subscriptions (id, user_id, from_city, to_city)
          VALUES (${subscription.id}, ${subscription.user_id}, ${subscription.from_city}, ${subscription.to_city})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    return {
      createTable,
      subscriptions: insertedSubscriptions,
    };
  } catch (error) {
    console.error("Error creating subscriptions table:", error);
    throw error;
  }
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    //await seedUsers();
    await seedSubscriptions();
    //await seedOffers();
    //await seedCities();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
