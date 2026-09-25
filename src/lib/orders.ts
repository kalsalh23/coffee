const KEY = "fmc_orders_v1";

export type OrderRef = { id: string; createdAt: string };

export function loadOrderRefs(): OrderRef[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as OrderRef[]) : [];
  } catch {
    return [];
  }
}

export function saveOrderRef(id: string) {
  const refs = loadOrderRefs().filter((r) => r.id !== id);
  refs.unshift({ id, createdAt: new Date().toISOString() });
  try {
    window.localStorage.setItem(KEY, JSON.stringify(refs.slice(0, 25)));
  } catch {}
}
