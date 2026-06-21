import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
});

const siteUrl = "https://moc-nhien-hotel.vercel.app";
const title = "Mộc Nhiên Hotel | Khách sạn tiện nghi tại Đà Nẵng";
const description =
  "Khách sạn Mộc Nhiên với không gian sạch sẽ, vị trí thuận tiện, hỗ trợ đặt phòng nhanh tại Đà Nẵng.";
const ogImage = "/images/hotel/exterior-main.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Mộc Nhiên Hotel",
  },
  description,
  keywords: [
    "Mộc Nhiên Hotel",
    "khách sạn Đà Nẵng",
    "khách sạn Liên Chiểu",
    "khách sạn Hòa Khánh",
    "đặt phòng khách sạn Đà Nẵng",
  ],
  authors: [{ name: "Mộc Nhiên Hotel" }],
  creator: "Mộc Nhiên Hotel",
  publisher: "Mộc Nhiên Hotel",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Mộc Nhiên Hotel",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Mặt tiền Mộc Nhiên Hotel tại Đà Nẵng",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "hotel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${playfair.variable}`}>{children}</body>
    </html>
  );
}
