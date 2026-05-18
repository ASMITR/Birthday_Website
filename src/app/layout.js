import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
});
const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});

export const metadata = {
  title: "Happy Birthday!",
  description: "Celebrate your day with joy and happiness!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/images/1.png" />
      </head>
      <body
        className={`${playfair.variable} ${lato.variable} font-lato antialiased bg-background select-none`}
      >
        {children}
      </body>
    </html>
  );
}
