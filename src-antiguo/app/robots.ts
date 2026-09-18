import type { MetadataRoute } from "next";

const urlSitio = process.env.NEXT_PUBLIC_SITE_URL ?? "https://juntatinajas.gob.pa";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/admin" }],
    sitemap: `${urlSitio}/sitemap.xml`
  };
}
