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
      <body className="font-body antialiased pb-20 bg-black text-white">
        {children}

        {/* Fixed footer – har page par dikhai dega */}
        <footer className="fixed bottom-3 left-0 right-0 text-center text-sm text-gray-400">
          App Developed by Hasan Chobarawala · +91-9926652153
        </footer>
      </body>
    </html>
  );
}
