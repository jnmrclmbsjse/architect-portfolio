import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatBubble } from "@/components/ai-chat/ChatBubble";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://junmarjose.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Junmar Jose | Software Architect, Technical Lead & Full Stack Engineer",
    template: "%s | Junmar Jose",
  },
  description:
    "I design systems, lead teams, and build full-stack products from idea to production.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Junmar Jose",
    title: "Junmar Jose | Software Architect, Technical Lead & Full Stack Engineer",
    description:
      "I design systems, lead teams, and build full-stack products from idea to production.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Junmar Jose | Software Architect, Technical Lead & Full Stack Engineer",
    description:
      "I design systems, lead teams, and build full-stack products from idea to production.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${sora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <Navbar />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
            <ChatBubble />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
