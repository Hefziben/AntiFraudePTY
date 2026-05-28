import React from 'react';
import { ShieldCheck, MonitorOff, Clock } from 'lucide-react';

const PreventionTips = () => {
  const tips = [
    {
      title: "Activa la Verificación en Dos Pasos (2FA)",
      description: "Evita el 99% de los hackeos de WhatsApp. Configúralo en Ajustes > Cuenta > Verificación en dos pasos. NUNCA compartas el código de 6 dígitos que te llega por SMS, con nadie.",
      icon: ShieldCheck,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Cierra Sesiones Activas",
      description: "Revisa periódicamente en WhatsApp la sección de Dispositivos vinculados. Si ves un navegador o equipo que no conoces, dale a 'Cerrar sesión' de inmediato.",
      icon: MonitorOff,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Desconfía de la Urgencia",
      description: "El criminal juega con el miedo, la prisa o el pánico. Si te presionan para actuar 'ya mismo', detente. La prisa es su mejor herramienta.",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tips.map((tip, index) => (
        <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className={`w-12 h-12 ${tip.bgColor} ${tip.color} rounded-xl flex items-center justify-center mb-4`}>
            <tip.icon size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{tip.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {tip.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PreventionTips;
