-- ربط الصور الحقيقية بمنتجات قهوة 2
-- الصور المحلية: /images/menu/* (مضمنة مع المشروع) + صور التخزين الموجودة

begin;

-- ============ مشروبات ساخنة ============
update public.products set image_url = '/images/menu/double-espresso.jpg' where id = 'ed75e7ac-cd8b-46af-9ac7-98331c3e93a8';
update public.products set image_url = '/images/menu/french.jpg'          where id = '74e75403-8358-4657-93ee-f2dca4fc039d';
update public.products set image_url = '/images/menu/misto.jpg'           where id = '16c70210-f123-4336-9c3b-00c0fc6b6ad3';
update public.products set image_url = '/images/menu/macchiato.jpg'       where id = '2714ad23-80fa-4fbd-b135-4b41616ceb8d';
update public.products set image_url = '/images/menu/amocano.jpg'         where id = '2e059381-c7ee-45fa-a29c-78bd05d982d2';
update public.products set image_url = '/images/menu/karak.jpg'           where id = 'e22c9701-210d-4716-b791-40983db0f4f5';
update public.products set image_url = '/images/menu/tea.jpg'             where id = '9761e9ad-1ad2-400d-ace9-52dca6d0fd74';
update public.products set image_url = 'https://fygjdivdzrtviiommpoy.supabase.co/storage/v1/object/public/menu/green-mint-tea.jpg' where id = 'ea288a2e-2d2b-4b88-8203-7549068ef53f';
update public.products set image_url = '/images/menu/milk.jpg'            where id = '5b9b354b-fd0e-444a-9a38-904d0785a393';
update public.products set image_url = '/images/menu/mocha.jpg'           where id = '0798e1a6-9c69-4414-a417-e75bd13cdf7f';
update public.products set image_url = '/images/menu/double-espresso.jpg' where id = 'd37373d8-c0ea-413b-97c2-6f5597d755db';

-- ============ كوكتيلات ============
update public.products set image_url = '/images/menu/cocktail1.jpg' where id = 'e778757a-9b92-4100-b227-4317c27992a2';
update public.products set image_url = '/images/menu/cocktail2.jpg' where id = 'dbab455e-1c07-49cb-96c8-6ab6562f610e';
update public.products set image_url = '/images/menu/banana.jpg'    where id = 'c8f4ca39-0d52-4d63-9e83-c119c760060f';
update public.products set image_url = 'https://fygjdivdzrtviiommpoy.supabase.co/storage/v1/object/public/menu/strawberry-smoothie.jpg' where id = 'd1deff69-2c2e-4701-8f78-934b6829560d';
update public.products set image_url = '/images/menu/choco-shake.jpg' where id = '6e913c5b-e1ce-4387-aee8-761cd029478b';
update public.products set image_url = '/images/menu/blueberry.jpg' where id = '928b8cf6-b75e-4c0a-a93d-850486ca93c8';
update public.products set image_url = '/images/menu/sundae.jpg'    where id = '666f3e8a-a7dd-44be-8790-f3f4bcd4c86e';

-- ============ ميلك شيك ============
update public.products set image_url = '/images/menu/mango-shake.jpg'  where id = 'd487e753-cfd2-4785-9faf-2a453aecddd4';
update public.products set image_url = '/images/menu/shake-cream.jpg'  where id = '359bb0d6-20e9-4be9-81f7-52c1719d222a';
update public.products set image_url = '/images/menu/oreo-shake.jpg'   where id = '59ca2574-036a-4e06-bb98-3de4c7517b4d';
update public.products set image_url = '/images/menu/choco-shake.jpg'  where id = '1c1d55b8-5973-4908-8264-1d8dfab0f714';
update public.products set image_url = '/images/menu/shake-cream.jpg'  where id = 'ae9508ab-307d-40ce-8527-5fedd72aa2cb';

-- ============ مشروبات الطاقة وآيس تي ============
update public.products set image_url = 'https://fygjdivdzrtviiommpoy.supabase.co/storage/v1/object/public/menu/peach-iced-tea.jpg'    where id = '9e872393-9406-4ded-9004-e587e11a09ea';
update public.products set image_url = 'https://fygjdivdzrtviiommpoy.supabase.co/storage/v1/object/public/menu/passion-mojito.jpg'   where id = 'bd40aec5-39ef-481f-be42-4954e5f15d7e';
update public.products set image_url = '/images/menu/pineapple.jpg'  where id = '3e8f9f8e-4fb1-4641-85ec-8662653a57dc';
update public.products set image_url = 'https://fygjdivdzrtviiommpoy.supabase.co/storage/v1/object/public/menu/strawberry-smoothie.jpg' where id = 'b791bb84-ba6b-4ddc-a7ef-3eb729f24f71';
update public.products set image_url = '/images/menu/icetea.jpg'     where id = '9b52a5cd-cd7b-464d-a74b-07e59db59f23';

-- ============ آيس كريم ============
update public.products set image_url = '/images/menu/icecream-cone.jpg'    where id = 'b9645f3d-4a87-4b3f-b25a-97bcec6de532';
update public.products set image_url = '/images/menu/milk.jpg'             where id = '48879e97-ebc4-4e34-b2a7-9bcfd15458a6';
update public.products set image_url = 'https://fygjdivdzrtviiommpoy.supabase.co/storage/v1/object/public/menu/brownie.jpg' where id = 'b82f8bc6-8085-43c3-9c41-b95a75e77e84';
update public.products set image_url = '/images/menu/mango-fruit.jpg'      where id = '9334a747-9fe1-40c4-8f8c-8b3553d26886';
update public.products set image_url = '/images/menu/strawberries.jpg'     where id = '346e8fe8-27cf-43fc-80a8-94e33461abd2';
update public.products set image_url = '/images/menu/cheesecake.jpg'       where id = '7285776c-ab8c-43f4-a5fa-e6b8fcbe9a19';
update public.products set image_url = '/images/menu/icecream-scoops.jpg'  where id = 'cfe16fc0-10be-4728-b174-20db18ace0e3';

-- ============ بوبا ============
update public.products set image_url = '/images/menu/boba2.jpg' where id = '3717f6b9-c9d2-412b-a9fc-ab99d2eb836b';
update public.products set image_url = '/images/menu/boba1.jpg' where id = '640bd514-a5b0-437e-9013-03a963ae1736';
update public.products set image_url = '/images/menu/mojito.jpg' where id = '6e0fb7d0-b528-4b54-807c-63a13e35e723';
update public.products set image_url = 'https://fygjdivdzrtviiommpoy.supabase.co/storage/v1/object/public/menu/mint-mojito.jpg'    where id = '36ba3d77-9b75-47c6-8421-74ac12387a20';
update public.products set image_url = 'https://fygjdivdzrtviiommpoy.supabase.co/storage/v1/object/public/menu/passion-mojito.jpg' where id = '855f15fb-2370-4a61-b140-990eb00dbce1';
update public.products set image_url = 'https://fygjdivdzrtviiommpoy.supabase.co/storage/v1/object/public/menu/iced-americano.jpg' where id = '20dc05b5-5de4-4c13-92bc-5675f2f0758b';
update public.products set image_url = 'https://fygjdivdzrtviiommpoy.supabase.co/storage/v1/object/public/menu/iced-latte.jpg'     where id = 'df811ef4-3083-45d6-a6f7-b0eb39267fe1';

-- ============ فريش ============
update public.products set image_url = '/images/menu/orange-juice.jpg' where id = '954932a6-9cb2-4a34-af15-d4a61b9009ee';
update public.products set image_url = '/images/menu/strawberries.jpg' where id = '4ca40d3c-9576-4d8d-8ab7-f2fd04688207';
update public.products set image_url = '/images/menu/mango-fruit.jpg'  where id = 'a837bffa-7d93-49d0-ba54-7f07acf9c078';
update public.products set image_url = '/images/menu/lemons.jpg'       where id = 'ae8d7c66-0d3e-4aeb-ae00-0f8d345b2ac5';
update public.products set image_url = 'https://fygjdivdzrtviiommpoy.supabase.co/storage/v1/object/public/menu/lemon-mint.jpg' where id = '06e207c6-7dc1-4e63-9e6d-538507540feb';
update public.products set image_url = '/images/menu/pineapple.jpg'    where id = '2cb268cd-52e0-4cd5-b4f4-46eae8019bc5';
update public.products set image_url = '/images/menu/avocado.jpg'      where id = 'cbfb667d-298a-4b02-a9ae-2eaa878d0a6e';
update public.products set image_url = '/images/menu/juice-mix.jpg'    where id = 'e1af07d6-fe5d-46cc-a514-512b90d498b1';

commit;
