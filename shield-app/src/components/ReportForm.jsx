import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { normalizeEvidence } from '../utils/normalization';

const ReportForm = () => {
  const [type, setType] = useState('whatsapp');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value) return;

    setLoading(true);
    const normalizedValue = normalizeEvidence(type, value);

    if (!supabase) {
      alert('Servicio de reportes no disponible en este momento (Faltan variables de entorno)');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('reports')
        .insert([
          {
            type,
            evidence_value: normalizedValue,
            status: 'pending'
          }
        ]);

      if (error) throw error;
      setSubmitted(true);
      setValue('');
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error reporting:', error);
      alert('Error al enviar el reporte');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Reportar Amenaza</h2>

      {submitted ? (
        <div className="py-8 flex flex-col items-center text-center text-green-600 animate-in zoom-in">
          <CheckCircle2 size={48} className="mb-2" />
          <p className="font-medium">¡Gracias por tu reporte!</p>
          <p className="text-sm text-gray-500">Ayudaste a proteger a la comunidad.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Estafa</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="whatsapp">WhatsApp / Teléfono</option>
              <option value="link">Enlace / URL Sospechosa</option>
              <option value="bank_account">Cuenta Bancaria</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dato (Número, Link, etc.)</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ej: +507 6000-0000"
              className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                <Send size={18} />
                Enviar Reporte Anónimo
              </>
            )}
          </button>
          <p className="text-xs text-gray-400 text-center">
            Tu reporte será revisado y agregado a nuestra base de datos global.
          </p>
        </form>
      )}
    </div>
  );
};

export default ReportForm;
