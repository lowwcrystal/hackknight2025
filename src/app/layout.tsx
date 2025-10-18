import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Theme } from "@radix-ui/themes"; // Import Radix Theme
import "@radix-ui/themes/styles.css"; // Import Radix styles globally
import "./globals.css"; // Your existing global styles
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flame On",
  description: "Check how cooked your meat is 🔥",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap the app with Radix UI Theme */}
        <Theme>
          <NavBar></NavBar>
          {children}
          <Footer></Footer>
        </Theme>
      </body>
    </html>
  );
}
