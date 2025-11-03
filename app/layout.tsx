// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Upgrader",
  description: "AI-powered resume enhancer built with Next.js, TypeScript, and OpenAI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gray-50 text-gray-900 font-sans min-h-screen">
        <header className="w-full bg-white shadow-sm py-4 px-6">
          <h1 className="text-2xl font-bold text-center text-blue-600">
            🚀 Resume Upgrader
          </h1>
        </header>

        <main className="max-w-3xl mx-auto p-6">{children}</main>

        <footer className="w-full text-center py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Resume Upgrader. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
