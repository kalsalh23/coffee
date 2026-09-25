insert into public.categories (slug, name_ar, name_en, emoji, sort_order) values
('hot', 'قهوة ساخنة', 'Hot Coffee', '☕', 1),
('iced', 'قهوة باردة', 'Iced Coffee', '🧊', 2),
('refreshers', 'مشروبات منعشة', 'Refreshers', '🥤', 3),
('matcha', 'ماتشا وشاي', 'Matcha & Tea', '🍵', 4),
('desserts', 'حلويات', 'Desserts', '🍰', 5),
('beans', 'حبوب مختصة', 'Coffee Beans', '🫘', 6)
on conflict (slug) do nothing;

insert into public.products (category_id, name_ar, name_en, description_ar, base_price, emoji, price_mode, is_featured, sort_order)
select c.id, v.name_ar, v.name_en, v.descr, v.price, v.emoji, v.mode, v.featured, v.sort
from (values
  ('espresso', 'hot', 'إسبريسو', 'Espresso', 'شوت مركّز من حبوبنا المختصة المحمّصة طازجة', 10.00, '☕', 'drink', false, 1),
  ('cortado', 'hot', 'كورتادو', 'Cortado', 'إسبريسو مع حليب مبخّر بنسبة متوازنة', 14.00, '☕', 'drink', false, 2),
  ('flatwhite', 'hot', 'فلات وايت', 'Flat White', 'طبقتان من الإسبريسو مع حليب حريري', 16.00, '🥛', 'drink', false, 3),
  ('cappuccino', 'hot', 'كابتشينو', 'Cappuccino', 'إسبريسو مع رغوة حليب غنية وغزيرة', 17.00, '☕', 'drink', false, 4),
  ('latte', 'hot', 'لاتيه', 'Latte', 'حليب مخملي مع جرعة إسبريسو مثالية', 17.00, '🥛', 'drink', false, 5),
  ('spanish-latte', 'hot', 'سبانيش لاتيه', 'Spanish Latte', 'لاتيه بالحليب المكثّف المحلّى بطعم لا يقاوم', 19.00, '🥛', 'drink', true, 6),
  ('v60', 'hot', 'في 60', 'V60', 'قهوة مقطّرة بتخمير دقيق يبرز نوتات الحبة', 20.00, '⏳', 'drink', false, 7),
  ('americano', 'hot', 'أمريكانو', 'Americano', 'إسبريسو مع ماء ساخن لفنجان طويل ونقي', 13.00, '☕', 'drink', false, 8),
  ('iced-spanish-latte', 'iced', 'آيس سبانيش لاتيه', 'Iced Spanish Latte', 'بارد ومنعش بالحليب المكثّف والحليب الطازج', 20.00, '🥤', 'drink', true, 1),
  ('iced-latte', 'iced', 'آيس لاتيه', 'Iced Latte', 'إسبريسو بارد مع حليب طازج وثلج', 18.00, '🥤', 'drink', false, 2),
  ('iced-americano', 'iced', 'آيس أمريكانو', 'Iced Americano', 'إسبريسو بارد مع ماء وثلج لانتعاش صافٍ', 14.00, '🧊', 'drink', false, 3),
  ('cold-brew', 'iced', 'كولد برو', 'Cold Brew', 'تخمير بارد على مدى 18 ساعة لطعم ناعم ومركّز', 19.00, '🧊', 'drink', true, 4),
  ('espresso-tonic', 'iced', 'إسبريسو تونيك', 'Espresso Tonic', 'مزيج منعش من الإسبريسو والتونيك والليمون', 22.00, '🍸', 'drink', false, 5),
  ('mint-mojito', 'refreshers', 'موهيتو نعناع', 'Mint Mojito', 'نعناع طازج مع ليمون وصودا منعشة', 17.00, '🌿', 'drink', false, 1),
  ('lemon-mint', 'refreshers', 'ليمون بالنعناع', 'Lemon Mint', 'ليموناضة طبيعية بورق النعناع الطازج', 15.00, '🍋', 'drink', false, 2),
  ('strawberry-smoothie', 'refreshers', 'سموذي فراولة', 'Strawberry Smoothie', 'فراولة طازجة مخفوقة مع الزبادي', 20.00, '🍓', 'drink', false, 3),
  ('peach-iced-tea', 'refreshers', 'آيس تي خوخ', 'Peach Iced Tea', 'شاي مثلج بنكهة الخوخ الطبيعية', 16.00, '🍑', 'drink', false, 4),
  ('passion-mojito', 'refreshers', 'موهيتو باشون', 'Passion Mojito', 'باشون فروت مع ليمون وصودا باردة', 19.00, '🥤', 'drink', false, 5),
  ('matcha-latte', 'matcha', 'ماتشا لاتيه', 'Matcha Latte', 'ماتشا يابانية أصلية مع حليب مخملي', 21.00, '🍵', 'drink', true, 1),
  ('iced-matcha', 'matcha', 'آيس ماتشا', 'Iced Matcha', 'ماتشا باردة منعشة مع حليب وثلج', 21.00, '🧊', 'drink', false, 2),
  ('karak', 'matcha', 'شاي كرك', 'Karak Tea', 'شاي كرك بالحليب بهيّالتو الدافئة', 12.00, '🫖', 'drink', false, 3),
  ('green-mint-tea', 'matcha', 'شاي أخضر بالنعناع', 'Green Mint Tea', 'شاي أخضر مغسول بورق النعناع', 10.00, '🍵', 'drink', false, 4),
  ('basque-cheesecake', 'desserts', 'تشيز كيك سان سباستيان', 'Basque Cheesecake', 'قوامه الكريمي الذائب بكراميل محروق', 24.00, '🍰', 'dessert', true, 1),
  ('brownie', 'desserts', 'براوني', 'Chocolate Brownie', 'براوني غني بالشوكولاتة البلجيكية', 18.00, '🍫', 'dessert', false, 2),
  ('cookie', 'desserts', 'كوكيز بالشوكولاتة', 'Choco Chip Cookie', 'كوكيز هش بقطع الشوكولاتة الداكنة', 12.00, '🍪', 'dessert', false, 3),
  ('kunafa-cream', 'desserts', 'كنافة بالكريمة', 'Kunafa Cream', 'كنافة مقرمشة مع كريمة طازجة وقطر خفيف', 22.00, '🍮', 'dessert', false, 4),
  ('ethiopia', 'beans', 'حبوب إثيوبيا يرقاشيف', 'Ethiopia Yirgacheffe', 'نوتات فواكه حمراء وياسمين — تحميص فاتح', 65.00, '🫘', 'beans', true, 1),
  ('colombia', 'beans', 'حبوب كولومبيا وايلا', 'Colombia Huila', 'نوتات كراميل وشوكولاتة — تحميص وسط', 60.00, '🫘', 'beans', false, 2),
  ('brazil', 'beans', 'حبوب البرازيل سيرادو', 'Brazil Cerrado', 'نوتات بندق وشوكولاتة حليب — تحميص وسط داكن', 55.00, '🫘', 'beans', false, 3)
) as v(slug, cat, name_ar, name_en, descr, price, emoji, mode, featured, sort)
join public.categories c on c.slug = v.cat
on conflict do nothing;
