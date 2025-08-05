import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chroma DB Explorer | Professional Vector Database Management",
  description: "Professional vector database management tool for Chroma DB. Browse collections, view documents, and perform semantic search with an intuitive interface.",
  keywords: "Chroma DB, Vector Database, AI, Machine Learning, Document Search, Semantic Search",
  authors: [{ name: "Vaishakh Krishnan" }],
  creator: "Vaishakh Krishnan",
  openGraph: {
    title: "Chroma DB Explorer",
    description: "Professional Vector Database Management Tool",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
