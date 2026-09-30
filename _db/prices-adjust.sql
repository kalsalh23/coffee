-- ضبط أسعار المنتجات: القيم المخزنة بالليرة السورية الكاملة
-- (قائمة المحل تعرضها بأسلوب "بدون الصفرين": 25000 -> 250)
-- مثال: كوكتيل طبيعي 250,000 -> 25,000 (يُعرض 250 كما في المنيو المطبوع)

begin;

update public.products set base_price = base_price / 10;

commit;

-- التحقق: SELECT name_ar, base_price FROM public.products ORDER BY base_price DESC LIMIT 5;
