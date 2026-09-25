import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import BottomNav from "@/components/BottomNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "5mintcoffee | قهوة مختصة",
  description:
    "تطبيق 5mintcoffee — قهوة مختصة ومشروبات وحلويات. اطلب الآن واستلم خلال 5 دقائق.",
};

export const viewport: Viewport = {
  themeColor: "#4e5b39",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <CartProvider>
          {children}
          <SiteFooter />
          <BottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
