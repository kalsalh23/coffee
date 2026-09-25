"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/menu-config";
import { loadOrderRefs, OrderRef } from "@/lib/orders";
import { OrderItemRecord, OrderRecord } from "@/lib/types";
import StatusChip from "@/components/StatusChip";
import { ReceiptIcon } from "@/components/icons";

type OrderRow = { ref: OrderRef; order: OrderRecord | null; items: OrderItemRecord[] };

export default function OrdersPage() {
  const [rows, setRows] = useState<OrderRow[] | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const refs = loadOrderRefs();
      if (refs.length === 0) {
        if (active) setRows([]);
        return;
      }
      const settled = await Promise.all(
        refs.map(async (ref) => {
          const res = await supabase.rpc("get_order_details", { p_order_id: ref.id });
          if (res.error || !res.data?.order) return { ref, order: null, items: [] as OrderItemRecord[] };
          return {
            ref,
            order: res.data.order as OrderRecord,
            items: (res.data.items ?? []) as OrderItemRecord[],
          };
        })
      );
      if (active) setRows(settled);
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="mx-auto max-w-lg px-4 pb-4">
      <header className="pt-6">
        <h1 className="text-2xl font-black">طلباتي</h1>
        <p className="text-sm text-olive-800/70 font-medium mt-0.5">تابع حالة طلباتك السابقة</p>
      </header>

      {rows === null && (
        <div className="mt-6 space-y-3" aria-busy="true">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 rounded-3xl bg-olive-100 animate-pulse" />
          ))}
        </div>
      )}

      {rows !== null && rows.length === 0 && (
        <div className="mt-20 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-olive-100 flex items-center justify-center">
            <ReceiptIcon className="w-10 h-10 text-olive-600" />
          </div>
          <h2 className="mt-5 text-lg font-black">ما عندك طلبات بعد</h2>
          <p className="mt-1 text-sm text-olive-800/70 font-medium">أول طلب لك يظهر هنا مباشرة</p>
          <Link
            href="/menu"
            className="mt-6 inline-block bg-olive-700 text-olive-50 font-extrabold text-sm px-8 py-3.5 rounded-full active:scale-95 transition-transform"
          >
            ابدأ الطلب
          </Link>
        </div>
      )}

      {rows !== null && rows.length > 0 && (
        <div className="mt-5 space-y-3">
          {rows.map(({ ref, order, items }) => (
            <Link
              key={ref.id}
              href={`/orders/${ref.id}`}
              className="block bg-white border border-olive-100 rounded-3xl p-4 hover:shadow-md hover:shadow-olive-950/5 transition-shadow"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-olive-800/50" dir="ltr">
                  #{ref.id.slice(0, 8).toUpperCase()}
                </span>
                {order ? (
                  <StatusChip status={order.status} />
                ) : (
                  <span className="text-[11px] font-bold text-olive-800/50">غير متاح</span>
                )}
              </div>
              <p className="mt-2 font-extrabold text-sm truncate">
                {items.length > 0
                  ? `${items[0].product_name}${items.length > 1 ? ` + ${items.length - 1} أصناف أخرى` : ""}`
                  : "طلب"}
              </p>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-xs font-semibold text-olive-800/60">
                  {order
                    ? new Intl.DateTimeFormat("ar-EG-u-nu-latn", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(new Date(order.created_at))
                    : ""}
                </span>
                {order && (
                  <span className="font-black text-olive-700 text-sm">
                    {formatPrice(Number(order.total))}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
