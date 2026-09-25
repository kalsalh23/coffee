export type Category = {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  emoji: string;
  sort_order: number;
};

export type Product = {
  id: string;
  category_id: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  base_price: number;
  emoji: string;
  image_url?: string | null;
  price_mode: "drink" | "dessert" | "beans";
  is_featured: boolean;
  is_available: boolean;
  sort_order: number;
  categories?: { slug: string } | null;
};

export type Extra = { id: string; label: string; price: number };

export type SizeOption = { id: string; label: string; delta: number };

export type CartItem = {
  key: string;
  productId: string;
  nameAr: string;
  nameEn: string;
  emoji: string;
  imageUrl: string | null;
  size: SizeOption | null;
  extras: Extra[];
  qty: number;
  unitPrice: number;
};

export type OrderStatus = "new" | "preparing" | "ready" | "completed" | "cancelled";

export type OrderRecord = {
  id: string;
  customer_name: string;
  phone: string;
  order_type: "pickup" | "delivery";
  address: string | null;
  notes: string | null;
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: OrderStatus;
  created_at: string;
};

export type OrderItemRecord = {
  id: string;
  order_id: string;
  product_name: string;
  product_name_en: string | null;
  size: string | null;
  image_url?: string | null;
  extras: { label: string; price: number }[];
  quantity: number;
  unit_price: number;
  line_total: number;
};
