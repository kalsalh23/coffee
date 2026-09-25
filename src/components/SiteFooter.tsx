"use client";

import { usePathname } from "next/navigation";
import { MapPinIcon } from "./icons";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("5minute coffee حماة شارع أبي الفدا دوار القصف");

export default function SiteFooter() {
  const pathname = usePathname();
  const hasFixedBar =
    pathname.startsWith("/product/") ||
    pathname === "/checkout" ||
    (pathname.startsWith("/orders/") && pathname !== "/orders");

  return (
    <footer className="mt-8">
      <div className={`mx-auto max-w-lg px-4 ${hasFixedBar ? "pb-36" : "pb-28"}`}>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-3xl bg-olive-900 text-olive-50 p-3.5 shadow-lg shadow-olive-950/10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="5mintcoffee"
            className="w-9 h-9 rounded-full shrink-0"
          />
          <span className="flex-1 min-w-0">
            <span className="block text-xs font-extrabold">5mintcoffee — حماة</span>
            <span className="block text-[11px] font-bold text-olive-200/85 mt-0.5">
              شارع أبي الفدا، دوار القصف
            </span>
          </span>
          <MapPinIcon className="w-5 h-5 text-olive-300 shrink-0" />
        </a>
        <p className="text-center text-[11px] font-bold text-olive-800/60 mt-3">
          تطوير المنصة: م. قصي مهند الصالح —{" "}
          <a href="tel:0952639157" dir="ltr" className="text-olive-700">
            0952639157
          </a>
        </p>
      </div>
    </footer>
  );
}
