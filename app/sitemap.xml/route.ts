import { NextResponse } from 'next/server'
import { getAllPostSlugs, getAllLocationSlugs } from '@/lib/cosmic'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://createsurftravel.com'

  const [postSlugs, locationSlugs] = await Promise.all([
    getAllPostSlugs(),
    getAllLocationSlugs(),
  ])

  const staticRoutes = ['', '/posts', '/locations']

  const urls = [
    ...staticRoutes.map((route) => `${baseUrl}${route}`),
    ...postSlugs.map((slug) => `${baseUrl}/posts/${slug}`),
    ...locationSlugs.map((slug) => `${baseUrl}/locations/${slug}`),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}