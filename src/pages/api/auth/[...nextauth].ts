import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const jwt = require("jsonwebtoken");

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials: any, req) {
        const { username } = credentials;
        const payload = {
          username: username,
        };

        const token = jwt.sign(payload, process.env.NEXT_AUTH_SECRET);
        return {
          id: token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }: any) {
      session["token"] = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXT_AUTH_SECRET,
};

export default NextAuth(authOptions);
