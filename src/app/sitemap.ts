import { MetadataRoute } from "next"
import { blogPosts } from "@/lib/blogPosts"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.dentalschleifen.de"

  // Build-Zeitstempel: signalisiert Crawlern „frisch generiert“, ohne jedes URL-Datum einzeln zu pflegen
  const lastModified = new Date()

  // Nur indexierbare Marketing-/Inhalts-URLs (keine noindex-Seiten: Impressum, Datenschutz, AGB, etc.)
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/schaerfauftrag`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/express-schaerfen`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/schaerfkurse`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/scaler-schaerfen`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.88,
    },
    {
      url: `${baseUrl}/kueretten-schaerfen`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.88,
    },
    {
      url: `${baseUrl}/chirurgische-instrumente-schaerfen`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.88,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ]

  // Absteigend nach priority (bei gleicher Priorität bleibt die Einfügereihenfolge erhalten)
  return [...routes].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
}
