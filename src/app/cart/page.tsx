"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/menu-config";
import PageHeader from "@/components/PageHeader";
import { CartIcon, MinusIcon, PlusIcon, TrashIcon } from "@/components/icons";

export default function CartPage() {
  const { items, subtotal, count, hydrated, dispatch } = useCart();
  const router = useRouter();

  if (!hydrated) {
    return (
      <main className="mx-auto max-w-lg px-4 pb-40">
        <PageHeader title="السلة" />
        <div className="mt-6 space-y-3" aria-busy="true">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 rounded-3xl bg-olive-100 animate-pulse" />
          ))}
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-lg px-4 pb-40">
        <PageHeader title="السلة" />
        <div className="mt-20 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-olive-100 flex items-center justify-center">
            <CartIcon className="w-10 h-10 text-olive-600" />
          </div>
          <h2 className="mt-5 text-lg font-black">سلتك فاضية</h2>
          <p className="mt-1 text-sm text-olive-800/70 font-medium">
            تصفح الممنو واخترلك شي يشدك ☕
          </p>
          <Link
            href="/menu"
            className="mt-6 inline-block bg-olive-700 text-olive-50 font-extrabold text-sm px-8 py-3.5 rounded-full active:scale-95 transition-transform"
          >
            تصفح الممنو
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-4 pb-48">
      <PageHeader title={`السلة (${count})`} />

      <div className="mt-2 space-y-3">
        {items.map((item) => (
          <div
            key={item.key}
            className="bg-white border border-olive-100 rounded-3xl p-3 flex gap-3 items-center"
          >
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-olive-100 to-olive-200 flex items-center justify-center text-3xl">
              {item.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-extrabold text-sm leading-snug">{item.nameAr}</h3>
                <button
                  onClick={() => dispatch({ type: "REMOVE", key: item.key })}
                  aria-label="حذف"
                  className="text-olive-800/40 hover:text-red-500 transition-colors p-1"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[11px] text-olive-800/60 font-semibold mt-0.5 truncate">
                {[item.size?.label, ...item.extras.map((e) => e.label)].filter(Boolean).join(" • ") ||
                  "بدون إضافات"}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-black text-olive-700 text-sm">
                  {formatPrice(item.unitPrice * item.qty)}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch({ type: "SET_QTY", key: item.key, qty: item.qty - 1 })}
                    aria-label="إنقاص"
                    className="w-7 h-7 rounded-lg bg-olive-50 border border-olive-100 flex items-center justify-center text-olive-800 active:scale-95 transition-transform"
                  >
                    <MinusIcon className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-5 text-center font-black text-sm">{item.qty}</span>
                  <button
                    onClick={() => dispatch({ type: "SET_QTY", key: item.key, qty: Math.min(99, item.qty + 1) })}
                    aria-label="زيادة"
                    className="w-7 h-7 rounded-lg bg-olive-700 text-olive-50 flex items-center justify-center active:scale-95 transition-transform"
                  >
                    <PlusIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 bg-white border border-olive-100 rounded-3xl p-4 space-y-2">
        <div className="flex justify-between text-sm font-bold">
          <span className="text-olive-800/70">المجموع الفرعي</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-xs font-semibold text-olive-800/60">
          <span>رسوم التوصيل</span>
          <span>15 ر.س (تُحسب عند اختيار التوصيل)</span>
        </div>
      </div>

      <section className="mt-4 rounded-3xl bg-olive-900 text-olive-50 shadow-xl shadow-olive-950/25 flex items-center justify-between p-3 ps-5">
        <div>
          <p className="text-[11px] font-semibold text-olive-300">المجموع الفرعي</p>
          <p className="font-black text-lg leading-tight">{formatPrice(subtotal)}</p>
        </div>
        <button
          onClick={() => router.push("/checkout")}
          className="bg-white text-olive-900 font-extrabold text-sm rounded-2xl px-6 py-3 active:scale-95 transition-transform"
        >
          متابعة الطلب
        </button>
      </section>
    </main>
  );
}
