import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, Key } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { normalizeEvidence } from '../utils/normalization';

const ReportForm = () => {
  const [type, setType] = useState('whatsapp');
  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value) return;
    if (type === 'hacked_number' && !password) {
      alert('Por favor, ingresa una contraseña de recuperación');
      return;
    }

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
            status: type === 'hacked_number' ? 'confirmed' : 'pending',
            recovery_password: type === 'hacked_number' ? password : null,
            is_public: type === 'hacked_number' ? isPublic : true
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
              className="w-full p-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="whatsapp" className="text-gray-900">Estafa WhatsApp / Teléfono</option>
              <option value="hacked_number" className="text-gray-900">Mi número fue hackeado</option>
              <option value="link" className="text-gray-900">Enlace / URL Sospechosa</option>
              <option value="bank_account" className="text-gray-900">Cuenta Bancaria</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {type === 'hacked_number' ? 'Tu Número de Teléfono' : 'Dato (Número, Link, etc.)'}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={type === 'hacked_number' ? 'Tu número de 8 dígitos' : 'Ej: +507 6000-0000'}
              className="w-full p-2.5 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-red-500 outline-none"
              required
            />
          </div>

          {type === 'hacked_number' && (
            <div className="animate-in fade-in slide-in-from-top-2">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Key size={14} /> Contraseña de recuperación
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Elígela para borrar el reporte luego"
                className="w-full p-2.5 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-red-500 outline-none"
                required
              />
              <p className="text-[10px] text-gray-500 mt-1">
                Guarda esta contraseña. La necesitarás para quitar tu número de la lista cuando lo recuperes.
              </p>

              <div className="mt-4 flex items-start gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <input
                  type="checkbox"
                  id="is_public"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="is_public" className="text-xs text-gray-600 leading-tight">
                  Permitir que mi número aparezca en la lista pública de reportes recientes del dashboard.
                </label>
              </div>
            </div>
          )}

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
