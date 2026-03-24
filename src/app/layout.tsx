import type { Metadata } from "next";
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
    url: siteUrl,
    siteName: "Nico Cantarelli",
    title: "Nico Cantarelli - Frontend Developer",
    description: "Frontend developer specializing in Shopify themes, WordPress, and custom web development. I build websites from your designs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nico Cantarelli - Frontend Developer",
    description: "Frontend developer specializing in Shopify themes, WordPress, and custom web development.",
    creator: "@bycantarelli",
    site: "@bycantarelli",
  },
  robots: {
    index: true,
    follow: true,
  },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return children;
}
