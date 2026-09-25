"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/menu-config";
import { OrderItemRecord, OrderRecord } from "@/lib/types";
import PageHeader from "@/components/PageHeader";
import { statusStep } from "@/components/StatusChip";
import { BagIcon, CheckIcon, MapPinIcon, PhoneIcon, ReceiptIcon } from "@/components/icons";

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [items, setItems] = useState<OrderItemRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const load = useCallback(async () => {
    const res = await supabase.rpc("get_order_details", { p_order_id: id });
    if (res.error || !res.data?.order) {
      setNotFound(true);
    } else {
      setOrder(res.data.order as OrderRecord);
      setItems((res.data.items ?? []) as OrderItemRecord[]);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const t = window.setInterval(load, 20000);
    return () => window.clearInterval(t);
  }, [load]);

  if (loading) {
    return (
      <main className="mx-auto max-w-lg px-4 pb-4">
        <PageHeader title="تفاصيل الطلب" />
        <div className="mt-4 space-y-3" aria-busy="true">
          <div className="h-36 rounded-3xl bg-olive-100 animate-pulse" />
          <div className="h-48 rounded-3xl bg-olive-100 animate-pulse" />
        </div>
      </main>
    );
  }

  if (notFound || !order) {
    return (
      <main className="mx-auto max-w-lg px-4 pb-4">
        <PageHeader title="تفاصيل الطلب" />
        <div className="mt-16 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-olive-100 flex items-center justify-center">
            <ReceiptIcon className="w-9 h-9 text-olive-600" />
          </div>
          <p className="mt-4 font-bold">ما قدرنا نلقى هذا الطلب</p>
          <Link
            href="/orders"
            className="mt-5 inline-block bg-olive-700 text-olive-50 font-bold text-sm px-6 py-3 rounded-full"
          >
            رجوع لطلباتي
          </Link>
        </div>
      </main>
    );
  }

  const step = statusStep(order.status);
  const cancelled = order.status === "cancelled";
  const steps =
    order.order_type === "delivery"
      ? ["تم الطلب", "قيد التحضير", "في الطريق", "تم التسليم"]
      : ["تم الطلب", "قيد التحضير", "جاهز للاستلام", "تم التسليم"];

  return (
    <main className="mx-auto max-w-lg px-4 pb-4">
      <PageHeader title="تفاصيل الطلب" />

      <section className="mt-2 bg-white border border-olive-100 rounded-3xl p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-olive-800/50" dir="ltr">
            #{order.id.slice(0, 8).toUpperCase()}
          </span>
          <span className="text-xs font-semibold text-olive-800/60">
            {new Intl.DateTimeFormat("ar-EG-u-nu-latn", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(order.created_at))}
          </span>
        </div>

        {cancelled ? (
          <div className="mt-4 rounded-2xl bg-red-50 text-red-700 text-sm font-bold py-3 px-4 text-center">
            تم إلغاء هذا الطلب — تواصل معنا على 0500000000
          </div>
        ) : (
          <div className="mt-6">
            <div className="relative flex justify-between">
              <div className="absolute top-3.5 inset-x-4 h-0.5 bg-olive-100">
                <div
                  className="h-full bg-olive-600 transition-all duration-500"
                  style={{ width: `${((step - 1) / 3) * 100}%` }}
                />
              </div>
              {steps.map((label, i) => {
                const done = i + 1 <= step;
                return (
                  <div key={label} className="relative z-10 flex flex-col items-center gap-2 w-16">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors ${
                        done
                          ? "bg-olive-600 border-olive-600 text-white"
                          : "bg-white border-olive-200 text-olive-300"
                      }`}
                    >
                      {done ? <CheckIcon className="w-3.5 h-3.5" /> : <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                    </span>
                    <span
                      className={`text-[10px] font-bold text-center leading-tight ${
                        done ? "text-olive-800" : "text-olive-800/40"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-5 text-center text-sm font-extrabold text-olive-700">
              {order.status === "ready" && order.order_type === "delivery"
                ? "طلبك في الطريق إليك 🛵"
                : order.status === "ready"
                  ? "طلبك جاهز للاستلام ☕"
                  : order.status === "preparing"
                    ? "نجهز طلبك الآن..."
                    : order.status === "completed"
                      ? "شكراً لك، نتشرف بخدمتك دايماً 🌿"
                      : "استلمنا طلبك ووصلنا للباريستا"}
            </p>
          </div>
        )}
      </section>

      <section className="mt-4 bg-white border border-olive-100 rounded-3xl p-4">
        <h2 className="font-black text-sm mb-3">الأصناف</h2>
        <div className="space-y-3">
          {items.map((i) => (
            <div key={i.id} className="flex items-center gap-3">
              <div className="relative w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-olive-100 to-olive-200 flex items-center justify-center text-2xl overflow-hidden">
                {"☕"}
                {i.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={i.image_url}
                    alt={i.product_name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-extrabold text-sm truncate">
                  {i.quantity}× {i.product_name}
                </p>
                <p className="text-[11px] font-semibold text-olive-800/60 mt-0.5">
                  {[i.size, ...(i.extras ?? []).map((e) => e.label)].filter(Boolean).join(" • ") ||
                    "بدون إضافات"}
                </p>
              </div>
              <span className="font-bold text-sm text-olive-700 whitespace-nowrap">
                {formatPrice(Number(i.line_total))}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-dashed border-olive-200 mt-4 pt-3 space-y-1.5">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-olive-800/70">المجموع الفرعي</span>
            <span>{formatPrice(Number(order.subtotal))}</span>
          </div>
          <div className="flex justify-between text-xs font-bold">
            <span className="text-olive-800/70">التوصيل</span>
            <span>
              {Number(order.delivery_fee) > 0 ? formatPrice(Number(order.delivery_fee)) : "مجاني"}
            </span>
          </div>
          <div className="flex justify-between text-sm font-black text-olive-700">
            <span>الإجمالي</span>
            <span>{formatPrice(Number(order.total))}</span>
          </div>
        </div>
      </section>

      <section className="mt-4 bg-white border border-olive-100 rounded-3xl p-4 space-y-2.5 text-sm">
        <h2 className="font-black text-sm mb-1">بيانات الطلب</h2>
        <div className="flex items-center gap-2.5 font-semibold text-olive-900/80">
          {order.order_type === "delivery" ? (
            <MapPinIcon className="w-4 h-4 text-olive-600" />
          ) : (
            <BagIcon className="w-4 h-4 text-olive-600" />
          )}
          {order.order_type === "delivery" ? `توصيل إلى: ${order.address}` : "استلام من الفرع"}
        </div>
        <div className="flex items-center gap-2.5 font-semibold text-olive-900/80">
          <PhoneIcon className="w-4 h-4 text-olive-600" />
          <span dir="ltr">{order.phone}</span>
          <span className="text-olive-800/50">— {order.customer_name}</span>
        </div>
        {order.notes && (
          <p className="text-xs font-semibold text-olive-800/60 bg-olive-50 rounded-xl p-3">
            ملاحظات: {order.notes}
          </p>
        )}
      </section>

      <div className="fixed bottom-0 inset-x-0 z-40">
        <div className="mx-auto max-w-lg px-4 pb-[calc(env(safe-area-inset-bottom)+14px)] pt-2">
          <Link
            href="/menu"
            className="block text-center rounded-3xl bg-olive-900 text-olive-50 shadow-xl shadow-olive-950/25 py-4 font-extrabold text-sm active:scale-[.98] transition-transform"
          >
            طلب مرة ثانية
          </Link>
        </div>
      </div>
    </main>
  );
}
