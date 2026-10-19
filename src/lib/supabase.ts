import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only Supabase-Client mit Secret-Key (service_role). Darf niemals im Browser
// landen – "server-only" lässt den Build fehlschlagen, falls er aus einer Client-
// Komponente importiert wird. Bewusst keine NEXT_PUBLIC_-Variablen.
let client: SupabaseClient | null | undefined;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  client =
    url && key
      ? createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
          global: {
            // Eine hängende Datenbank darf den Auftrag nicht blockieren: lieber schnell
            // scheitern und auf den direkten Mailversand ausweichen.
            fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(8000) }),
          },
        })
      : null;
  if (!client) console.warn("Supabase nicht konfiguriert (SUPABASE_URL/SUPABASE_SECRET_KEY) – Aufträge werden nur gemailt");
  return client;
}

/** Datenbankzeile eines Schärfauftrags (Tabelle public.orders) */
export type OrderRow = {
  id: string;
  order_id: string;
  created_at: string;
  ansprechpartner: string;
  praxis: string;
  email: string;
  telefon: string;
  plz: string;
  ort: string;
  nachricht: string;
  items: { name: string; quantity: number; unitPrice: string; totalPrice: number }[];
  total_quantity: number;
  subtotal: number;
  shipping: number;
  total_net: number;
  vat: number;
  total_gross: number;
  discount_info: string;
  consent_widerruf: boolean;
  consent_agb: boolean;
  consent_at: string;
  status: "received" | "sending" | "mail_sent" | "mail_failed";
  mail_attempts: number;
  mail_sent_at: string | null;
  locked_until: string | null;
  last_error: string | null;
  ip_hash: string | null;
};
