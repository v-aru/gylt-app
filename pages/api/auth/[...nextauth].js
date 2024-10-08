import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
        clientId: process.env.GITHUB_ID, 
        clientSecret: process.env.GITHUB_SECRET, 
      }),
    FacebookProvider({
        clientId: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET, 
        authorization: {
            params: {
              scope: "email,public_profile",
            },
          },
      }),
  ],
  pages: {
    signIn: "/profile",
  },
});
