/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import MainLayout from "@/Layouts/MainLayout";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "MEA GCEB",
  description: "GCEB's Mechanical Engineering Association",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Protest+Guerrilla&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`min-h-screen w-screen ${poppins.className} bg-black`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
