-- Tabelle für Schärfaufträge (Supabase)
-- Führen Sie dieses SQL im Supabase Dashboard unter SQL Editor aus.

CREATE TABLE IF NOT EXISTS schaerfauftraege (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Datum des Auftrags (wann der Kunde abgeschickt hat)
  datum_auftrag TIMESTAMPTZ NOT NULL,

  -- Ansprechpartner & Kontakt
  ansprechpartner TEXT NOT NULL,
  telefon TEXT,
  email TEXT NOT NULL,

  -- Anschrift (vollständig)
  anschrift TEXT NOT NULL,

  -- Anzahl beauftragte Instrumente
  instrumente_anzahl INTEGER NOT NULL DEFAULT 0,

  -- Detailliste: welche Instrumente, wie oft (z. B. "Scaler/Küretten: 5 Stück")
  instrumente_liste TEXT,

  -- Beträge in Euro
  betrag NUMERIC(10, 2) NOT NULL,
  versand NUMERIC(10, 2) NOT NULL DEFAULT 0,
  steuern NUMERIC(10, 2) NOT NULL DEFAULT 0,
  gesamtbetrag NUMERIC(10, 2) NOT NULL,

  -- Einwilligungsbestätigungen
  einwilligung_widerrufsrecht BOOLEAN NOT NULL DEFAULT FALSE,
  einwilligung_agb BOOLEAN NOT NULL DEFAULT FALSE
);

-- Row Level Security (RLS) aktivieren
ALTER TABLE schaerfauftraege ENABLE ROW LEVEL SECURITY;

-- Policy: Anonyme Nutzer dürfen nur INSERT (kein SELECT/UPDATE/DELETE)
-- So können Kunden Aufträge einreichen, aber niemand kann die Daten ohne Auth lesen
CREATE POLICY "Anonyme können Aufträge einreichen"
  ON schaerfauftraege
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Service Role kann alles"
  ON schaerfauftraege
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Falls die Tabelle schon existiert: Spalte nachträglich hinzufügen
-- ALTER TABLE schaerfauftraege ADD COLUMN IF NOT EXISTS instrumente_liste TEXT;
