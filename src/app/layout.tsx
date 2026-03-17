import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const siteUrl = "https://nicocantarelli.com";

export const metadata: Metadata = {
  title: {
    default: "Nico Cantarelli",
    template: "%s | Nico Cantarelli",
  },
  description: "Frontend developer specializing in Shopify themes, WordPress, and custom web development. I build websites from your designs.",
  keywords: ["frontend developer", "Shopify developer", "WordPress developer", "web developer", "freelance developer"],
  authors: [{ name: "Nico Cantarelli" }],
  creator: "Nico Cantarelli",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Nico Cantarelli",
    title: "Nico Cantarelli - Frontend Developer",
    description: "Frontend developer specializing in Shopify themes, WordPress, and custom web development. I build websites from your designs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nico Cantarelli - Frontend Developer",
    description: "Frontend developer specializing in Shopify themes, WordPress, and custom web development.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cascadia+Code:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nico Cantarelli",
              url: siteUrl,
              jobTitle: "Frontend Developer",
              description: "Frontend developer specializing in Shopify themes, WordPress, and custom web development.",
              knowsAbout: ["Shopify", "WordPress", "React", "Next.js", "JavaScript", "CSS", "Web Development"],
              sameAs: [],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
