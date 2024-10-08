import Navigation from "../src/components/Navigation/Navigation";
// import { GlobalFontStyle } from './public/assets/fonts/GlobalFontStyle';
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Navigation />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
