import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase: URL oder Anon Key fehlt. Setzen Sie NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** Datenbank-Typ für einen Schärfauftrag */
export type SchaerfauftragRow = {
  id?: number;
  created_at?: string;

  // Datum des Auftrags
  datum_auftrag: string;

  // Ansprechpartner & Kontakt
  ansprechpartner: string;
  telefon: string;
  email: string;

  // Anschrift
  anschrift: string;

  // Anzahl beauftragte Instrumente
  instrumente_anzahl: number;

  // Detailliste: welche Instrumente, wie oft (formatierter Text)
  instrumente_liste?: string;

  // Beträge (in Euro)
  betrag: number;
  versand: number;
  steuern: number;
  gesamtbetrag: number;

  // Einwilligungsbestätigung (beide Checkboxen bestätigt)
  einwilligung_widerrufsrecht: boolean;
  einwilligung_agb: boolean;
};
