import React, { useEffect } from 'react';
import { X, ShieldCheck, HelpCircle, LifeBuoy } from 'lucide-react';
import PreventionTips from './PreventionTips';
import FAQ from './FAQ';
import EmergencyGuide from './EmergencyGuide';

const HelpModal = ({ isOpen, onClose }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-gray-50 w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <HelpCircle className="text-blue-600" size={24} />
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Centro de Ayuda y Prevención</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-12 pb-12">
          {/* Prevention Section */}
          <section>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900">
              <ShieldCheck className="text-green-600" /> Consejos de Seguridad
            </h3>
            <PreventionTips />
          </section>

          <hr className="border-gray-200" />

          {/* FAQ Section */}
          <section>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900">
              <HelpCircle className="text-blue-600" /> Preguntas Frecuentes
            </h3>
            <FAQ />
          </section>

          <hr className="border-gray-200" />

          {/* Emergency Guide Section */}
          <section>
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-2">
              <LifeBuoy className="text-red-600" /> Guía de Emergencia
            </h3>
            <p className="text-sm text-gray-500 mb-6">¿Ya fuiste víctima? Sigue estos pasos de inmediato.</p>
            <EmergencyGuide />
          </section>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
