import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import BottomNav from "@/components/BottomNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Coffee Sir | قهوة مختصة",
  description:
    "Coffee Sir — قهوة مختصة ومشروبات وحلويات في حماة. اطلب الآن واستلم من الفرع أو نوصلها لباب بيتك.",
};

export const viewport: Viewport = {
  themeColor: "#a51e2e",
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
