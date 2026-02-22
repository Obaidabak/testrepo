create extension if not exists pgcrypto;

create table if not exists profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  gender text check (gender in ('men','women','unisex')) default 'unisex',
  modest_mode boolean default false,
  style_tags text[] default '{}',
  top_size text,
  bottom_size text,
  shoe_size text,
  budget_min int default 100,
  budget_max int default 1000,
  region text default 'Saudi Arabia',
  daily_scan_limit int default 10,
  created_at timestamptz default now()
);

create table if not exists uploads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  storage_path text not null,
  image_hash text not null,
  is_saved boolean default false,
  expires_at timestamptz default now() + interval '7 days',
  created_at timestamptz default now()
);
create unique index if not exists uploads_hash_user_idx on uploads(user_id, image_hash);

create table if not exists analysis_cache (
  image_hash text primary key,
  result jsonb not null,
  vision_provider text,
  created_at timestamptz default now()
);

create table if not exists outfits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  upload_id uuid references uploads(id) on delete set null,
  analysis jsonb not null,
  cards jsonb not null,
  created_at timestamptz default now()
);

create table if not exists saved_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  outfit_id uuid references outfits(id) on delete cascade,
  palette jsonb,
  created_at timestamptz default now()
);

create table if not exists shared_cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  outfit_id uuid references outfits(id) on delete cascade,
  image_url text,
  payload jsonb not null,
  created_at timestamptz default now()
);

create table if not exists color_rules (
  id bigserial primary key,
  base_hex text not null,
  target_hex text not null,
  compatibility int check (compatibility between 0 and 100),
  style text default 'all'
);

create table if not exists product_catalog (
  id uuid primary key default gen_random_uuid(),
  source text not null default 'curated',
  sku text unique not null,
  name text not null,
  category text not null,
  style_tag text not null,
  price_band text not null,
  currency text default 'SAR',
  price numeric(10,2) not null,
  region text default 'SA',
  color_hex text,
  affiliate_url text not null,
  image_url text,
  created_at timestamptz default now()
);

create table if not exists api_cache (
  query_signature text primary key,
  response jsonb not null,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

create table if not exists rate_limits (
  user_id uuid not null,
  day date not null,
  scans int default 0,
  primary key (user_id, day)
);
