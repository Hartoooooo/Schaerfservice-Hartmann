-- Supabase-Sicherheitshinweis "Extension in Public": pg_net aus dem public-Schema
-- in das Schema "extensions" verschieben. Die Funktionen (net.http_post) bleiben im
-- Schema "net" – der Cron-Job funktioniert unverändert weiter.
-- Im Supabase-Dashboard → SQL Editor ausführen:
drop extension if exists pg_net;
create extension pg_net with schema extensions;
