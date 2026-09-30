-- ============================================================
-- قهوة 2 (Twoqahwa) — استبدال كامل بيانات المنيو
-- المصدر: منيو المحل المرسل (7 أقسام / 87 صنفاً) — الأسعار بالليرة السورية
-- ملاحظة: الطلبات السابقة (orders / order_items) لا تتأثر
-- ============================================================

begin;

delete from public.products;
delete from public.categories;

-- ============ الأقسام ============
insert into public.categories (id, slug, name_ar, name_en, emoji, sort_order) values
('f4df878d-e47f-4561-b724-7aa26ba7b72f', 'hot',        'مشروبات ساخنة',            'Hot Drinks',         '☕', 1),
('865846aa-7ffa-427c-b08f-b63f827855eb', 'cocktails',  'كوكتيلات',                 'Cocktails',          '🍹', 2),
('057e81e7-edea-402e-851f-ce0e61bca946', 'milkshakes', 'ميلك شيك',                 'Milkshakes',         '🥛', 3),
('56ec3bc1-424d-4eda-8d63-c9d61a2ac78e', 'energy-tea', 'مشروبات الطاقة وآيس تي',   'Energy & Iced Tea',  '⚡', 4),
('b60f7a84-2b0a-45ca-95b5-e88da2ac0b27', 'ice-cream',  'آيس كريم',                 'Ice Cream',          '🍨', 5),
('c4c1ed50-dec1-4d53-baac-5de55e3a6fca', 'boba',       'بوبا',                     'Boba',               '🧋', 6),
('23aac5d1-9b7c-4657-8b4a-367ba75d47e5', 'juice',      'فريش',                     'Fresh Juice',        '🍊', 7);

-- ============ مشروبات ساخنة (23) ============
insert into public.products (id, category_id, name_ar, name_en, description_ar, base_price, emoji, price_mode, is_featured, is_available, sort_order, image_url) values
('fc24eed6-5de8-4924-8290-754e479a4cc9', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', 'إسبريسو',                'Espresso',                '',                          60000,  '☕', 'fixed', false, true,  1,  'https://fygjdivdzrtviiommpoy.supabase.co/storage/v1/object/public/menu/espresso.jpg'),
('ed75e7ac-cd8b-46af-9ac7-98331c3e93a8', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', 'إسبريسو دبل',            'Double Espresso',         '',                          100000, '☕', 'fixed', false, true,  2,  null),
('74e75403-8358-4657-93ee-f2dca4fc039d', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', 'فرنسي',                  'French Coffee',           '',                          100000, '☕', 'fixed', false, true,  3,  null),
('16c70210-f123-4336-9c3b-00c0fc6b6ad3', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', 'إسبريسو (ميستو/نسلة)',   'Espresso Misto',          'ميستو أو نسلة',             100000, '☕', 'fixed', false, true,  4,  null),
('f44e56e0-ac09-418d-884e-89a6cf78c1da', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', 'أمريكانو',               'Americano',               '',                          80000,  '☕', 'fixed', false, true,  5,  'https://fygjdivdzrtviiommpoy.supabase.co/storage/v1/object/public/menu/americano.jpg'),
('2714ad23-80fa-4fbd-b135-4b41616ceb8d', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', 'ميكاتو',                 'Macchiato',               '',                          120000, '☕', 'fixed', false, true,  6,  null),
('e48cbfba-c665-4af2-84c9-6def0efb0edb', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', 'نكهات ميكاتو',           'Flavored Macchiato',      'كراميل، وانيل، دريزل',      140000, '☕', 'fixed', false, true,  7,  null),
('2e059381-c7ee-45fa-a29c-78bd05d982d2', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', 'أموكانو',                'Amocano',                 '',                          140000, '☕', 'fixed', false, true,  8,  null),
('ea1fa1d4-aab3-414e-9765-430e59e9a2bc', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', 'فلات وايت',              'Flat White',              '',                          140000, '🥛', 'fixed', false, true,  9,  'https://fygjdivdzrtviiommpoy.supabase.co/storage/v1/object/public/menu/flatwhite.jpg'),
('14fa079e-4721-4c90-91ac-cbfe2f5fdf9b', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', 'كابوتشينو',              'Cappuccino',              'إسبريسو مع رغوة حليب غنية', 100000, '☕', 'fixed', true,  true,  10, 'https://fygjdivdzrtviiommpoy.supabase.co/storage/v1/object/public/menu/cappuccino.jpg'),
('4bd5e91a-d219-47b4-9039-92a41c345119', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', 'كورتادو مع حليب',        'Cortado with Milk',       '',                          120000, '🥛', 'fixed', false, true,  11, 'https://fygjdivdzrtviiommpoy.supabase.co/storage/v1/object/public/menu/cortado.jpg'),
('e22c9701-210d-4716-b791-40983db0f4f5', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', 'شاي كرك',                'Karak Tea',               '',                          100000, '🫖', 'fixed', false, true,  12, null),
('9761e9ad-1ad2-400d-ace9-52dca6d0fd74', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', 'شاي أحمر/أخضر',          'Black / Green Tea',       '',                          50000,  '🍵', 'fixed', false, true,  13, null),
('ea288a2e-2d2b-4b88-8203-7549068ef53f', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', 'أعشاب ساخنة',            'Hot Herbs',               '',                          50000,  '🌿', 'fixed', false, true,  14, null),
('32b0980b-1365-4019-bd12-726c8ebc22d9', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', 'ميلو ساخن',              'Hot Milo',                '',                          100000, '🍫', 'fixed', false, true,  15, null),
('5b9b354b-fd0e-444a-9a38-904d0785a393', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', 'ميلو مع حليب',           'Milo with Milk',          '',                          150000, '🥛', 'fixed', false, true,  16, null),
('97ff55fc-9f96-45e3-afdc-97849dbe0f6a', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', 'لنزيه (مانيلا/ندو/كوكيير)', 'Lanze',                'مانيلا، ندو، أو كوكيير',    150000, '🥛', 'fixed', false, true,  17, null),
('738d0b0e-a5b0-4945-9591-6fc4bcdf5934', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', 'هوت شوكليت',             'Hot Chocolate',           '',                          120000, '🍫', 'fixed', false, true,  18, null),
('108541a8-8012-4122-8907-dc84b8ef9468', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', 'هوت شوكليت مع حليب',     'Hot Chocolate with Milk', '',                          150000, '🥛', 'fixed', false, true,  19, null),
('0798e1a6-9c69-4414-a417-e75bd13cdf7f', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', 'موكا (دارك/كراميل/وايت)', 'Mocha',                  'دارك، كراميل، أو وايت',     150000, '🍫', 'fixed', false, true,  20, null),
('d37373d8-c0ea-413b-97c2-6f5597d755db', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', 'قهوة تركي',              'Turkish Coffee',          '',                          150000, '☕', 'fixed', false, true,  21, null),
('16190efc-3ecc-4848-83bd-c6ee2012482f', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', 'V60 (اثيوبي/كولومبري)',  'V60',                     'حبوب إثيوبي أو كولومبي',    250000, '⏳', 'fixed', false, true,  22, 'https://fygjdivdzrtviiommpoy.supabase.co/storage/v1/object/public/menu/v60.jpg'),
('df6a6db2-daa8-4a9b-a55b-cdefba12ba9b', 'f4df878d-e47f-4561-b724-7aa26ba7b72f', '3in1',                   '3in1',                    '',                          80000,  '☕', 'fixed', false, true,  23, null);

-- ============ كوكتيلات (13) ============
insert into public.products (id, category_id, name_ar, name_en, description_ar, base_price, emoji, price_mode, is_featured, is_available, sort_order, image_url) values
('e778757a-9b92-4100-b227-4317c27992a2', '865846aa-7ffa-427c-b08f-b63f827855eb', 'كوكتيل طبيعي',             'Natural Cocktail',           '',                       250000, '🍹', 'fixed', true,  true, 1,  null),
('dbab455e-1c07-49cb-96c8-6ab6562f610e', '865846aa-7ffa-427c-b08f-b63f827855eb', 'كوكتيل طبيعي بدون حليب',   'Natural Cocktail (No Milk)', '',                       250000, '🍹', 'fixed', false, true, 2,  null),
('c8f4ca39-0d52-4d63-9e83-c119c760060f', '865846aa-7ffa-427c-b08f-b63f827855eb', 'موز وحليب',                'Banana Milk',                '',                       250000, '🍌', 'fixed', false, true, 3,  null),
('aa3490e0-3bf7-4a29-93ab-f0045e313a67', '865846aa-7ffa-427c-b08f-b63f827855eb', 'موز وحليب وعسل',           'Banana Milk & Honey',        '',                       250000, '🍌', 'fixed', false, true, 4,  null),
('9226b0d5-8326-427b-8586-4709b9375a2d', '865846aa-7ffa-427c-b08f-b63f827855eb', 'موز وحليب وشوكولا',        'Banana Milk & Chocolate',    '',                       250000, '🍌', 'fixed', false, true, 5,  null),
('d1deff69-2c2e-4701-8f78-934b6829560d', '865846aa-7ffa-427c-b08f-b63f827855eb', 'فراولة وحليب',             'Strawberry Milk',            '',                       250000, '🍓', 'fixed', true,  true, 6,  null),
('776c9354-f11c-4a84-8065-7bc574258a44', '865846aa-7ffa-427c-b08f-b63f827855eb', 'فراولة وحليب وموز',        'Strawberry Banana Milk',     '',                       250000, '🍓', 'fixed', false, true, 7,  null),
('6e913c5b-e1ce-4387-aee8-761cd029478b', '865846aa-7ffa-427c-b08f-b63f827855eb', 'مانجو و حليب',             'Mango Milk',                 '',                       250000, '🥭', 'fixed', false, true, 8,  null),
('928b8cf6-b75e-4c0a-a93d-850486ca93c8', '865846aa-7ffa-427c-b08f-b63f827855eb', 'بيري',                     'Berry',                      '',                       250000, '🫐', 'fixed', false, true, 9,  null),
('666f3e8a-a7dd-44be-8790-f3f4bcd4c86e', '865846aa-7ffa-427c-b08f-b63f827855eb', 'هابي بيردي',               'Happy Birthday',             'توت وأيس كريم',          250000, '🎂', 'fixed', false, true, 10, null),
('192db406-675e-4a8b-92fc-64b67a9322cb', '865846aa-7ffa-427c-b08f-b63f827855eb', 'زيكو',                     'Zico',                       'موز ونوت أزرق وأيس كريم', 250000, '🍹', 'fixed', false, true, 11, null),
('2771493a-f236-448c-bd3d-2739e430cc35', '865846aa-7ffa-427c-b08f-b63f827855eb', 'عوار قلب',                 'Awar Qalb',                  'مانجو وفراولة وأيس كريم', 300000, '🍹', 'fixed', false, true, 12, null),
('a7d2588c-d3fd-4ea5-ba41-9ffd9c1378ce', '865846aa-7ffa-427c-b08f-b63f827855eb', 'بيسري',                    'Besray',                     'فيمتو وأيس كريم',        300000, '🍹', 'fixed', false, true, 13, null);

-- ============ ميلك شيك (13) ============
insert into public.products (id, category_id, name_ar, name_en, description_ar, base_price, emoji, price_mode, is_featured, is_available, sort_order, image_url) values
('af3cea14-eb19-49cb-8a75-4f5869453f9f', '057e81e7-edea-402e-851f-ce0e61bca946', 'عالك جدو',   'Alak Jado',   'آيس كريم وسبروس علكة',        250000, '🥛', 'fixed', false, true, 1,  null),
('da4fab4b-f5b4-4eb4-bdb8-124644918586', '057e81e7-edea-402e-851f-ce0e61bca946', 'فمتي فمتي',  'Famti Famti', 'توت أزرق وأحمر وأيس كريم',    250000, '🫐', 'fixed', false, true, 2,  null),
('3dbba100-6a26-42a2-845e-efadb1d3a827', '057e81e7-edea-402e-851f-ce0e61bca946', 'بابا',       'Baba',        'فراولة ونوت أزرق وأيس كريم',  250000, '🥛', 'fixed', false, true, 3,  null),
('d487e753-cfd2-4785-9faf-2a453aecddd4', '057e81e7-edea-402e-851f-ce0e61bca946', 'تشيك ناوك',  'Check Nock',  'فراولة ونوتيلا وأيس كريم',    250000, '🥛', 'fixed', true,  true, 4,  null),
('8c748c26-6973-4adc-a591-dd16052a9dda', '057e81e7-edea-402e-851f-ce0e61bca946', 'بيري بوس',   'Berry Boss',  'ميلك شيك وكورن فليكس',        250000, '🥛', 'fixed', false, true, 5,  null),
('359bb0d6-20e9-4be9-81f7-52c1719d222a', '057e81e7-edea-402e-851f-ce0e61bca946', 'شاب',        'Shab',        'نمر وشوكتم وأيس كريم',        250000, '🥛', 'fixed', false, true, 6,  null),
('f7925bb8-5c9d-4e4e-8183-f54ddf387da4', '057e81e7-edea-402e-851f-ce0e61bca946', 'بنات',       'Banat',       'فراولة وكريمة البندق وأيس كريم', 250000, '🥛', 'fixed', false, true, 7,  null),
('59ca2574-036a-4e06-bb98-3de4c7517b4d', '057e81e7-edea-402e-851f-ce0e61bca946', 'أوريو بيري', 'Oreo Berry',  'أوريو ومقرولة وأيس كريم',     250000, '🍪', 'fixed', false, true, 8,  null),
('1c1d55b8-5973-4908-8264-1d8dfab0f714', '057e81e7-edea-402e-851f-ce0e61bca946', 'مانجو',      'Mango',       '',                            250000, '🥭', 'fixed', false, true, 9,  null),
('41f886f3-24e6-48c3-b0c6-16684deecdb8', '057e81e7-edea-402e-851f-ce0e61bca946', 'كيت كات',    'KitKat',      '',                            250000, '🍫', 'fixed', false, true, 10, null),
('ebb389e6-0543-47ee-9770-f9f36f6025c3', '057e81e7-edea-402e-851f-ce0e61bca946', 'بستاشو',     'Pistachio',   '',                            250000, '🥜', 'fixed', false, true, 11, null),
('fed77666-413e-4dc4-a6d7-25e1310b2e37', '057e81e7-edea-402e-851f-ce0e61bca946', 'سيريلات',    'Cereate',     '',                            250000, '🥣', 'fixed', false, true, 12, null),
('ae9508ab-307d-40ce-8527-5fedd72aa2cb', '057e81e7-edea-402e-851f-ce0e61bca946', 'نوتيلا',     'Nutella',     '',                            250000, '🍫', 'fixed', false, true, 13, null);

-- ============ مشروبات الطاقة وآيس تي (9) ============
insert into public.products (id, category_id, name_ar, name_en, description_ar, base_price, emoji, price_mode, is_featured, is_available, sort_order, image_url) values
('070016b4-e127-4860-bdec-89d0a209c16a', '56ec3bc1-424d-4eda-8d63-c9d61a2ac78e', 'ريدبول',             'Red Bull',            '',                                                          200000, '⚡', 'fixed', false, true, 1, null),
('4d75975c-cd29-43ac-afc0-d02a1114d8ec', '56ec3bc1-424d-4eda-8d63-c9d61a2ac78e', 'بولسن',              'Polsen',              '',                                                          180000, '⚡', 'fixed', false, true, 2, null),
('1d49cbea-2283-425d-9f22-17f2773f11ba', '56ec3bc1-424d-4eda-8d63-c9d61a2ac78e', 'إضافة نكهة',         'Extra Flavor',        'فراولة، مانجو، أناناس، علكة، بلو كيراسو، رمان وفراولة، توت أحمر وأزرق', 80000, '🧃', 'fixed', false, true, 3, null),
('9e872393-9406-4ded-9004-e587e11a09ea', '56ec3bc1-424d-4eda-8d63-c9d61a2ac78e', 'آيس تي خوخ',         'Peach Iced Tea',      '',                                                          200000, '🍑', 'fixed', true,  true, 4, null),
('bd40aec5-39ef-481f-be42-4954e5f15d7e', '56ec3bc1-424d-4eda-8d63-c9d61a2ac78e', 'آيس تي باشن فروت',   'Passion Iced Tea',    '',                                                          200000, '🥤', 'fixed', false, true, 5, null),
('3e8f9f8e-4fb1-4641-85ec-8662653a57dc', '56ec3bc1-424d-4eda-8d63-c9d61a2ac78e', 'آيس تي أناناس',      'Pineapple Iced Tea',  '',                                                          200000, '🍍', 'fixed', false, true, 6, null),
('b791bb84-ba6b-4ddc-a7ef-3eb729f24f71', '56ec3bc1-424d-4eda-8d63-c9d61a2ac78e', 'آيس تي فراولة',      'Strawberry Iced Tea', '',                                                          200000, '🍓', 'fixed', false, true, 7, null),
('9b52a5cd-cd7b-464d-a74b-07e59db59f23', '56ec3bc1-424d-4eda-8d63-c9d61a2ac78e', 'آيس تي ليمون',       'Lemon Iced Tea',      '',                                                          200000, '🍋', 'fixed', false, true, 8, null),
('07bfb7d7-6b27-4a11-9eab-590d8f3db1e8', '56ec3bc1-424d-4eda-8d63-c9d61a2ac78e', 'آيس تي رمان',        'Pomegranate Iced Tea','',                                                          200000, '🍎', 'fixed', false, true, 9, null);

-- ============ آيس كريم (9) ============
insert into public.products (id, category_id, name_ar, name_en, description_ar, base_price, emoji, price_mode, is_featured, is_available, sort_order, image_url) values
('b9645f3d-4a87-4b3f-b25a-97bcec6de532', 'b60f7a84-2b0a-45ca-95b5-e88da2ac0b27', 'فانيلا',        'Vanilla',         '', 50000, '🍨', 'fixed', false, true, 1, null),
('48879e97-ebc4-4e34-b2a7-9bcfd15458a6', 'b60f7a84-2b0a-45ca-95b5-e88da2ac0b27', 'حليب',          'Milk',            '', 50000, '🥛', 'fixed', false, true, 2, null),
('b82f8bc6-8085-43c3-9c41-b95a75e77e84', 'b60f7a84-2b0a-45ca-95b5-e88da2ac0b27', 'نوتيلا',        'Nutella',         '', 50000, '🍫', 'fixed', true,  true, 3, null),
('9334a747-9fe1-40c4-8f8c-8b3553d26886', 'b60f7a84-2b0a-45ca-95b5-e88da2ac0b27', 'مانجو',         'Mango',           '', 50000, '🥭', 'fixed', false, true, 4, null),
('346e8fe8-27cf-43fc-80a8-94e33461abd2', 'b60f7a84-2b0a-45ca-95b5-e88da2ac0b27', 'فراولة',        'Strawberry',      '', 50000, '🍓', 'fixed', false, true, 5, null),
('be44e6cb-6dbd-4d4c-a145-16dae940a483', 'b60f7a84-2b0a-45ca-95b5-e88da2ac0b27', 'علكة',          'Gum',             '', 50000, '🍬', 'fixed', false, true, 6, null),
('7285776c-ab8c-43f4-a5fa-e6b8fcbe9a19', 'b60f7a84-2b0a-45ca-95b5-e88da2ac0b27', 'تشيز كيك نوت',  'Cheesecake Nut',  '', 50000, '🍰', 'fixed', false, true, 7, null),
('cfe16fc0-10be-4728-b174-20db18ace0e3', 'b60f7a84-2b0a-45ca-95b5-e88da2ac0b27', 'موكا نيشينو',   'Mocha Nishino',   '', 50000, '🍨', 'fixed', false, true, 8, null),
('b98a08c5-a046-4e8e-b42e-45d815204607', 'b60f7a84-2b0a-45ca-95b5-e88da2ac0b27', 'ريد فيلفيت',    'Red Velvet',      '', 50000, '🍰', 'fixed', false, true, 9, null);

-- ============ بوبا (11) ============
insert into public.products (id, category_id, name_ar, name_en, description_ar, base_price, emoji, price_mode, is_featured, is_available, sort_order, image_url) values
('0d117f10-7e7a-4cb6-9fe0-5ce97f664b09', 'c4c1ed50-dec1-4d53-baac-5de55e3a6fca', 'بوبا شيت بلو بيري',        'Boba Sheet Blueberry',   '', 350000, '🧋', 'fixed', false, true, 1,  null),
('3717f6b9-c9d2-412b-a9fc-ab99d2eb836b', 'c4c1ed50-dec1-4d53-baac-5de55e3a6fca', 'بوبا شيت فراولة',          'Boba Sheet Strawberry',  '', 350000, '🧋', 'fixed', true,  true, 2,  null),
('640bd514-a5b0-437e-9013-03a963ae1736', 'c4c1ed50-dec1-4d53-baac-5de55e3a6fca', 'بوبا شيت مانجو',           'Boba Sheet Mango',       '', 350000, '🧋', 'fixed', false, true, 3,  null),
('6e0fb7d0-b528-4b54-807c-63a13e35e723', 'c4c1ed50-dec1-4d53-baac-5de55e3a6fca', 'بوبا موهيتو بلو بيري',     'Boba Mojito Blueberry',  '', 300000, '🧋', 'fixed', false, true, 4,  null),
('36ba3d77-9b75-47c6-8421-74ac12387a20', 'c4c1ed50-dec1-4d53-baac-5de55e3a6fca', 'بوبا موهيتو خوخ',          'Boba Mojito Peach',      '', 300000, '🧋', 'fixed', false, true, 5,  null),
('855f15fb-2370-4a61-b140-990eb00dbce1', 'c4c1ed50-dec1-4d53-baac-5de55e3a6fca', 'بوبا موهيتو باشن فروت',    'Boba Mojito Passion',    '', 300000, '🧋', 'fixed', false, true, 6,  null),
('8efe700e-1c0c-44c8-be2f-5d6b953714d5', 'c4c1ed50-dec1-4d53-baac-5de55e3a6fca', 'بوبا موهيتو فواكه استوائية', 'Boba Mojito Tropical', '', 300000, '🧋', 'fixed', false, true, 7,  null),
('ca7197ea-2d36-457a-a8d4-5690227f539e', 'c4c1ed50-dec1-4d53-baac-5de55e3a6fca', 'بوبا موهيتو مانجو',        'Boba Mojito Mango',      '', 300000, '🧋', 'fixed', false, true, 8,  null),
('58a7670e-3d82-4838-a42b-abcd126abb10', 'c4c1ed50-dec1-4d53-baac-5de55e3a6fca', 'بوبا موهيتو روز بيري',     'Boba Mojito Rose Berry', '', 300000, '🧋', 'fixed', false, true, 9,  null),
('20dc05b5-5de4-4c13-92bc-5675f2f0758b', 'c4c1ed50-dec1-4d53-baac-5de55e3a6fca', 'آيس كومي بوبا',            'Ice Komi Boba',          '', 300000, '🧋', 'fixed', false, true, 10, null),
('df811ef4-3083-45d6-a6f7-b0eb39267fe1', 'c4c1ed50-dec1-4d53-baac-5de55e3a6fca', 'حليب كومي بوبا',           'Milk Komi Boba',         '', 300000, '🧋', 'fixed', false, true, 11, null);

-- ============ فريش — عصائر طازجة (9) ============
insert into public.products (id, category_id, name_ar, name_en, description_ar, base_price, emoji, price_mode, is_featured, is_available, sort_order, image_url) values
('954932a6-9cb2-4a34-af15-d4a61b9009ee', '23aac5d1-9b7c-4657-8b4a-367ba75d47e5', 'برتقال',      'Orange',      '', 200000, '🍊', 'fixed', true,  true, 1, null),
('4ca40d3c-9576-4d8d-8ab7-f2fd04688207', '23aac5d1-9b7c-4657-8b4a-367ba75d47e5', 'فراولة',      'Strawberry',  '', 200000, '🍓', 'fixed', false, true, 2, null),
('a837bffa-7d93-49d0-ba54-7f07acf9c078', '23aac5d1-9b7c-4657-8b4a-367ba75d47e5', 'مانجو',       'Mango',       '', 200000, '🥭', 'fixed', false, true, 3, null),
('ae8d7c66-0d3e-4aeb-ae00-0f8d345b2ac5', '23aac5d1-9b7c-4657-8b4a-367ba75d47e5', 'ليمون',       'Lemon',       '', 200000, '🍋', 'fixed', false, true, 4, null),
('06e207c6-7dc1-4e63-9e6d-538507540feb', '23aac5d1-9b7c-4657-8b4a-367ba75d47e5', 'ليمون ونعنع', 'Lemon Mint',  '', 200000, '🌿', 'fixed', false, true, 5, null),
('2cb268cd-52e0-4cd5-b4f4-46eae8019bc5', '23aac5d1-9b7c-4657-8b4a-367ba75d47e5', 'أناناس',      'Pineapple',   '', 250000, '🍍', 'fixed', false, true, 6, null),
('85ea1a9d-3d81-4666-bd23-a24b7eeb2457', '23aac5d1-9b7c-4657-8b4a-367ba75d47e5', 'رمان',        'Pomegranate', '', 200000, '🍎', 'fixed', false, true, 7, null),
('cbfb667d-298a-4b02-a9ae-2eaa878d0a6e', '23aac5d1-9b7c-4657-8b4a-367ba75d47e5', 'أموكادو',     'Avocado',     '', 250000, '🥑', 'fixed', false, true, 8, null),
('e1af07d6-fe5d-46cc-a514-512b90d498b1', '23aac5d1-9b7c-4657-8b4a-367ba75d47e5', 'طفلقات',      'Taflaqat',    '', 300000, '🍹', 'fixed', false, true, 9, null);

commit;
