// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vansh Yatra",
  description: "Visually trace your family lineage and preserve your stories.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-black text-white">
        {children}

        {/* Global footer - appears only once on every page */}
        <footer className="text-center text-gray-400 text-sm py-6">
          App Developed by Hasan Chobarawala · +91-9926652153
        </footer>
      </body>
    </html>
  );
}
