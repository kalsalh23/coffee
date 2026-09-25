"use client";

import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "./icons";

export default function PageHeader({ title }: { title: string }) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur">
      <div className="mx-auto max-w-lg px-4 h-16 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          aria-label="رجوع"
          className="w-10 h-10 rounded-2xl bg-white shadow-sm shadow-olive-950/5 border border-olive-100 flex items-center justify-center text-olive-800 active:scale-95 transition-transform"
        >
          <ArrowRightIcon className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-extrabold">{title}</h1>
      </div>
    </header>
  );
}
