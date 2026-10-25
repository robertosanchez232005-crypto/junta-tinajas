// Cifras del censo. Si la lista de cifras está vacía, la franja no se muestra en el inicio.
export const censo = {
  anio: 2023,
  fuente: "Instituto Nacional de Estadística y Censo (INEC), Censo de Población y Vivienda 2023.",
  cifras: [
    { valor: 2053, etiqueta: "Habitantes (Censo 2023)" },
    { valor: 6, etiqueta: "Comunidades" },
    { valor: 29.4, decimales: 1, sufijo: " km²", etiqueta: "Superficie" }
  ] as { valor: number; decimales?: number; sufijo?: string; etiqueta: string }[],
  historico: [
    { anio: 2000, habitantes: 1237 },
    { anio: 2010, habitantes: 1530 },
    { anio: 2023, habitantes: 2053 }
  ]
};
