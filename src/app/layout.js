// import TitleBar from "@/components/TitleBar/TitleBar.jsx";
import Navigation  from "../components/Navigation/Navigation";

export const metadata = {
  title: "GYLT App",
  description: "Get Your Life Together - A life management tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content="metadata.description"></meta>
      </head>
      <body>
        {/* <TitleBar/> */}
        <Navigation /> 
        {children}
      </body>
    </html>
  );
}
