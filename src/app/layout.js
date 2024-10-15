"use client";
import React from "react";
import Layout from "@/components/Layout/Layout"; 
import { SessionProvider } from "next-auth/react";

// export const metadata = {
//   title: "GYLT App",
//   description: "Get Your Life Together - A life management tool",
// };

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
    <html lang="en">
      <head>
        <title>GYLT App</title>
        <meta name="description" content={"Get Your Life Together - A life management tool"} />
      </head>
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
    </SessionProvider>
  );
}
