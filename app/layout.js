import "./globals.css";
import Footer from "./Footer";
import Header from "./Header";

export const metadata = {
  metadataBase: new URL("https://fruit-shop-next-js-main.vercel.app"),
  title: "Fruit Shop | Fresh fruit, simple shopping",
  description:
    "Uma loja virtual bilíngue de frutas, desenvolvida com Next.js e Stripe.",
  openGraph: {
    title: "Fruit Shop",
    description: "Fresh fruit, simple shopping.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <div id="portal" />
      </body>
    </html>
  );
}
