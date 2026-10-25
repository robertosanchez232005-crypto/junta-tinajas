"use client";

import { useEffect, useRef, useState } from "react";

type Cifra = { valor: number; decimales?: number; sufijo?: string; etiqueta: string };

function Numero({ valor, decimales = 0, sufijo = "" }: Omit<Cifra, "etiqueta">) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [actual, setActual] = useState(valor); // sin JS o con movimiento reducido se ve el valor final

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const inicio = performance.now();
      const paso = (t: number) => {
        const p = Math.min((t - inicio) / 1400, 1);
        setActual(valor * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(paso);
      };
      setActual(0);
      requestAnimationFrame(paso);
    }, { threshold: 0.6 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [valor]);

  const texto = actual.toLocaleString("es-PA", { minimumFractionDigits: decimales, maximumFractionDigits: decimales });
  return <p ref={ref} className="text-3xl font-extrabold text-institucional-verde sm:text-4xl">{texto}{sufijo}</p>;
}

export function CifrasContador({ cifras }: { cifras: Cifra[] }) {
  return (
    <dl className="grid grid-cols-2 gap-4">
      {cifras.map((c) => (
        <div key={c.etiqueta} className="rounded-xl border border-institucional-verdeClaro bg-white p-5 transition hover:-translate-y-1 hover:border-institucional-verde hover:shadow-md marco">
          <dt className="sr-only">{c.etiqueta}</dt>
          <dd><Numero valor={c.valor} decimales={c.decimales} sufijo={c.sufijo} /><span className="mt-1 block text-sm text-gray-600">{c.etiqueta}</span></dd>
        </div>
      ))}
    </dl>
  );
}
