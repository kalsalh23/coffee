import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import BottomNav from "@/components/BottomNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "قهوة 2 | Twoqahwa — قهوة مختصة",
  description:
    "قهوة 2 (Twoqahwa) — قهوة مختصة ومشروبات وحلويات في حماة، مقابل القافلة أول مخبر العنيدة. اطلب الآن واستلم من الفرع أو نوصلها لباب بيتك.",
};

export const viewport: Viewport = {
  themeColor: "#1a1815",
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
