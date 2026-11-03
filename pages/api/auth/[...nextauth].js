import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/backend/dbConnect";
import User from "@/backend/model/User";

const providers = [
  CredentialsProvider({
    name: "Email",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      await dbConnect();
      const user = await User.findOne({ email: credentials.email?.toLowerCase() }).select("+password");
      if (!user || !(await user.comparePassword(credentials.password))) {
        return null;
      }
      return {
        id: user.id,
        name: user.firstName || user.username,
        email: user.email,
        image: user.profileImage || null,
      };
    },
  }),
];

// OAuth providers are optional: they are only offered when their keys are configured.
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}
if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.push(
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  );
}
if (process.env.FACEBOOK_ID && process.env.FACEBOOK_SECRET) {
  providers.push(
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      authorization: { params: { scope: "email,public_profile" } },
    })
  );
}

export const authOptions = {
  providers,
  pages: {
    signIn: "/profile",
    error: "/profile",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") return true;
      try {
        await dbConnect();
        const existingUser = await User.findOne({ email: user.email?.toLowerCase() });
        if (!existingUser) {
          await User.create({
            email: user.email,
            username: user.name,
            profileImage: user.image,
            oauthProvider: account.provider,
          });
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === "credentials") {
          token.id = user.id;
        } else {
          await dbConnect();
          const dbUser = await User.findOne({ email: user.email?.toLowerCase() });
          token.id = dbUser?.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
