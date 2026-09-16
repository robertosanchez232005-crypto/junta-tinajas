import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta institucional inspirada en tonos verdes del logo.
        // Ajustar estos valores exactos al recibir el logo oficial.
        institucional: {
          verde: "#1F5D3A",      // verde principal (encabezado, botones)
          verdeOscuro: "#153F27",
          verdeClaro: "#E8F3EC", // fondos suaves
          crema: "#FBF9F4",      // fondo general
          dorado: "#C9A24B"      // acento secundario opcional
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
export default config;
