export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const sitemapLine = baseUrl ? `\nSitemap: ${baseUrl}/sitemap.xml` : '';
  const robotsTxt = `# Dr. Siulik's Dental Care - Production Robots Configuration
User-agent: *
Allow: /${sitemapLine}
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
