import "./globals.css";
import type { Metadata } from "next";

// ✅ RELATIVE IMPORT (layout.tsx से ../components/ui/AuthForm.tsx तक)
import AuthForm from "../components/ui/AuthForm";

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
      <body className="font-body antialiased bg-black text-white">
        {/* Top-right login box */}
        <header className="fixed top-4 right-4 z-50">
          <div className="w-72 rounded-lg bg-neutral-900/90 p-4 shadow">
            <AuthForm />
          </div>
        </header>

        {/* Main content */}
        <main className="min-h-screen px-4 pt-24 pb-24 flex flex-col items-center">
          {children}
        </main>

        {/* Footer */}
        <footer className="fixed bottom-3 left-0 right-0 text-center text-sm text-gray-400">
          App Developed by Hasan Chobarawala · +91-9926652153
        </footer>
      </body>
    </html>
  );
}
