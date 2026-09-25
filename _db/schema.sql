create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_ar text not null,
  name_en text not null,
  emoji text not null default '☕',
  sort_order int not null default 0
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete cascade,
  name_ar text not null,
  name_en text not null,
  description_ar text not null default '',
  base_price numeric(10,2) not null,
  emoji text not null default '☕',
  price_mode text not null default 'drink',
  is_featured boolean not null default false,
  is_available boolean not null default true,
  sort_order int not null default 0
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  order_type text not null default 'pickup',
  address text,
  notes text,
  subtotal numeric(10,2) not null default 0,
  delivery_fee numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid,
  product_name text not null,
  product_name_en text,
  size text,
  extras jsonb not null default '[]'::jsonb,
  quantity int not null default 1,
  unit_price numeric(10,2) not null,
  line_total numeric(10,2) not null,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists categories_public_read on public.categories;
create policy categories_public_read on public.categories for select using (true);

drop policy if exists products_public_read on public.products;
create policy products_public_read on public.products for select using (true);

drop policy if exists orders_public_insert on public.orders;
create policy orders_public_insert on public.orders for insert with check (true);

drop policy if exists order_items_public_insert on public.order_items;
create policy order_items_public_insert on public.order_items for insert with check (true);

create or replace function public.get_order_details(p_order_id uuid)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'order', to_jsonb(o),
    'items', (
      select coalesce(jsonb_agg(to_jsonb(oi) order by oi.created_at, oi.id), '[]'::jsonb)
      from public.order_items oi
      where oi.order_id = o.id
    )
  )
  from public.orders o
  where o.id = p_order_id;
$$;

revoke all on function public.get_order_details(uuid) from public;
grant execute on function public.get_order_details(uuid) to anon, authenticated;
