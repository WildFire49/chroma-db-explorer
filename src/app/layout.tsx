import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chroma-db-explorer.vercel.app"),
  title: {
    default: "Chroma DB GUI & Explorer | The Ultimate Vector Database Manager",
    template: `%s | Chroma DB GUI & Explorer`,
  },
  description:
    "The ultimate GUI for Chroma DB. Browse, search, and manage your vector database collections with a clean, professional, and intuitive interface. Built for developers and data scientists by Vaishakh Krishnan.",
  keywords: [
    "Chroma DB GUI",
    "ChromaDB UI",
    "Chroma DB Explorer",
    "Vector Database Manager",
    "Semantic Search Tool",
    "Next.js ChromaDB",
    "Material UI Database GUI",
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
    title: "Chroma DB GUI & Explorer | The Ultimate Vector Database Manager",
    description:
      "The ultimate GUI for Chroma DB. Browse, search, and manage your vector database collections with a clean and intuitive interface.",
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
    title: "Chroma DB GUI & Explorer | The Ultimate Vector Database Manager",
    description:
      "The ultimate GUI for Chroma DB. Browse, search, and manage your vector database collections.",
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
