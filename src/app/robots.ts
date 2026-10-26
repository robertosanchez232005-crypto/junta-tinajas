import type { MetadataRoute } from "next";

import { urlSitio } from "@/lib/sitio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/admin" }],
    sitemap: `${urlSitio}/sitemap.xml`
  };
}
