"use client";

import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/menu-config";
import { PlusIcon, StarIcon } from "./icons";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group block bg-white rounded-3xl p-3 shadow-sm shadow-brand-950/5 border border-brand-100/70 hover:shadow-md hover:shadow-brand-950/10 transition-shadow"
    >
      <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-brand-100 via-brand-50 to-brand-200 flex items-center justify-center overflow-hidden">
        <span className="text-6xl drop-shadow-sm">{product.emoji}</span>
        {product.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.name_ar}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        )}
        {product.is_featured && (
          <span className="absolute top-2 start-2 inline-flex items-center gap-1 bg-brand-900/85 text-brand-50 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <StarIcon className="w-2.5 h-2.5" />
            الأكثر طلباً
          </span>
        )}
      </div>
      <h3 className="mt-2.5 font-extrabold text-[15px] leading-snug text-ink">
        {product.name_ar}
      </h3>
      <p className="text-xs text-brand-800/60 line-clamp-1 mt-0.5">{product.name_en}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-brand-700 font-extrabold text-[15px]">
          {formatPrice(Number(product.base_price))}
        </span>
        <span className="w-8 h-8 rounded-full bg-brand-700 text-brand-50 flex items-center justify-center shadow-sm shadow-brand-700/30 group-hover:bg-brand-600 transition-colors">
          <PlusIcon className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
