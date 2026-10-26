// Dirección pública del sitio. Si más adelante compras un dominio propio,
// cambia el valor de respaldo o define NEXT_PUBLIC_SITE_URL en Vercel.
export const urlSitio = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://junta-tinajas.vercel.app").replace(/\/$/, "");
