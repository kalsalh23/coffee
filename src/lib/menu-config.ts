import { Extra, SizeOption } from "./types";

export const DELIVERY_FEE = 15;
export const CURRENCY = "ر.س";

export const SIZES: Record<string, SizeOption[]> = {
  drink: [
    { id: "S", label: "صغير", delta: 0 },
    { id: "M", label: "وسط", delta: 3 },
    { id: "L", label: "كبير", delta: 5 },
  ],
  beans: [
    { id: "250", label: "250 غرام", delta: 0 },
    { id: "500", label: "500 غرام", delta: 25 },
    { id: "1000", label: "كيلو غرام", delta: 45 },
  ],
  dessert: [],
};

const COFFEE_EXTRAS: Extra[] = [
  { id: "x-espresso", label: "شوت إسبريسو إضافي", price: 4 },
  { id: "x-almond", label: "حليب لوز", price: 3 },
  { id: "x-coconut", label: "حليب جوز الهند", price: 3 },
  { id: "x-caramel", label: "كراميل", price: 2 },
  { id: "x-vanilla", label: "فانيلا", price: 2 },
];

const REFRESHER_EXTRAS: Extra[] = [
  { id: "x-mint", label: "نعناع طازج", price: 1 },
  { id: "x-chia", label: "بذور الشيا", price: 1 },
];

const MATCHA_EXTRAS: Extra[] = [
  { id: "x-almond", label: "حليب لوز", price: 3 },
  { id: "x-coconut", label: "حليب جوز الهند", price: 3 },
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
  const v = Number(n) || 0;
  return v.toFixed(2).replace(/\.00$/, "") + " " + CURRENCY;
}
