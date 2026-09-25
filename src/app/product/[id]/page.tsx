"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { CartItem, Product } from "@/lib/types";
import { extrasFor, formatPrice, sizesFor } from "@/lib/menu-config";
import { useCart } from "@/context/CartContext";
import PageHeader from "@/components/PageHeader";
import { CheckIcon, MinusIcon, PlusIcon } from "@/components/icons";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { dispatch, count } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sizeId, setSizeId] = useState<string>("");
  const [extraIds, setExtraIds] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    (async () => {
      const res = await supabase
        .from("products")
        .select("*, categories(slug)")
        .eq("id", id)
        .maybeSingle();
      if (!active) return;
      if (res.error || !res.data) {
        setError("لم نجد هذا المنتج");
      } else {
        setProduct(res.data as Product);
        const first = sizesFor(res.data.price_mode)[0];
        setSizeId(first ? first.id : "");
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [id]);

  const sizes = useMemo(() => sizesFor(product?.price_mode ?? ""), [product]);
  const extras = useMemo(() => extrasFor(product?.categories?.slug), [product]);

  const size = sizes.find((s) => s.id === sizeId) ?? null;
  const chosenExtras = extras.filter((e) => extraIds.includes(e.id));

  const unitPrice = product
    ? Number(product.base_price) + (size?.delta ?? 0) + chosenExtras.reduce((s, e) => s + e.price, 0)
    : 0;

  function toggleExtra(exId: string) {
    setExtraIds((prev) => (prev.includes(exId) ? prev.filter((x) => x !== exId) : [...prev, exId]));
  }

  function addToCart() {
    if (!product) return;
    const item: CartItem = {
      key: [product.id, sizeId, ...extraIds.slice().sort()].join("|"),
      productId: product.id,
      nameAr: product.name_ar,
      nameEn: product.name_en,
      emoji: product.emoji,
      size,
      extras: chosenExtras,
      qty,
      unitPrice,
    };
    dispatch({ type: "ADD", item });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2500);
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-lg px-4 pb-40">
        <PageHeader title="تفاصيل المنتج" />
        <div className="mt-4 space-y-4" aria-busy="true">
          <div className="aspect-[4/3] rounded-3xl bg-olive-100 animate-pulse" />
          <div className="h-7 w-40 rounded-lg bg-olive-100 animate-pulse" />
          <div className="h-20 rounded-2xl bg-olive-100 animate-pulse" />
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="mx-auto max-w-lg px-4 pb-40">
        <PageHeader title="تفاصيل المنتج" />
        <div className="mt-16 text-center">
          <p className="text-5xl">🫙</p>
          <p className="mt-4 font-bold">{error ?? "لم نجد هذا المنتج"}</p>
          <Link
            href="/menu"
            className="mt-5 inline-block bg-olive-700 text-olive-50 font-bold text-sm px-6 py-3 rounded-full"
          >
            رجوع للمنيو
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-4 pb-44">
      <PageHeader title={product.name_ar} />

      <div className="relative aspect-[4/3] rounded-3xl bg-gradient-to-br from-olive-100 via-olive-50 to-olive-200 flex items-center justify-center overflow-hidden mt-2">
        <span className="text-[7rem] drop-shadow">{product.emoji}</span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-black">{product.name_ar}</h1>
          <p className="text-sm text-olive-800/60 font-semibold mt-0.5" dir="ltr">
            {product.name_en}
          </p>
        </div>
        <span className="text-xl font-black text-olive-700 whitespace-nowrap">
          {formatPrice(Number(product.base_price))}
        </span>
      </div>

      {product.description_ar && (
        <p className="mt-2.5 text-sm leading-relaxed text-olive-900/80 font-medium bg-white border border-olive-100 rounded-2xl p-4">
          {product.description_ar}
        </p>
      )}

      {sizes.length > 0 && (
        <section className="mt-6">
          <h2 className="font-black mb-2.5">الحجم</h2>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((s) => (
              <button
                key={s.id}
                onClick={() => setSizeId(s.id)}
                className={`rounded-2xl py-3 text-sm font-bold border transition-colors ${
                  sizeId === s.id
                    ? "bg-olive-700 text-olive-50 border-olive-700"
                    : "bg-white border-olive-100 text-olive-900"
                }`}
              >
                {s.label}
                <span className="block text-[11px] font-semibold opacity-80 mt-0.5">
                  {s.delta > 0 ? `+${s.delta} ر.س` : "السعر الأساسي"}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {extras.length > 0 && (
        <section className="mt-6">
          <h2 className="font-black mb-2.5">إضافات</h2>
          <div className="flex flex-wrap gap-2">
            {extras.map((e) => {
              const on = extraIds.includes(e.id);
              return (
                <button
                  key={e.id}
                  onClick={() => toggleExtra(e.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold border transition-colors ${
                    on
                      ? "bg-olive-700 text-olive-50 border-olive-700"
                      : "bg-white border-olive-100 text-olive-900"
                  }`}
                >
                  {on && <CheckIcon className="w-3 h-3" />}
                  {e.label}
                  <span className="opacity-75">+{e.price} ر.س</span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      <section className="mt-6 flex items-center justify-between bg-white border border-olive-100 rounded-2xl p-3">
        <span className="font-bold text-sm">الكمية</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="إنقاص"
            className="w-9 h-9 rounded-xl bg-olive-50 border border-olive-100 flex items-center justify-center text-olive-800 active:scale-95 transition-transform"
          >
            <MinusIcon className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-black text-lg">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            aria-label="زيادة"
            className="w-9 h-9 rounded-xl bg-olive-700 text-olive-50 flex items-center justify-center active:scale-95 transition-transform"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      </section>

      {added && (
        <Link
          href="/cart"
          className="fixed bottom-24 inset-x-4 max-w-lg mx-auto z-50 flex items-center justify-center gap-2 rounded-full bg-olive-950 text-olive-50 py-3.5 font-bold text-sm shadow-xl animate-[fadeUp_.2s_ease-out]"
        >
          <CheckIcon className="w-4 h-4" />
          تمت الإضافة للسلة — اضغط للعرض
        </Link>
      )}

      <div className="fixed bottom-0 inset-x-0 z-40">
        <div className="mx-auto max-w-lg px-4 pb-[calc(env(safe-area-inset-bottom)+14px)] pt-2">
          <div className="rounded-3xl bg-olive-900 text-olive-50 shadow-xl shadow-olive-950/25 flex items-center justify-between p-3 ps-5">
            <div>
              <p className="text-[11px] font-semibold text-olive-300">الإجمالي</p>
              <p className="font-black text-lg leading-tight">{formatPrice(unitPrice * qty)}</p>
            </div>
            <button
              onClick={addToCart}
              className="inline-flex items-center gap-2 bg-white text-olive-900 font-extrabold text-sm rounded-2xl px-6 py-3 active:scale-95 transition-transform"
            >
              <PlusIcon className="w-4 h-4" />
              أضف للسلة
              {count > 0 && (
                <span className="bg-olive-100 text-olive-900 text-[10px] font-black rounded-full min-w-5 h-5 px-1 inline-flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </main>
  );
}
