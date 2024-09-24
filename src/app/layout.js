import Navigation from "../components/Navigation/Navigation"; 

export const metadata = {
  title: "GYLT App",
  description: "Get Your Life Together - A life management tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation /> 
        {children}
      </body>
    </html>
  );
}
