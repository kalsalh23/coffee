"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Category, Product } from "@/lib/types";
import { categoryImage } from "@/lib/menu-config";
import ProductCard from "@/components/ProductCard";
import { BagIcon } from "@/components/icons";

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCat, setActiveCat] = useState<string>("");

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
        if (catsRes.error || prodsRes.error) throw new Error("db");
        setCategories(catsRes.data ?? []);
        setProducts(prodsRes.data ?? []);
      } catch {
        if (active) setError("حدث خطأ أثناء تحميل الممنو، جرّب تحديث الصفحة");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const grouped = useMemo(() => {
    return categories
      .map((c) => ({
        category: c,
        items: products.filter((p) => p.category_id === c.id),
      }))
      .filter((g) => g.items.length > 0);
  }, [categories, products]);

  function jumpTo(slug: string) {
    setActiveCat(slug);
    document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="mx-auto max-w-lg pb-4">
      <header className="pt-6 px-4">
        <h1 className="text-2xl font-black">المنيو</h1>
        <p className="text-sm text-brand-800/70 font-bold mt-0.5">
          كل شي طازج ومن محامص مختصة
        </p>
      </header>

      {!loading && !error && grouped.length > 0 && (
        <nav className="sticky top-0 z-40 bg-cream/95 backdrop-blur mt-4 py-2.5 border-b border-brand-100">
          <div className="flex gap-2 overflow-x-auto no-scrollbar px-4">
            {grouped.map(({ category }) => {
              const img = categoryImage(category.slug);
              return (
                <button
                  key={category.id}
                  onClick={() => jumpTo(category.slug)}
                  className={`shrink-0 inline-flex items-center gap-2 rounded-full ps-1.5 pe-4 py-1.5 text-sm font-bold transition-colors ${
                    activeCat === category.slug
                      ? "bg-brand-700 text-brand-50"
                      : "bg-white border border-brand-100 text-brand-900"
                  }`}
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
                    <span>{category.emoji}</span>
                  )}
                  {category.name_ar}
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {loading && (
        <div className="px-4 mt-6 space-y-6" aria-busy="true">
          {[...Array(3)].map((_, s) => (
            <div key={s}>
              <div className="h-6 w-28 rounded-lg bg-brand-100 animate-pulse mb-3" />
              <div className="grid grid-cols-2 gap-3">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="h-56 rounded-3xl bg-brand-100 animate-pulse" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="mx-4 mt-8 text-center text-sm font-bold text-red-600 bg-red-50 rounded-2xl py-3 px-4">
          {error}
        </p>
      )}

      {!loading && !error && grouped.length === 0 && (
        <div className="mt-20 text-center px-4">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-brand-100 flex items-center justify-center">
            <BagIcon className="w-9 h-9 text-brand-600" />
          </div>
          <p className="mt-4 font-bold">الممنو فارغ حالياً</p>
        </div>
      )}

      {!loading && !error && (
        <div className="px-4">
          {grouped.map(({ category, items }) => (
            <section key={category.id} id={category.slug} className="mt-8 scroll-mt-24">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-extrabold flex items-center gap-2.5">
                  {categoryImage(category.slug) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={categoryImage(category.slug)}
                      alt=""
                      loading="lazy"
                      className="w-10 h-10 rounded-2xl object-cover"
                    />
                  ) : (
                    <span>{category.emoji}</span>
                  )}
                  {category.name_ar}
                </h2>
                <span className="text-xs font-bold text-brand-800/50">{items.length} أصناف</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
