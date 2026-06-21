create extension if not exists pgcrypto;

create table if not exists public.room_types (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  total_rooms integer not null default 0 check (total_rooms >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  room_type_id uuid references public.room_types(id) on delete set null,
  room_type_name text,
  guest_name text not null,
  guest_phone text not null,
  guest_email text,
  check_in date not null,
  check_out date not null,
  checkin_time text,
  guests integer not null default 1 check (guests >= 1),
  duration text,
  customer_note text,
  status text not null default 'new' check (
    status in (
      'new',
      'contacted',
      'confirmed',
      'cancelled',
      'checked_in',
      'checked_out',
      'no_show'
    )
  ),
  source text not null default 'website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (check_out > check_in)
);

create table if not exists public.availability_overrides (
  id uuid primary key default gen_random_uuid(),
  room_type_id uuid not null references public.room_types(id) on delete cascade,
  date date not null,
  available_rooms integer not null default 0 check (available_rooms >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (room_type_id, date)
);

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'admin' check (role = 'admin'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_room_types_updated_at on public.room_types;
create trigger set_room_types_updated_at
before update on public.room_types
for each row execute function public.set_updated_at();

drop trigger if exists set_bookings_updated_at on public.bookings;
create trigger set_bookings_updated_at
before update on public.bookings
for each row execute function public.set_updated_at();

drop trigger if exists set_availability_overrides_updated_at on public.availability_overrides;
create trigger set_availability_overrides_updated_at
before update on public.availability_overrides
for each row execute function public.set_updated_at();

drop trigger if exists set_admin_profiles_updated_at on public.admin_profiles;
create trigger set_admin_profiles_updated_at
before update on public.admin_profiles
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.admin_profiles
    where user_id = auth.uid()
      and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.room_types enable row level security;
alter table public.bookings enable row level security;
alter table public.availability_overrides enable row level security;
alter table public.admin_profiles enable row level security;

drop policy if exists "Public can read active room types" on public.room_types;
create policy "Public can read active room types"
on public.room_types
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Admins can manage room types" on public.room_types;
create policy "Admins can manage room types"
on public.room_types
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can create website bookings" on public.bookings;
create policy "Public can create website bookings"
on public.bookings
for insert
to anon, authenticated
with check (status = 'new' and source = 'website');

drop policy if exists "Admins can manage bookings" on public.bookings;
create policy "Admins can manage bookings"
on public.bookings
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can manage availability overrides" on public.availability_overrides;
create policy "Admins can manage availability overrides"
on public.availability_overrides
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Users can read own admin profile" on public.admin_profiles;
create policy "Users can read own admin profile"
on public.admin_profiles
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Admins can manage admin profiles" on public.admin_profiles;
create policy "Admins can manage admin profiles"
on public.admin_profiles
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

grant usage on schema public to anon, authenticated;
grant select on table public.room_types to anon;
grant insert on table public.bookings to anon;
grant select, insert, update, delete on table public.room_types to authenticated;
grant select, insert, update, delete on table public.bookings to authenticated;
grant select, insert, update, delete on table public.availability_overrides to authenticated;
grant select, insert, update, delete on table public.admin_profiles to authenticated;

insert into public.room_types (code, name, total_rooms, is_active)
values
  ('phong-tieu-chuan', 'Phòng tiêu chuẩn', 1, true),
  ('phong-doi-tien-nghi', 'Phòng đôi tiện nghi', 2, true),
  ('phong-gia-dinh', 'Phòng gia đình', 1, true)
on conflict (code) do update
set
  name = excluded.name,
  total_rooms = excluded.total_rooms,
  is_active = excluded.is_active,
  updated_at = now();
