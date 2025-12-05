import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Resume Upgrader",
  description: "AI-powered resume enhancer built with Next.js, Clerk & Supabase.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gray-50 text-gray-900 font-sans min-h-screen">
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
