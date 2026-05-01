import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Phone, Link as LinkIcon, Landmark, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    whatsapp: 0,
    link: 0,
    bank_account: 0,
    total: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);

      try {
        const { data, error } = await supabase
          .from('reports')
          .select('type')
          .gte('created_at', lastWeek.toISOString());

        if (error) throw error;

        const newStats = data.reduce((acc, report) => {
          acc[report.type] = (acc[report.type] || 0) + 1;
          acc.total += 1;
          return acc;
        }, { whatsapp: 0, link: 0, bank_account: 0, total: 0 });

        setStats(newStats);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="text-blue-600" />
        <h2 className="text-xl font-bold text-gray-800">Tendencias en Panamá (Última Semana)</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={Phone}
          label="Números Bloqueados"
          value={stats.whatsapp}
          color="bg-green-500"
        />
        <StatCard
          icon={LinkIcon}
          label="Enlaces Detectados"
          value={stats.link}
          color="bg-blue-500"
        />
        <StatCard
          icon={Landmark}
          label="Cuentas Reportadas"
          value={stats.bank_account}
          color="bg-purple-500"
        />
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">
          Total de {stats.total} amenazas detectadas en los últimos 7 días.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
