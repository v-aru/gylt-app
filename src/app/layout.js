import React from "react";
import Layout from "@/components/Layout/Layout"; 

export const metadata = {
  title: "GYLT App",
  description: "Get Your Life Together - A life management tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
