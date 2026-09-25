"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Category, Product } from "@/lib/types";
import { categoryImage, storageImage } from "@/lib/menu-config";
import Logo from "@/components/Logo";
import ProductCard from "@/components/ProductCard";
import { PlusIcon, StarIcon } from "@/components/icons";

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [catsRes, prodsRes] = await Promise.all([
          supabase.from("categories").select("*").order("sort_order"),
          supabase
            .from("products")
            .select("*, categories(slug)")
            .eq("is_available", true)
            .order("sort_order"),
        ]);
        if (!active) return;
        if (catsRes.error || prodsRes.error) throw new Error("تعذر تحميل الممنو");
        setCategories(catsRes.data ?? []);
        setProducts(prodsRes.data ?? []);
      } catch {
        if (active) setError("حدث خطأ أثناء تحميل البيانات، جرّب تحديث الصفحة");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const featured = products.filter((p) => p.is_featured);
  const grid = products.slice(0, 8);

  return (
    <main className="mx-auto max-w-lg px-4 pb-4">
      <header className="pt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={46} />
          <div>
            <p className="font-black text-xl leading-tight tracking-tight" dir="ltr">
              5mintcoffee
            </p>
            <p className="text-xs font-semibold text-olive-700">قهوة مختصة • مشروبات • حلويات</p>
          </div>
        </div>
        <Link
          href="/orders"
          className="text-xs font-bold text-olive-700 bg-olive-100 px-3 py-2 rounded-full"
        >
          طلباتي
        </Link>
      </header>

      <section className="mt-5 rounded-3xl bg-gradient-to-bl from-olive-900 via-olive-800 to-olive-600 text-cream p-6 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={storageImage("cold-brew.jpg")}
          alt=""
          className="absolute -bottom-14 -left-14 w-52 h-52 object-cover rounded-full opacity-20 rotate-12 ring-8 ring-white/5"
        />
        <p className="text-olive-200 text-xs font-bold">مختصون بالقهوة منذ الحبة الأولى</p>
        <h1 className="text-2xl font-extrabold mt-1.5 leading-snug">
          فنجانك يجهز لك
          <br />
          خلال 5 دقائق
        </h1>
        <p className="text-sm text-olive-100/80 mt-2 font-bold">
          اطلب من المنيو واستلم من الفرع أو نوصله لباب البيت
        </p>
        <Link
          href="/menu"
          className="mt-4 inline-flex items-center gap-1.5 bg-white text-olive-900 rounded-full px-5 py-2.5 font-extrabold text-sm active:scale-95 transition-transform"
        >
          <PlusIcon className="w-4 h-4" />
          اطلب الآن
        </Link>
      </section>

      {loading && (
        <div className="mt-8 space-y-4" aria-busy="true">
          <div className="h-7 w-32 rounded-xl bg-olive-100 animate-pulse" />
          <div className="flex gap-2.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 w-24 rounded-full bg-olive-100 animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-56 rounded-3xl bg-olive-100 animate-pulse" />
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className="mt-8 text-center text-sm font-bold text-red-600 bg-red-50 rounded-2xl py-3 px-4">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <section className="mt-8">
            <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
              {categories.map((c) => {
                const img = categoryImage(c.slug);
                return (
                  <Link
                    key={c.id}
                    href={`/menu#${c.slug}`}
                    className="shrink-0 inline-flex items-center gap-2 bg-white border border-olive-100 shadow-sm shadow-olive-950/5 rounded-full ps-1.5 pe-4 py-1.5 text-sm font-bold text-olive-900 hover:bg-olive-50 transition-colors"
                  >
                    {img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={img}
                        alt=""
                        loading="lazy"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-base">{c.emoji}</span>
                    )}
                    {c.name_ar}
                  </Link>
                );
              })}
            </div>
          </section>

          {featured.length > 0 && (
            <section className="mt-8">
              <h2 className="flex items-center gap-1.5 text-lg font-black mb-3">
                <StarIcon className="w-4 h-4 text-olive-600" />
                الأكثر طلباً
              </h2>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
                {featured.map((p) => (
                  <div key={p.id} className="w-40 shrink-0">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-black">استكشف الممنو</h2>
              <Link href="/menu" className="text-sm font-bold text-olive-700">
                عرض الكل
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {grid.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
