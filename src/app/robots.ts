import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.dentalschleifen.de'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/stepper-demo', '/api/', '/_next/static/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/stepper-demo'],
        crawlDelay: 0,
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
