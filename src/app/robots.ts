import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.dentalschleifen.de'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/stepper-demo'], // Demo-Seite von Suchmaschinen ausschließen
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
