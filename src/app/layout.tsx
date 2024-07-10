import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/navbar";
import Footer from "./ui/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hertz Alertz",
  description: "Just a hobby thing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="bumblebee">
      <body className={inter.className}>
        <Navbar />
        <div className="flex justify-center dark:bg-slate-900 bg-gradient-to-r from-hertz dark:from-yellow-600 to-secondary dark:to-yellow-700 h-screen mx-auto pt-10 w-full px-2">
          <div className="w-full md:max-w-[50rem] lg:max-w-[70rem]">
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
