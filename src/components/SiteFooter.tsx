"use client";

import { usePathname } from "next/navigation";
import { InstagramIcon, MapPinIcon } from "./icons";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("مقابل القلعة — أول مدخل المدينة — دوار التأمينات — حماة");
const INSTAGRAM_URL = "https://instagram.com/two.qahwa";

export default function SiteFooter() {
  const pathname = usePathname();
  const hasFixedBar =
    pathname.startsWith("/product/") ||
    pathname === "/checkout" ||
    (pathname.startsWith("/orders/") && pathname !== "/orders");

  return (
    <footer className="mt-8">
      <div className={`mx-auto max-w-lg px-4 ${hasFixedBar ? "pb-36" : "pb-28"}`}>
        <div className="rounded-3xl bg-brand-900 text-brand-50 p-4 shadow-lg shadow-brand-950/10">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="قهوة 2"
              className="w-10 h-10 rounded-full shrink-0"
            />
            <span className="flex-1 min-w-0">
              <span className="block text-xs font-extrabold">قهوة 2 — حماة</span>
              <span className="block text-[11px] font-bold text-brand-200/90 mt-0.5">
                مقابل القلعة — أول مدخل المدينة | دوار التأمينات (اضغط لفتح الخريطة)
              </span>
            </span>
            <MapPinIcon className="w-5 h-5 text-brand-300 shrink-0" />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2.5 text-[11px] font-bold text-brand-100/90"
          >
            <InstagramIcon className="w-4 h-4 text-brand-300" />
            تابعنا على انستغرام
            <span dir="ltr" className="text-brand-200/80">
              @two.qahwa
            </span>
          </a>
        </div>
        <p className="text-center text-[11px] font-bold text-brand-800/60 mt-3">
          تطوير المنصة: م. قصي مهند الصالح —{" "}
          <a href="tel:0952639157" dir="ltr" className="text-brand-700">
            0952639157
          </a>
        </p>
      </div>
    </footer>
  );
}
