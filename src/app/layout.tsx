import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vansh Yatra",
  description: "Know your roots, build your legacy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">{children}</main>
          <footer className="text-yellow-500 font-bold text-center py-4">
            App Developed by Hasan Chobarawala · +91-9926652153
          </footer>
        </div>
      </body>
    </html>
  );
}
