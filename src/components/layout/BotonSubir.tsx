"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BotonSubir() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const f = () => setVisible(window.scrollY > 700);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  if (!visible) return null;
  return (
    <button type="button" aria-label="Volver arriba" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 rounded-full bg-institucional-verde p-3 text-white shadow-lg transition hover:bg-institucional-verdeOscuro">
      <ArrowUp size={22} aria-hidden="true" />
    </button>
  );
}
