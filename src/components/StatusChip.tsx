import { OrderStatus } from "@/lib/types";

const STATUS: Record<OrderStatus, { label: string; cls: string }> = {
  new: { label: "تم استلام الطلب", cls: "bg-amber-100 text-amber-800" },
  preparing: { label: "قيد التحضير", cls: "bg-sky-100 text-sky-800" },
  ready: { label: "جاهز", cls: "bg-brand-100 text-brand-800" },
  completed: { label: "تم التسليم", cls: "bg-green-100 text-green-700" },
  cancelled: { label: "ملغي", cls: "bg-red-100 text-red-700" },
};

export default function StatusChip({ status }: { status: OrderStatus }) {
  const s = STATUS[status] ?? STATUS.new;
  return (
    <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full ${s.cls}`}>
      {s.label}
    </span>
  );
}

export function statusLabel(status: OrderStatus): string {
  return (STATUS[status] ?? STATUS.new).label;
}

export const STEPS = ["تم الطلب", "قيد التحضير", "جاهز", "تم التسليم"];

export function statusStep(status: OrderStatus): number {
  switch (status) {
    case "new":
      return 1;
    case "preparing":
      return 2;
    case "ready":
      return 3;
    case "completed":
      return 4;
    default:
      return 0;
  }
}
