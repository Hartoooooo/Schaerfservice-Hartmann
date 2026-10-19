-- Schärfaufträge: sichere Ablage vor dem Mailversand.
--
-- Sicherheitsmodell: Die Tabelle ist ausschließlich serverseitig erreichbar.
-- RLS ist aktiv und es gibt bewusst KEINE Policies für anon/authenticated; zusätzlich
-- sind alle Rechte für diese Rollen entzogen. Nur die API-Route der Website schreibt
-- und liest mit dem Secret-Key (service_role). Der öffentliche Publishable-/Anon-Key
-- kann weder lesen noch schreiben.

create table public.orders (
  id               uuid primary key default gen_random_uuid(),
  order_id         text not null unique check (order_id ~ '^[A-Za-z0-9-]{8,64}$'),
  created_at       timestamptz not null default now(),

  -- Kontaktdaten
  ansprechpartner  text not null check (char_length(ansprechpartner) between 1 and 120),
  praxis           text not null check (char_length(praxis) between 1 and 200),
  email            text not null check (char_length(email) between 3 and 254),
  telefon          text not null default '' check (char_length(telefon) <= 40),
  plz              text not null check (char_length(plz) between 1 and 10),
  ort              text not null check (char_length(ort) between 1 and 100),
  nachricht        text not null default '' check (char_length(nachricht) <= 2000),

  -- Auftrag (serverseitig berechnet)
  items            jsonb not null check (jsonb_typeof(items) = 'array'),
  total_quantity   integer not null check (total_quantity between 1 and 9990),
  subtotal         numeric(10,2) not null check (subtotal >= 0),
  shipping         numeric(10,2) not null check (shipping >= 0),
  total_net        numeric(10,2) not null check (total_net >= 0),
  vat              numeric(10,2) not null check (vat >= 0),
  total_gross      numeric(10,2) not null check (total_gross >= 0),
  discount_info    text not null check (char_length(discount_info) <= 100),

  -- Einwilligungen (ohne beide gibt es keinen Auftrag)
  consent_widerruf boolean not null check (consent_widerruf),
  consent_agb      boolean not null check (consent_agb),
  consent_at       timestamptz not null default now(),

  -- Mailversand
  status           text not null default 'received'
                   check (status in ('received', 'sending', 'mail_sent', 'mail_failed')),
  mail_attempts    integer not null default 0,
  mail_sent_at     timestamptz,
  locked_until     timestamptz,
  last_error       text check (char_length(last_error) <= 500),

  -- Für das Rate-Limit: HMAC der IP (kein Klartext), wird nach 30 Tagen gelöscht
  ip_hash          text check (char_length(ip_hash) <= 128)
);

comment on table public.orders is 'Schärfaufträge der Website. Nur serverseitig (service_role) zugreifbar.';

create index orders_ip_hash_created_at_idx on public.orders (ip_hash, created_at) where ip_hash is not null;
create index orders_status_created_at_idx on public.orders (status, created_at)
  where status <> 'mail_sent';
create index orders_created_at_idx on public.orders (created_at);

alter table public.orders enable row level security;
alter table public.orders force row level security;
revoke all on table public.orders from anon, authenticated, public;
grant select, insert, update, delete on table public.orders to service_role;

-- RLS gilt mit FORCE auch für den Tabelleneigentümer; service_role umgeht RLS ohnehin
-- (BYPASSRLS). Explizite Policy nur für service_role, keine für anon/authenticated.
create policy "service_role full access" on public.orders
  for all to service_role using (true) with check (true);

-- Einen Auftrag atomar für den Mailversand reservieren. Verhindert, dass zwei
-- gleichzeitige Anfragen (andere Instanz, Nachversand-Job) dieselbe Mail doppelt senden.
create or replace function public.claim_order_mail(p_order_id text)
returns setof public.orders
language sql
security invoker
set search_path = ''
as $$
  update public.orders
     set status = 'sending',
         locked_until = now() + interval '2 minutes',
         mail_attempts = mail_attempts + 1
   where order_id = p_order_id
     and (status in ('received', 'mail_failed')
          or (status = 'sending' and locked_until < now()))
  returning *;
$$;

-- Bis zu p_limit offene Aufträge für den Nachversand reservieren.
create or replace function public.claim_pending_order_mails(p_limit integer default 10)
returns setof public.orders
language sql
security invoker
set search_path = ''
as $$
  update public.orders o
     set status = 'sending',
         locked_until = now() + interval '2 minutes',
         mail_attempts = o.mail_attempts + 1
   where o.id in (
     select id from public.orders
      where (status in ('received', 'mail_failed')
             or (status = 'sending' and locked_until < now()))
        and created_at < now() - interval '2 minutes'
        and mail_attempts < 5
      order by created_at
      limit least(greatest(p_limit, 1), 50)
      for update skip locked
   )
  returning o.*;
$$;

revoke all on function public.claim_order_mail(text) from public, anon, authenticated;
revoke all on function public.claim_pending_order_mails(integer) from public, anon, authenticated;
grant execute on function public.claim_order_mail(text) to service_role;
grant execute on function public.claim_pending_order_mails(integer) to service_role;
