import React from 'react';
import SearchEngine from './components/SearchEngine';
import ReportForm from './components/ReportForm';
import Dashboard from './components/Dashboard';
import { ShieldAlert } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="text-red-600" size={32} />
            <h1 className="text-2xl font-black tracking-tighter text-gray-900">
              Pillao<span className="text-red-600">507</span>
            </h1>
          </div>
          <div className="hidden md:block">
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              MVP - Semana 1
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-12">
        {/* Hero Section / Search */}
        <section className="text-center space-y-6 pt-4">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            Verifica antes de <span className="text-blue-600 underline decoration-4 underline-offset-4">actuar</span>.
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Consulta nuestra base de datos en tiempo real para detectar estafas por WhatsApp, enlaces maliciosos o cuentas bancarias fraudulentas en Panamá.
          </p>
          <SearchEngine />
        </section>

        <hr className="border-gray-200" />

        {/* Dashboard Section */}
        <section>
          <Dashboard />
        </section>

        {/* Report Section */}
        <section className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                ¿Recibiste algo sospechoso? <br />
                <span className="text-red-500">Repórtalo ahora.</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Tu reporte anónimo ayuda a miles de panameños a no caer en la misma trampa. Solo toma 10 segundos.
              </p>
              <ul className="space-y-3">
                {['100% Anónimo', 'Sin registros complejos', 'Impacto inmediato'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ReportForm />
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-red-600 rounded-full blur-3xl opacity-10" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-10" />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 opacity-50">
            <ShieldAlert size={20} />
            <span className="font-bold tracking-tighter">PILLAO 507</span>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} - Herramienta de Validación Comunitaria. <br />
            Construido para proteger a Panamá.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
