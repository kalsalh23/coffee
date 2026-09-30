-- ربط الصور الحقيقية (الجولة الثانية) بمنتجات قهوة 2

begin;

update public.products set image_url = '/images/menu/hotchoc4.jpg'         where id = '738d0b0e-a5b0-4945-9591-6fc4bcdf5934';
update public.products set image_url = '/images/menu/milk2.jpg'            where id = '97ff55fc-9f96-45e3-afdc-97849dbe0f6a';
update public.products set image_url = '/images/menu/instant-ov.jpg'       where id = 'df6a6db2-daa8-4a9b-a55b-cdefba12ba9b';
update public.products set image_url = '/images/menu/tropical-ov.jpg'      where id = '2771493a-f236-448c-bd3d-2739e430cc35';
update public.products set image_url = '/images/menu/gum-icecream-ov.jpg'  where id = 'af3cea14-eb19-49cb-8a75-4f5869453f9f';
update public.products set image_url = '/images/menu/strawshake-ov.jpg'    where id = 'da4fab4b-f5b4-4eb4-bdb8-124644918586';
update public.products set image_url = '/images/menu/shake2.jpg'           where id = '3dbba100-6a26-42a2-845e-efadb1d3a827';
update public.products set image_url = '/images/menu/choco-bar.jpg'        where id = '41f886f3-24e6-48c3-b0c6-16684deecdb8';
update public.products set image_url = '/images/menu/cereal-ov.jpg'        where id = 'fed77666-413e-4dc4-a6d7-25e1310b2e37';
update public.products set image_url = '/images/menu/redbull-ov.jpg'       where id = '070016b4-e127-4860-bdec-89d0a209c16a';
update public.products set image_url = '/images/menu/pomegranate-ov.jpg'   where id = '07bfb7d7-6b27-4a11-9eab-590d8f3db1e8';
update public.products set image_url = '/images/menu/gum-icecream-ov.jpg'  where id = 'be44e6cb-6dbd-4d4c-a145-16dae940a483';
update public.products set image_url = '/images/menu/boba3.jpg'            where id = '0d117f10-7e7a-4cb6-9fe0-5ce97f664b09';
update public.products set image_url = '/images/menu/berry-smoothie.jpg'   where id = '8efe700e-1c0c-44c8-be2f-5d6b953714d5';
update public.products set image_url = '/images/menu/mango-fruit.jpg'      where id = 'ca7197ea-2d36-457a-a8d4-5690227f539e';
update public.products set image_url = '/images/menu/pomegranate-ov.jpg'   where id = '85ea1a9d-3d81-4666-bd23-a24b7eeb2457';

commit;
