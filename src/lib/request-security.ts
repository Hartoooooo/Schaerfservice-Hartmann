import "server-only";
import { createHmac, timingSafeEqual } from "crypto";

const DEFAULT_ALLOWED_ORIGINS = ["https://www.dentalschleifen.de", "https://dentalschleifen.de"];

/**
 * Erlaubt nur Anfragen von der eigenen Website (Schutz vor Cross-Site-Requests).
 * Zulässig: eigene Domains, ALLOWED_ORIGINS (kommagetrennt) sowie derselbe Host wie
 * die Anfrage selbst (deckt Vercel-Previews und lokale Entwicklung ab).
 */
export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  let originUrl: URL;
  try {
    originUrl = new URL(origin);
  } catch {
    return false;
  }
  const extra = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  if ([...DEFAULT_ALLOWED_ORIGINS, ...extra].includes(originUrl.origin)) return true;

  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  return !!host && originUrl.host === host;
}

/** Client-IP hinter dem Vercel-Proxy */
export function clientIp(request: Request): string {
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

/** HMAC der IP – in der Datenbank landet nie die Klartext-IP. */
export function hashIp(ip: string): string | null {
  const secret = process.env.IP_HASH_SECRET;
  if (!secret) return null;
  return createHmac("sha256", secret).update(ip).digest("hex");
}

/** Zeitkonstanter Vergleich eines Bearer-Tokens */
export function hasValidBearer(request: Request, secret: string | undefined): boolean {
  if (!secret || secret.length < 32) return false;
  const header = request.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const a = Buffer.from(token);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Liest den Body mit Größenlimit; null bei Überschreitung */
export async function readLimitedText(request: Request, maxBytes: number): Promise<string | null> {
  const declared = Number(request.headers.get("content-length") || 0);
  if (declared > maxBytes) return null;
  const text = await request.text();
  return Buffer.byteLength(text) > maxBytes ? null : text;
}
