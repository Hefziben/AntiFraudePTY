import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, Phone } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="text-lg font-semibold text-gray-900 pr-8">{question}</span>
        {isOpen ? (
          <ChevronUp className="text-blue-600 flex-shrink-0" size={20} />
        ) : (
          <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100 pb-5' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-gray-600 leading-relaxed whitespace-pre-line">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "¿Cómo sé si un enlace (link) es falso?",
      answer: "La regla de oro: Las instituciones oficiales (Bancos, ATTT, CSS, Amazon) nunca te enviarán un enlace por SMS o WhatsApp exigiendo que actualices tus datos o pagues una multa en las próximas 2 horas bajo amenaza de bloquear tu cuenta.\n\nFíjate en el texto: Los estafadores usan URLs que se parecen a las reales pero tienen un error sutil (ej. bancogeneraI-pty.com con una 'i' mayúscula en lugar de una 'l'). Si no estás seguro, no lo abras; valídalo primero en nuestro buscador."
    },
    {
      question: "Me llegó un mensaje de un número desconocido con la foto de un familiar, ¿qué hago?",
      answer: "No confíes en la foto de perfil: Cualquiera puede descargar una foto de tus redes sociales y ponerla en un chip nuevo.\n\nLa prueba del dinero: Si te dice que 'cambió de número' y a los pocos minutos te pide un favor económico, un pago por Yappy o una transferencia por una 'emergencia', es una estafa. Llama directamente al número antiguo de tu familiar o hazle una pregunta que solo ustedes dos sepan responder."
    },
    {
      question: "¿Es seguro transferir a un número de cuenta si me muestran un comprobante?",
      answer: "Si estás vendiendo algo (por ejemplo, en Marketplace) y te envían una captura de pantalla de una transferencia ACH, no entregues el producto hasta que veas el saldo reflejado en tu propia banca en línea. Las capturas de pantalla se alteran en dos minutos con aplicaciones de edición."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 md:p-6">
        {faqs.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>

      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
        <h4 className="text-blue-900 font-bold mb-2 flex items-center gap-2">
          <MessageCircle size={20} /> ¿Tienes más dudas o sugerencias?
        </h4>
        <p className="text-blue-700 text-sm mb-4">
          Contáctanos directamente para consultas personalizadas o para ayudarnos a mejorar el sistema.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://wa.me/50761234490"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-green-700 transition-colors"
          >
            <MessageCircle size={18} /> WhatsApp
          </a>
          <a
            href="tel:+50761234490"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Phone size={18} /> Llamar (+507) 6123-4490
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
