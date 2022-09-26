import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        //write our own logic to authorize the user
        // console.log(credentials);
        const client = await connectToDatabase();
        const usersCollections = client.db().collection("users");

        const user = await usersCollections.findOne({
          email: credentials.email,
        });
        // console.log(user);
        if (!user) {
          client.close();
          throw new Error("No User Found");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("wrong credentials");
        }
        client.close();
        return user;
      },
    }),
  ],
});
