# قهوة 2 — Twoqahwa ☕

تطبيق طلبات لمقهى **قهوة 2 (Twoqahwa)** — قهوة مختصة ومشروبات وحلويات في حماة، بهوية بصرية سوداء/بيضاء مطابقة لشعار المحل، بدون أي نظام نقاط أو ولاء.

## بيانات المحل

- **الاسم:** قهوة 2 — Twoqahwa
- **العنوان:** حماة — مقابل القافلة، أول مخبر العنيدة | دوار التأمينات
- **الهاتف:** 0986740110
- **انستغرام:** [@two.qahwa](https://instagram.com/two.qahwa)
- **الموقع:** [2coffee.vercel.app](https://2coffee.vercel.app)

## المميزات

- صفحة رئيسية فيها بانر وتصنيفات والأكثر طلباً
- منيو كامل مقسّم بالتصنيفات مع تنقّل سلس
- صفحة منتج: أحجام + إضافات + كمية
- سلة محفوظة في المتصفح (localStorage)
- إتمام طلب: استلام من الفرع أو توصيل (رسوم 25,000 ل.س)
- تتبع حالة الطلب مباشرة (تم الطلب ← قيد التحضير ← جاهز ← تم التسليم)
- واجهة عربية RTL بخط Almarai

## التقنيات

- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
- Supabase (Postgres + RLS + RPC لتتبع الطلب)

## قاعدة البيانات

الجداول: `categories`, `products`, `orders`, `order_items` مع سياسات RLS:
- قراءة عامة للتصنيفات والمنتجات
- إدراج فقط للطلبات (بدون قراءة مباشرة لطلبات الآخرين)
- دالة `get_order_details(order_id)` (security definer) لتتبع الطلب بمعرفة المعرّف فقط

ملفات SQL في مجلد `_db/` — منيو المحل الحالي (7 أقسام / 87 صنفاً) في `_db/menu-twoqahwa.sql` وتم تنفيذه على قاعدة البيانات. لتحديث المنيو مستقبلاً: عدّل الجدولين `categories` و`products` مباشرة.

## التشغيل محلياً

```bash
npm install
# أنشئ .env.local بمتغيرين:
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
npm run dev
```

## النشر — الرابط الرسمي: 2coffee.vercel.app

المشروع منشور على Vercel. لجعل الرابط **2coffee.vercel.app**:

1. سجّل الدخول: `npx vercel login`
2. من لوحة Vercel: المشروع ← Settings ← General ← **Project Name** ← غيّره إلى `2coffee` (يرتبط تلقائياً بالنطاق `2coffee.vercel.app` إن كان متاحاً)، أو أضف النطاق `2coffee.vercel.app` من قسم **Domains** في المشروع.
3. انشر التحديث:

```bash
npx vercel --prod
```
