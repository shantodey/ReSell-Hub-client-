import { Manrope } from "next/font/google";
import "./globals.css";


const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: "ReSell Hub",
  description: "Second-Hand Marketplace Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"className={`${manrope.variable} h-full antialiased`} >
      <body className="min-h-full flex flex-col">
        {children}</body>
    </html>
  );
}
