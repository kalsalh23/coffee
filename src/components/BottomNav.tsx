"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { CartIcon, HomeIcon, MenuIcon, ReceiptIcon } from "./icons";

const TABS = [
  { href: "/", label: "الرئيسية", Icon: HomeIcon },
  { href: "/menu", label: "المنيو", Icon: MenuIcon },
  { href: "/cart", label: "السلة", Icon: CartIcon },
  { href: "/orders", label: "طلباتي", Icon: ReceiptIcon },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { count, hydrated } = useCart();

  const hidden =
    pathname.startsWith("/product/") ||
    pathname === "/checkout" ||
    (pathname.startsWith("/orders/") && pathname !== "/orders");

  if (hidden) return null;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40">
      <div className="mx-auto max-w-lg px-3 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-1">
        <div className="grid grid-cols-4 rounded-3xl bg-brand-900/95 backdrop-blur shadow-xl shadow-brand-950/20 border border-brand-800/60">
          {TABS.map(({ href, label, Icon }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative flex flex-col items-center gap-1 rounded-3xl py-3 text-[11px] font-bold transition-colors ${
                  active ? "text-brand-100" : "text-brand-300/80 hover:text-brand-200"
                }`}
              >
                {active && (
                  <span className="absolute top-1.5 w-8 h-1 rounded-full bg-brand-300/90" />
                )}
                <span className="relative mt-1">
                  <Icon className="w-5 h-5" />
                  {href === "/cart" && hydrated && count > 0 && (
                    <span className="absolute -top-2 -left-2 min-w-4 h-4 px-1 rounded-full bg-cream text-brand-900 text-[10px] font-extrabold flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </span>
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
