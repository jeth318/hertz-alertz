import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!
import { User } from "@/app/lib/definitions";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;

        if (!credentials?.email || !credentials?.password) {
          throw new Error("INVALID_INPUT");
        }
        // logic to salt and hash password

        // logic to verify if user exists
        user = await getUser(credentials?.email as string);

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("USER_NOT_FOUND");
        }
        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (passwordsMatch) {
          return user;
        }
        throw new Error("INVALID_CREDENTIALS");
      },
    }),
  ],
});
