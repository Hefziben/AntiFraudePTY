import React, { useState } from 'react';
import { Search, AlertTriangle, ShieldCheck, HelpCircle, Loader2, Info, Lock, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { normalizeEvidence } from '../utils/normalization';

const SearchEngine = () => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('whatsapp');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [recoveryPassword, setRecoveryPassword] = useState('');
  const [recovering, setRecovering] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    const normalizedValue = normalizeEvidence(type, query);

    if (!supabase) {
      alert('Servicio de búsqueda no disponible en este momento (Faltan variables de entorno)');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('reports')
        .select('status, type')
        .eq('evidence_value', normalizedValue);

      if (error) throw error;

      if (data && data.length > 0) {
        const isHacked = data.some(r => r.type === 'hacked_number');
        if (isHacked) {
          setResult('HACKEADO');
        } else {
          // If there are multiple, prioritize 'confirmed'
          const isConfirmed = data.some(r => r.status === 'confirmed');
          setResult(isConfirmed ? 'REPORTADO' : 'SOSPECHOSO');
        }
      } else {
        setResult('SIN REGISTROS');
      }
    } catch (error) {
      console.error('Error searching:', error);
      alert('Error al realizar la búsqueda');
    } finally {
      setLoading(false);
    }
  };

  const handleRecover = async (e) => {
    e.preventDefault();
    if (!recoveryPassword) return;

    setRecovering(true);
    const normalizedValue = normalizeEvidence(type, query);

    try {
      const { data, error } = await supabase
        .from('reports')
        .delete()
        .eq('evidence_value', normalizedValue)
        .eq('type', 'hacked_number')
        .eq('recovery_password', recoveryPassword)
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        alert('Número recuperado exitosamente. El reporte ha sido eliminado.');
        setResult('SIN REGISTROS');
        setRecoveryMode(false);
        setRecoveryPassword('');
      } else {
        alert('Contraseña incorrecta o el reporte ya no existe.');
      }
    } catch (error) {
      console.error('Error recovering:', error);
      alert('Error al intentar recuperar el número');
    } finally {
      setRecovering(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="whatsapp" className="text-gray-900">WhatsApp / Teléfono</option>
            <option value="hacked_number" className="text-gray-900">Número Hackeado</option>
            <option value="link" className="text-gray-900">Enlace / URL</option>
            <option value="bank_account" className="text-gray-900">Cuenta Bancaria</option>
          </select>
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ingrese el dato a verificar..."
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Verificar'}
          </button>
        </div>
      </form>

      {result && (
        <div className={`mt-8 p-6 rounded-xl border-2 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300 ${
          result === 'REPORTADO' || result === 'HACKEADO' ? 'bg-red-50 border-red-200 text-red-700' :
          result === 'SOSPECHOSO' ? 'bg-orange-50 border-orange-200 text-orange-700' :
          'bg-green-50 border-green-200 text-green-700'
        }`}>
          {result === 'REPORTADO' && <AlertTriangle size={48} className="mb-2" />}
          {result === 'HACKEADO' && <Lock size={48} className="mb-2" />}
          {result === 'SOSPECHOSO' && <HelpCircle size={48} className="mb-2" />}
          {result === 'SIN REGISTROS' && <ShieldCheck size={48} className="mb-2" />}

          <h2 className="text-2xl font-black mb-2 tracking-tight">[{result}]</h2>
          <div className="text-lg space-y-4">
            {result === 'REPORTADO' && <p>Este dato ha sido confirmado como una amenaza. ¡TEN CUIDADO!</p>}
            {result === 'HACKEADO' && (
              <div className="space-y-4">
                <p className="font-bold">Este número ha sido reportado como HACKEADO. No confíe en los mensajes que reciba de él.</p>

                <div className="bg-white/50 p-4 rounded-lg text-left text-sm border border-red-100">
                  <h3 className="font-bold flex items-center gap-2 mb-2">
                    <Info size={16} /> ¿Qué hacer si hackearon tu número?
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Avisa a tus contactos por otros medios (redes sociales, llamadas).</li>
                    <li>No compartas códigos de verificación con nadie.</li>
                    <li>Activa la Verificación en Dos Pasos (2FA) en los ajustes de WhatsApp.</li>
                    <li>Envía un correo a <b>support@whatsapp.com</b> con el asunto "Teléfono robado/extraviado: Por favor, desactiva mi cuenta".</li>
                  </ul>
                </div>

                {!recoveryMode ? (
                  <button
                    onClick={() => setRecoveryMode(true)}
                    className="text-xs text-red-600 underline hover:text-red-800"
                  >
                    ¿Es tu número y ya lo recuperaste? Haz clic aquí para limpiar el reporte.
                  </button>
                ) : (
                  <form onSubmit={handleRecover} className="mt-4 p-4 bg-white rounded-lg shadow-sm border border-red-100 w-full max-w-xs mx-auto">
                    <label className="block text-xs font-bold mb-1 text-gray-700">CONTRASEÑA DE RECUPERACIÓN</label>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={recoveryPassword}
                        onChange={(e) => setRecoveryPassword(e.target.value)}
                        placeholder="Tu clave..."
                        className="flex-1 p-2 text-sm border rounded outline-none focus:ring-1 focus:ring-red-500"
                      />
                      <button
                        type="submit"
                        disabled={recovering}
                        className="bg-red-600 text-white p-2 rounded hover:bg-red-700 disabled:opacity-50"
                      >
                        {recovering ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setRecoveryMode(false)}
                      className="text-[10px] mt-2 text-gray-400 hover:text-gray-600"
                    >
                      Cancelar
                    </button>
                  </form>
                )}
              </div>
            )}
            {result === 'SOSPECHOSO' && <p>Existen reportes previos sobre este dato. Procede con extrema cautela.</p>}
            {result === 'SIN REGISTROS' && <p>No tenemos reportes sobre este dato en nuestra base de datos actual.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchEngine;
