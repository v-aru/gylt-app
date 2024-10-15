import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/backend/model/User";
import { compare } from 'bcryptjs';
import dbConnect from "@/backend/dbConnect";

async function findUserByEmail(email) {
  return await User.findOne({ email });
}

// async function loginFunction(email, password) {
//   const user = await findUserByEmail(email);
//   if (!user) {
//     throw new Error("No user found with this email");
//   }

//   const isMatch = await compare(password, user.password);
//   if (!isMatch) {
//     throw new Error("Invalid password");
//   }

//   return {
//     id: user._id,
//     firstName: user.name,
//     email: user.email,
//     image: user.image || null,
//   };
// }


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
    // CredentialsProvider({
    //   name: "Email",
    //   credentials: {
    //     email: { label: "Email", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     return await loginFunction(credentials.email, credentials.password);
    //   },
    // }),
  ],
  pages: {
    signIn: "/profile",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await User.findOne({ email: user.email });
        token.id = dbUser.id;
        token.email = dbUser.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
    async signIn({ user, account, profile }) {
      await dbConnect();

      try {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          console.log('User does not exist, creating new user');
          const newUser = new User({
            email: user.email,
            username: user.name,
            profileImage: user.image, 
            oauthProvider: account.provider, 
            age: user.age ? user.age : undefined,
            dateOfBirth: user.dateOfBirth ? user.dateOfBirth : undefined,
            gender: user.gender ? user.gender : undefined,
          });
          await newUser.save();
        }
        return true; 
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false; 
      }
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
  },
});
