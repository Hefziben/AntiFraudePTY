import React from 'react';
import { FileText, Smartphone, Landmark } from 'lucide-react';

const EmergencyGuide = () => {
  const steps = [
    {
      title: "Paso 1: Recuperación de Canales (Hackeo de WhatsApp)",
      icon: Smartphone,
      color: "bg-red-500",
      lightColor: "bg-red-50",
      textColor: "text-red-700",
      borderColor: "border-red-200",
      items: [
        "Vuelve a instalar la app o solicita el código SMS e introduce tus datos. Esto cerrará la sesión en el dispositivo del estafador.",
        "Si te pide un PIN que no conoces (el estafador activó el 2FA), deberás esperar 7 días para acceder sin él, pero el atacante ya no podrá usar tu cuenta.",
        "Alerta a tus contactos por redes sociales o llamadas que tu cuenta fue comprometida para que no envíen dinero."
      ]
    },
    {
      title: "Paso 2: Protección Financiera",
      icon: Landmark,
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      textColor: "text-orange-700",
      borderColor: "border-orange-200",
      items: [
        "Llama a tu banco o entra a tu app móvil para congelar tus tarjetas y cuentas de inmediato.",
        "Reporta formalmente el movimiento o el Yappy/ACH fraudulento con el soporte del banco."
      ]
    },
    {
      title: "Paso 3: Evidencia y Denuncia (Zero-Contact)",
      icon: FileText,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
      items: [
        "No borres los chats: Toma capturas de pantalla de las conversaciones, el número del estafador, links falsos y comprobantes.",
        "Corta comunicación y bloquea el número. No negocies con ellos.",
        "Presenta la denuncia en la sección de Atención Primaria del Ministerio Público o en la Dirección de Investigación Judicial (DIJ) por Delito Contra el Patrimonio Económico o Delitos Informáticos."
      ]
    }
  ];

  return (
    <div className="space-y-8 relative">
      {/* Vertical Line */}
      <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-200 hidden md:block" />

      {steps.map((step, index) => (
        <div key={index} className="relative flex flex-col md:flex-row gap-6">
          {/* Icon/Number Circle */}
          <div className={`relative z-10 w-12 h-12 shrink-0 rounded-full ${step.color} flex items-center justify-center text-white shadow-lg`}>
            <step.icon size={24} />
          </div>

          {/* Content Card */}
          <div className={`flex-1 p-6 rounded-2xl border-2 ${step.lightColor} ${step.borderColor} ${step.textColor}`}>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              {step.title}
            </h3>
            <ul className="space-y-3">
              {step.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm md:text-base leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-current opacity-50" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmergencyGuide;
