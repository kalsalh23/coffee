import { Extra, SizeOption } from "./types";

export const DELIVERY_FEE = 25000;
export const CURRENCY = "ل.س";

export const SIZES: Record<string, SizeOption[]> = {
  drink: [
    { id: "S", label: "صغير", delta: 0 },
    { id: "M", label: "وسط", delta: 5000 },
    { id: "L", label: "كبير", delta: 10000 },
  ],
  beans: [
    { id: "250", label: "250 غرام", delta: 0 },
    { id: "500", label: "500 غرام", delta: 60000 },
    { id: "1000", label: "كيلو غرام", delta: 110000 },
  ],
  dessert: [],
};

const COFFEE_EXTRAS: Extra[] = [
  { id: "x-espresso", label: "شوت إسبريسو إضافي", price: 8000 },
  { id: "x-almond", label: "حليب لوز", price: 6000 },
  { id: "x-coconut", label: "حليب جوز الهند", price: 6000 },
  { id: "x-caramel", label: "كراميل", price: 4000 },
  { id: "x-vanilla", label: "فانيلا", price: 4000 },
];

const REFRESHER_EXTRAS: Extra[] = [
  { id: "x-mint", label: "نعناع طازج", price: 2000 },
  { id: "x-chia", label: "بذور الشيا", price: 2000 },
];

const MATCHA_EXTRAS: Extra[] = [
  { id: "x-almond", label: "حليب لوز", price: 6000 },
  { id: "x-coconut", label: "حليب جوز الهند", price: 6000 },
];

const EXTRAS_BY_CATEGORY: Record<string, Extra[]> = {
  hot: COFFEE_EXTRAS,
  iced: COFFEE_EXTRAS,
  refreshers: REFRESHER_EXTRAS,
  matcha: MATCHA_EXTRAS,
};

export function extrasFor(categorySlug?: string | null): Extra[] {
  if (!categorySlug) return [];
  return EXTRAS_BY_CATEGORY[categorySlug] ?? [];
}

export function sizesFor(priceMode: string): SizeOption[] {
  return SIZES[priceMode] ?? [];
}

export function formatPrice(n: number): string {
  const v = Math.round(Number(n) || 0);
  return v.toLocaleString("en-US") + " " + CURRENCY;
}

const STORAGE_BASE =
  (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "") + "/storage/v1/object/public/menu/";

const CATEGORY_IMAGES: Record<string, string> = {
  hot: STORAGE_BASE + "cappuccino.jpg",
  iced: STORAGE_BASE + "iced-latte.jpg",
  refreshers: STORAGE_BASE + "mint-mojito.jpg",
  matcha: STORAGE_BASE + "matcha-latte.jpg",
  desserts: STORAGE_BASE + "basque-cheesecake.jpg",
  beans: STORAGE_BASE + "ethiopia.jpg",
};

export function categoryImage(slug: string): string | undefined {
  return CATEGORY_IMAGES[slug];
}

export function storageImage(name: string): string {
  return STORAGE_BASE + name;
}
