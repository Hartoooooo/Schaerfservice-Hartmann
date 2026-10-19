-- Zeitgesteuerter Nachversand (pg_cron + pg_net):
-- Alle 15 Minuten ruft die Datenbank den Nachversand-Endpoint der Website auf. Der
-- Endpoint verschickt Bestätigungen, deren Versand beim Absenden gescheitert ist, und
-- setzt die Löschfristen um (IP-Hashes nach 30 Tagen, Aufträge nach 24 Monaten).
-- Nebeneffekt: Das Projekt bleibt aktiv und pausiert im Free-Tarif nicht.
--
-- Voraussetzung: Das Secret liegt in Supabase Vault unter dem Namen 'resend_secret'
-- (gleicher Wert wie RESEND_SECRET in Vercel). Es wird NICHT im Repo gespeichert:
--   select vault.create_secret('<wert>', 'resend_secret');

create extension if not exists pg_cron;
create extension if not exists pg_net with schema extensions;

select cron.schedule(
  'schaerfauftrag-resend',
  '*/15 * * * *',
  $job$select net.http_post(
    url := 'https://www.dentalschleifen.de/api/schaerfauftrag/resend',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'resend_secret')
    ),
    body := '{}'::jsonb,
    timeout_milliseconds := 55000
  );$job$
);
