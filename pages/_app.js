import Navigation from "../src/components/Navigation/Navigation";
// import { GlobalFontStyle } from './public/assets/fonts/GlobalFontStyle';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      {/* <GlobalFontStyle /> */}
      <Navigation />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
