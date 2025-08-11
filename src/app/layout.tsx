import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chroma-db-explorer.vercel.app"),
  title: {
    default: "Chroma DB UI - Best ChromaDB GUI & Vector Database Explorer",
    template: `%s | Chroma DB UI - ChromaDB GUI`,
  },
  description:
    "Chroma DB UI - The best ChromaDB GUI and vector database explorer. Intuitive interface for managing ChromaDB collections, performing semantic searches, and visualizing vector embeddings. Perfect for AI developers and data scientists.",
  keywords: [
    "chroma db ui",
    "chroma db gui",
    "chromadb ui",
    "chromadb gui",
    "chroma database ui",
    "chroma database gui",
    "vector database ui",
    "vector database gui",
    "chromadb explorer",
    "chromadb manager",
    "chromadb interface",
    "chromadb web ui",
    "chromadb dashboard",
    "vector db ui",
    "vector db gui",
    "semantic search ui",
    "embedding database ui",
    "ai database gui",
    "rag pipeline ui",
    "machine learning database ui",
    "Vaishakh Krishnan",
    "AI development tools",
    "RAG pipeline",
    "ChromaDB",
    "Vector DB",
  ],
  authors: [
    { name: "Vaishakh Krishnan", url: "https://github.com/WildFire49" },
  ],
  creator: "Vaishakh Krishnan",
  publisher: "Vaishakh Krishnan",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://chroma-db-explorer.vercel.app",
  },
  openGraph: {
    title: "Chroma DB UI - Best ChromaDB GUI & Vector Database Explorer",
    description:
      "Chroma DB UI - The best ChromaDB GUI and vector database explorer. Intuitive interface for managing ChromaDB collections and performing semantic searches.",
    url: "https://chroma-db-explorer.vercel.app",
    siteName: "Chroma DB GUI & Explorer",
    images: [
      {
        url: "/Chroma.png",
        width: 1506,
        height: 861,
        alt: "Chroma DB GUI Document Browser",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chroma DB UI - Best ChromaDB GUI & Vector Database Explorer",
    description:
      "Chroma DB UI - The best ChromaDB GUI and vector database explorer. Perfect for AI developers and data scientists.",
    creator: "@Vai2052",
    images: ["/Chroma.png"],
  },
  icons: {
    icon: "/Chroma.png",
    shortcut: "/Chroma.png",
    apple: "/Chroma.png",
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <StructuredData />
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
