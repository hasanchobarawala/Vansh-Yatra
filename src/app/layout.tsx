// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Vansh Yatra",
  description: "Visually trace your family lineage and preserve stories.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-body antialiased">
        {/* PAGE CONTENT */}
        {children}

        {/* Global toast */}
        <Toaster />

        {/* SINGLE GLOBAL FOOTER (gold + bold) */}
        <footer className="text-center py-6 text-yellow-500 font-bold">
          App Developed by Hasan Chobarawala · +91-9926652153
        </footer>
      </body>
    </html>
  );
}
