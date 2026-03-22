import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Alok Kumar Panday | Full Stack Developer",
  description:
    "Full Stack Developer specializing in Next.js, React.js, Firebase, Flutter, and PHP. Building scalable web and mobile applications.",
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "React.js",
    "Firebase",
    "Flutter",
    "PHP Developer",
    "Alok Kumar Panday",
    "Portfolio",
  ],
  authors: [{ name: "Alok Kumar Panday" }],
  openGraph: {
    title: "Alok Kumar Panday | Full Stack Developer",
    description: "Full Stack Developer specializing in Next.js, React, Firebase, Flutter",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <AuthProvider>
          {children}
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
