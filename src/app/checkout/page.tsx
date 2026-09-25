"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";
import { formatPrice, DELIVERY_FEE } from "@/lib/menu-config";
import { saveOrderRef } from "@/lib/orders";
import PageHeader from "@/components/PageHeader";
import { BagIcon, CartIcon, CheckIcon, MapPinIcon } from "@/components/icons";

export default function CheckoutPage() {
  const { items, subtotal, hydrated, dispatch } = useCart();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deliveryFee = orderType === "delivery" ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  if (!hydrated) {
    return (
      <main className="mx-auto max-w-lg px-4 pb-40">
        <PageHeader title="إتمام الطلب" />
        <div className="mt-6 space-y-3" aria-busy="true">
          <div className="h-40 rounded-3xl bg-olive-100 animate-pulse" />
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-lg px-4 pb-40">
        <PageHeader title="إتمام الطلب" />
        <div className="mt-20 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-olive-100 flex items-center justify-center">
            <CartIcon className="w-10 h-10 text-olive-600" />
          </div>
          <p className="mt-4 font-bold">ما فيه شي في السلة</p>
          <button
            onClick={() => router.push("/menu")}
            className="mt-5 bg-olive-700 text-olive-50 font-bold text-sm px-6 py-3 rounded-full"
          >
            تصفح الممنو
          </button>
        </div>
      </main>
    );
  }

  async function submit() {
    setError(null);
    if (!name.trim()) return setError("اكتب اسمك أولاً");
    if (!/^[\d+\s-]{9,15}$/.test(phone.trim())) return setError("أدخل رقم جوال صحيح");
    if (orderType === "delivery" && address.trim().length < 5)
      return setError("اكتب عنوان التوصيل بالتفصيل");

    setSubmitting(true);
    try {
      // RLS allows insert-only on orders (no RETURNING), so the client generates the id
      const orderId = crypto.randomUUID();

      const { error: orderError } = await supabase.from("orders").insert({
        id: orderId,
        customer_name: name.trim(),
        phone: phone.trim(),
        order_type: orderType,
        address: orderType === "delivery" ? address.trim() : null,
        notes: notes.trim() || null,
        subtotal,
        delivery_fee: deliveryFee,
        total,
        status: "new",
      });

      if (orderError) throw orderError;

      const { error: itemsError } = await supabase.from("order_items").insert(
        items.map((i) => ({
          order_id: orderId,
          product_id: i.productId,
          product_name: i.nameAr,
          product_name_en: i.nameEn,
          size: i.size?.label ?? null,
          image_url: i.imageUrl,
          extras: i.extras.map((e) => ({ label: e.label, price: e.price })),
          quantity: i.qty,
          unit_price: i.unitPrice,
          line_total: Number((i.unitPrice * i.qty).toFixed(2)),
        }))
      );

      if (itemsError) throw itemsError;

      saveOrderRef(orderId);
      dispatch({ type: "CLEAR" });
      router.replace(`/orders/${orderId}`);
    } catch {
      setError("تعذر إرسال الطلب، تأكد من اتصالك وجرّب مرة ثانية");
      setSubmitting(false);
    }
  }

  const inputCls =
    "w-full rounded-2xl border border-olive-100 bg-white px-4 py-3 text-sm font-semibold placeholder:text-olive-800/40 focus:outline-none focus:border-olive-400 focus:ring-2 focus:ring-olive-100";

  return (
    <main className="mx-auto max-w-lg px-4 pb-48">
      <PageHeader title="إتمام الطلب" />

      <section className="mt-2">
        <h2 className="font-black text-sm mb-2.5">طريقة الاستلام</h2>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setOrderType("pickup")}
            className={`flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold border transition-colors ${
              orderType === "pickup"
                ? "bg-olive-700 text-olive-50 border-olive-700"
                : "bg-white border-olive-100 text-olive-900"
            }`}
          >
            <BagIcon className="w-4 h-4" />
            استلام من الفرع
          </button>
          <button
            onClick={() => setOrderType("delivery")}
            className={`flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold border transition-colors ${
              orderType === "delivery"
                ? "bg-olive-700 text-olive-50 border-olive-700"
                : "bg-white border-olive-100 text-olive-900"
            }`}
          >
            <MapPinIcon className="w-4 h-4" />
            توصيل ({DELIVERY_FEE} ر.س)
          </button>
        </div>
      </section>

      <section className="mt-5 space-y-3">
        <div>
          <label className="block text-xs font-bold text-olive-800/70 mb-1.5">الاسم</label>
          <input
            className={inputCls}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثال: عبدالله"
            maxLength={60}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-olive-800/70 mb-1.5">رقم الجوال</label>
          <input
            className={inputCls}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="05xxxxxxxx"
            inputMode="tel"
            dir="ltr"
            maxLength={15}
          />
        </div>
        {orderType === "delivery" && (
          <div>
            <label className="block text-xs font-bold text-olive-800/70 mb-1.5">
              عنوان التوصيل
            </label>
            <textarea
              className={`${inputCls} h-20 resize-none`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="الحي، الشارع، أقرب معلم..."
              maxLength={300}
            />
          </div>
        )}
        <div>
          <label className="block text-xs font-bold text-olive-800/70 mb-1.5">
            ملاحظات (اختياري)
          </label>
          <textarea
            className={`${inputCls} h-16 resize-none`}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="مثال: بدون سكر، استلام بعد 10 دقائق..."
            maxLength={300}
          />
        </div>
      </section>

      <section className="mt-5 bg-white border border-olive-100 rounded-3xl p-4 space-y-2.5">
        <h2 className="font-black text-sm mb-1">ملخص الطلب</h2>
        {items.map((i) => (
          <div key={i.key} className="flex justify-between text-xs font-semibold text-olive-900/80">
            <span className="truncate">
              {i.qty}× {i.nameAr}
              {i.size ? ` (${i.size.label})` : ""}
            </span>
            <span className="whitespace-nowrap">{formatPrice(i.unitPrice * i.qty)}</span>
          </div>
        ))}
        <div className="border-t border-dashed border-olive-200 pt-2.5 space-y-1.5">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-olive-800/70">المجموع الفرعي</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-xs font-bold">
            <span className="text-olive-800/70">التوصيل</span>
            <span>{deliveryFee > 0 ? formatPrice(deliveryFee) : "مجاني"}</span>
          </div>
          <div className="flex justify-between text-sm font-black text-olive-700">
            <span>الإجمالي</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </section>

      {error && (
        <p className="mt-4 text-center text-sm font-bold text-red-600 bg-red-50 rounded-2xl py-3 px-4">
          {error}
        </p>
      )}

      <div className="fixed bottom-0 inset-x-0 z-40">
        <div className="mx-auto max-w-lg px-4 pb-[calc(env(safe-area-inset-bottom)+14px)] pt-2">
          <div className="rounded-3xl bg-olive-900 text-olive-50 shadow-xl shadow-olive-950/25 flex items-center justify-between p-3 ps-5">
            <div>
              <p className="text-[11px] font-semibold text-olive-300">الإجمالي</p>
              <p className="font-black text-lg leading-tight">{formatPrice(total)}</p>
            </div>
            <button
              onClick={submit}
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-white text-olive-900 font-extrabold text-sm rounded-2xl px-6 py-3 active:scale-95 transition-transform disabled:opacity-60"
            >
              {submitting ? (
                "جاري إرسال الطلب..."
              ) : (
                <>
                  <CheckIcon className="w-4 h-4" />
                  تأكيد الطلب
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
