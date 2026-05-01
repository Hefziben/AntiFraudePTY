import React, { useState } from 'react';
import { Search, AlertTriangle, ShieldCheck, HelpCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { normalizeEvidence } from '../utils/normalization';

const SearchEngine = () => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('whatsapp');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    const normalizedValue = normalizeEvidence(type, query);

    try {
      const { data, error } = await supabase
        .from('reports')
        .select('status')
        .eq('evidence_value', normalizedValue);

      if (error) throw error;

      if (data && data.length > 0) {
        // If there are multiple, prioritize 'confirmed'
        const isConfirmed = data.some(r => r.status === 'confirmed');
        setResult(isConfirmed ? 'REPORTADO' : 'SOSPECHOSO');
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

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="whatsapp">WhatsApp / Teléfono</option>
            <option value="link">Enlace / URL</option>
            <option value="bank_account">Cuenta Bancaria</option>
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
          result === 'REPORTADO' ? 'bg-red-50 border-red-200 text-red-700' :
          result === 'SOSPECHOSO' ? 'bg-orange-50 border-orange-200 text-orange-700' :
          'bg-green-50 border-green-200 text-green-700'
        }`}>
          {result === 'REPORTADO' && <AlertTriangle size={48} className="mb-2" />}
          {result === 'SOSPECHOSO' && <HelpCircle size={48} className="mb-2" />}
          {result === 'SIN REGISTROS' && <ShieldCheck size={48} className="mb-2" />}

          <h2 className="text-2xl font-black mb-2 tracking-tight">[{result}]</h2>
          <p className="text-lg">
            {result === 'REPORTADO' && 'Este dato ha sido confirmado como una amenaza. ¡TEN CUIDADO!'}
            {result === 'SOSPECHOSO' && 'Existen reportes previos sobre este dato. Procede con extrema cautela.'}
            {result === 'SIN REGISTROS' && 'No tenemos reportes sobre este dato en nuestra base de datos actual.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchEngine;
