import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Phone, Link as LinkIcon, Landmark, BarChart3, Clock, TrendingUp, ShieldAlert } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    whatsapp: 0,
    link: 0,
    bank_account: 0,
    hacked_number: 0,
    total: 0
  });
  const [recentReports, setRecentReports] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        // 1. Fetch All Stats
        const { data: allData, error: statsError } = await supabase
          .from('reports')
          .select('type, evidence_value, is_public');

        if (statsError) throw statsError;

        const newStats = allData.reduce((acc, report) => {
          acc[report.type] = (acc[report.type] || 0) + 1;
          acc.total += 1;
          return acc;
        }, { whatsapp: 0, link: 0, bank_account: 0, hacked_number: 0, total: 0 });

        setStats(newStats);

        // 2. Fetch Recent Reports (Last 5) - Only Public ones
        const { data: recent, error: recentError } = await supabase
          .from('reports')
          .select('type, evidence_value, created_at')
          .eq('is_public', true)
          .order('created_at', { ascending: false })
          .limit(5);

        if (recentError) throw recentError;
        setRecentReports(recent);

        // 3. Calculate Trending (Most frequent evidence_values) - Only from Public ones
        const frequency = allData
          .filter(r => r.is_public !== false) // Handle existing data where is_public might be null/undefined as true
          .reduce((acc, report) => {
            acc[report.evidence_value] = (acc[report.evidence_value] || 0) + 1;
            return acc;
          }, {});

        const trendingData = Object.entries(frequency)
          .map(([value, count]) => ({ value, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 3);

        setTrending(trendingData);

      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );

  if (loading) return (
    <div className="flex justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="text-red-600" />
          <h2 className="text-xl font-bold text-gray-800">Estadísticas Globales</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={Phone}
            label="Números"
            value={stats.whatsapp}
            color="bg-green-500"
          />
          <StatCard
            icon={LinkIcon}
            label="Enlaces"
            value={stats.link}
            color="bg-blue-500"
          />
          <StatCard
            icon={Landmark}
            label="Cuentas"
            value={stats.bank_account}
            color="bg-purple-500"
          />
          <StatCard
            icon={ShieldAlert}
            label="Hackeos"
            value={stats.hacked_number}
            color="bg-red-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Reports */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-gray-800 font-bold">
            <Clock size={20} className="text-red-600" />
            <h3>Últimos Reportes</h3>
          </div>
          <div className="space-y-3">
            {recentReports.map((report, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-sm font-medium text-gray-700">{report.evidence_value}</span>
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-1 bg-gray-200 text-gray-600 rounded">
                  {report.type === 'hacked_number' ? 'Hack' : report.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Trending */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-gray-800 font-bold">
            <TrendingUp size={20} className="text-red-600" />
            <h3>Lo Más Reportado</h3>
          </div>
          <div className="space-y-3">
            {trending.length > 0 ? trending.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                <span className="text-sm font-bold text-red-700">{item.value}</span>
                <div className="flex items-center gap-1 text-red-600">
                  <span className="text-xs font-black">{item.count}</span>
                  <span className="text-[10px] uppercase font-bold">Reportes</span>
                </div>
              </div>
            )) : (
              <p className="text-sm text-gray-400 text-center py-4 italic">No hay datos suficientes</p>
            )}
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-400 font-medium">
          BASE DE DATOS PILLAO 507: {stats.total} AMENAZAS REGISTRADAS
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
