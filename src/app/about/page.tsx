import Link from "next/link";
import Logo from "@/components/Logo";
import { storageImage } from "@/lib/menu-config";
import {
  ClockIcon,
  InstagramIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";

export const metadata = {
  title: "عن المحل | 5mintcoffee",
  description: "5minute coffee — قهوة مختصة في حماة، شارع أبي الفدا، دوار القصف",
};

const OFFERS = [
  { label: "قهوة مختصة ساخنة وباردة", img: "cappuccino.jpg" },
  { label: "مشروبات منعشة وموهيتو", img: "mint-mojito.jpg" },
  { label: "ماتشا وشاي", img: "matcha-latte.jpg" },
  { label: "حلويات طازجة يومياً", img: "basque-cheesecake.jpg" },
  { label: "حبوب مختصة للبيع", img: "ethiopia.jpg" },
];

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("5minute coffee حماة شارع أبي الفدا دوار القصف");
const INSTAGRAM_URL = "https://instagram.com/5mintcoffe";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-lg px-4 pb-32">
      <header className="pt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={46} />
          <div>
            <p className="font-extrabold text-xl leading-tight" dir="ltr">
              5mintcoffee
            </p>
            <p className="text-xs font-bold text-olive-700">Coffee shop — حماة</p>
          </div>
        </div>
        <Link
          href="/menu"
          className="text-xs font-bold text-olive-700 bg-olive-100 px-3 py-2 rounded-full"
        >
          الممنو
        </Link>
      </header>

      <section className="mt-5 rounded-3xl bg-gradient-to-bl from-olive-900 via-olive-800 to-olive-600 text-cream p-6 text-center relative overflow-hidden">
        <p className="text-xl font-extrabold leading-relaxed">
          خمس دقايق من يومك ... إلنا
        </p>
        <p className="text-sm font-bold text-olive-100/85 mt-2">
          قهوة • مزاج • تفاصيل حلوة
        </p>
      </section>

      <section className="mt-6">
        <h1 className="text-lg font-extrabold">عن المحل</h1>
        <p className="mt-2 text-sm leading-relaxed text-olive-900/80 font-bold bg-white border border-olive-100 rounded-2xl p-4">
          5mintcoffee مقهى قهوة مختصة في قلب حماة. بنحضّرلك قهوتك من حبوب مختصة
          محمّصة بعناية، مع مشروبات منعشة وحلويات طازجة، كل شي بكل حب وبأسرع وقت —
          لأن خمس دقايق من يومك تستاهل أفضل فنجان.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-extrabold mb-3">شو منقدّم عليك</h2>
        <div className="grid grid-cols-2 gap-3">
          {OFFERS.map((o) => (
            <Link
              key={o.label}
              href="/menu"
              className="group relative rounded-3xl overflow-hidden border border-olive-100 shadow-sm shadow-olive-950/5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={storageImage(o.img)}
                alt={o.label}
                loading="lazy"
                className="w-full h-28 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-olive-950/85 via-olive-950/20 to-transparent" />
              <p className="absolute bottom-0 inset-x-0 p-3 text-cream text-xs font-bold leading-snug">
                {o.label}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-lg font-extrabold">معلومات التواصل</h2>

        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-white border border-olive-100 rounded-2xl p-4 hover:bg-olive-50 transition-colors"
        >
          <span className="w-11 h-11 shrink-0 rounded-2xl bg-olive-100 flex items-center justify-center">
            <MapPinIcon className="w-5 h-5 text-olive-700" />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-extrabold">موقعنا</span>
            <span className="block text-xs font-bold text-olive-800/70 mt-0.5">
              حماة — شارع أبي الفدا، دوار القصف
            </span>
            <span className="block text-[11px] font-bold text-olive-600 mt-0.5">
              افتح الموقع على خرائط قوقل
            </span>
          </span>
        </a>

        <div className="flex items-center gap-3 bg-white border border-olive-100 rounded-2xl p-4">
          <span className="w-11 h-11 shrink-0 rounded-2xl bg-olive-100 flex items-center justify-center">
            <ClockIcon className="w-5 h-5 text-olive-700" />
          </span>
          <span>
            <span className="block text-sm font-extrabold">أوقات العمل</span>
            <span className="block text-xs font-bold text-olive-800/70 mt-0.5">
              يومياً من 9:30 صباحاً حتى 2:00 بعد منتصف الليل
            </span>
          </span>
        </div>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-white border border-olive-100 rounded-2xl p-4 hover:bg-olive-50 transition-colors"
        >
          <span className="w-11 h-11 shrink-0 rounded-2xl bg-olive-100 flex items-center justify-center">
            <InstagramIcon className="w-5 h-5 text-olive-700" />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-extrabold">تابعنا على انستغرام</span>
            <span className="block text-xs font-bold text-olive-800/70 mt-0.5" dir="ltr">
              @5mintcoffe
            </span>
          </span>
        </a>
      </section>

      <section className="mt-8 rounded-3xl bg-olive-900 text-olive-50 p-5">
        <p className="text-[11px] font-bold text-olive-300">تطوير المنصة</p>
        <p className="text-base font-extrabold mt-1">م. قصي مهند الصالح</p>
        <a
          href="tel:0952639157"
          className="mt-3 inline-flex items-center gap-2 bg-white text-olive-900 rounded-full px-4 py-2.5 text-sm font-extrabold active:scale-95 transition-transform"
        >
          <PhoneIcon className="w-4 h-4" />
          <span dir="ltr">0952639157</span>
        </a>
      </section>
    </main>
  );
}
