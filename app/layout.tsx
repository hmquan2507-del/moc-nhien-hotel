import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Mộc Nhiên Hotel | Khách sạn tại Liên Chiểu, Đà Nẵng",
    template: "%s | Mộc Nhiên Hotel",
  },

  description:
    "Mộc Nhiên Hotel tại Liên Chiểu, Đà Nẵng. Xem phòng, chọn thời lượng lưu trú, xem giá tạm tính và đặt phòng nhanh qua Zalo hoặc điện thoại.",

  keywords: [
    "Mộc Nhiên Hotel",
    "khách sạn Liên Chiểu",
    "khách sạn Đà Nẵng",
    "khách sạn Hòa Khánh",
    "khách sạn gần Hòa Khánh",
    "đặt phòng khách sạn Đà Nẵng",
    "khách sạn giá tốt Đà Nẵng",
    "nhà nghỉ Liên Chiểu",
    "khách sạn thuê giờ Đà Nẵng",
  ],

  authors: [{ name: "Mộc Nhiên Hotel" }],
  creator: "Mộc Nhiên Hotel",
  publisher: "Mộc Nhiên Hotel",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    title: "Mộc Nhiên Hotel | Đặt phòng nhanh tại Liên Chiểu, Đà Nẵng",
    description:
      "Xem phòng, chọn thời lượng lưu trú, xem giá tạm tính và đặt phòng nhanh qua Zalo hoặc điện thoại.",
    url: siteUrl,
    siteName: "Mộc Nhiên Hotel",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Mộc Nhiên Hotel - Khách sạn tại Liên Chiểu, Đà Nẵng",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Mộc Nhiên Hotel | Đặt phòng nhanh tại Đà Nẵng",
    description:
      "Xem phòng, chọn thời lượng lưu trú, xem giá tạm tính và đặt phòng nhanh qua Zalo hoặc điện thoại.",
    images: ["/opengraph-image.png"],
  },

 icons: {
  icon: "/icon",
  shortcut: "/icon",
  apple: "/icon",
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
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}