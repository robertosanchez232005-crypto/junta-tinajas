import type { Metadata } from "next";
import { FormularioSolicitud } from "@/components/home/FormularioSolicitud";

export const metadata: Metadata = { title: "Atención Ciudadana" };

const preguntasFrecuentes = [
  {
    pregunta: "¿Qué tipo de solicitudes puedo presentar?",
    respuesta: "Quejas, solicitudes de servicio, sugerencias y consultas generales relacionadas con la comunidad."
  },
  {
    pregunta: "¿Cómo puedo dar seguimiento a mi solicitud?",
    respuesta: "Guarda el número de seguimiento que recibirás al enviar el formulario. Próximamente podrás consultarlo en línea."
  },
  {
    pregunta: "¿Mis datos personales están protegidos?",
    respuesta: "Sí. Tus datos se utilizan únicamente para dar seguimiento a tu solicitud y no se publican públicamente."
  }
];

export default function PaginaAtencionCiudadana() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="text-3xl font-extrabold text-institucional-verdeOscuro">Atención Ciudadana</h1>
      <p className="mt-2 max-w-2xl text-gray-600">
        Estamos para servirte. Aquí puedes conocer nuestros servicios, resolver dudas
        frecuentes y enviar tu solicitud, queja o sugerencia.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold text-institucional-verde">Preguntas frecuentes</h2>
          <div className="mt-4 space-y-4">
            {preguntasFrecuentes.map((p) => (
              <details key={p.pregunta} className="rounded-lg border border-gray-200 p-4">
                <summary className="cursor-pointer font-semibold text-gray-800">{p.pregunta}</summary>
                <p className="mt-2 text-sm text-gray-600">{p.respuesta}</p>
              </details>
            ))}
          </div>

          <h2 className="mt-10 text-xl font-bold text-institucional-verde">Información de contacto</h2>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li><strong>Horario de atención:</strong> [Pendiente de confirmar por la Junta Comunal]</li>
            <li><strong>Ubicación de la sede:</strong> [Pendiente de confirmar por la Junta Comunal]</li>
            <li><strong>Teléfono:</strong> [Pendiente de confirmar por la Junta Comunal]</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-institucional-verde">Formulario de solicitud</h2>
          <p className="mt-2 text-sm text-gray-600">
            Todos los campos marcados son necesarios para dar trámite a tu solicitud.
          </p>
          <div className="mt-4">
            <FormularioSolicitud />
          </div>
        </div>
      </div>
    </div>
  );
}
