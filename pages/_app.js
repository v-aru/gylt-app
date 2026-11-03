import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout/Layout";
import { HabitsProvider } from "@/context/HabitsContext";
import { SubscriptionsProvider } from "@/context/SubscriptionsContext";
import { ToastProvider } from "@/context/ToastContext";
import GlobalFontStyle from "../styles/GlobalFontStyle";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>GYLT – Get Your Life Together</title>
        <meta name="description" content="Get Your Life Together – track your habits and subscriptions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalFontStyle />
      <ToastProvider>
        <HabitsProvider>
          <SubscriptionsProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SubscriptionsProvider>
        </HabitsProvider>
      </ToastProvider>
    </SessionProvider>
  );
}
