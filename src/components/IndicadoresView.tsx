import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  WifiOff, 
  Droplets, 
  Zap, 
  Wrench, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  AlertCircle
} from 'lucide-react';

const INTERNET_DOWNTIME_DATA = [
  { month: 'Set', hours: 2.5 },
  { month: 'Out', hours: 1.2 },
  { month: 'Nov', hours: 4.8 },
  { month: 'Dez', hours: 0.5 },
  { month: 'Jan', hours: 1.8 },
  { month: 'Fev', hours: 2.1 },
];

const UTILITY_EXPENSES_DATA = [
  { month: 'Set', agua: 1200, luz: 4500 },
  { month: 'Out', agua: 1150, luz: 4200 },
  { month: 'Nov', agua: 1400, luz: 5100 },
  { month: 'Dez', agua: 1300, luz: 5800 },
  { month: 'Jan', agua: 1100, luz: 4900 },
  { month: 'Fev', agua: 1250, luz: 4700 },
];

const OVERTIME_DATA = [
  { dept: 'Produção', hours: 450 },
  { dept: 'Logística', hours: 120 },
  { dept: 'Manutenção', hours: 85 },
  { dept: 'Adm', hours: 15 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

export const IndicadoresView: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Indicadores de Desempenho</h2>
        <p className="text-slate-500">Monitoramento em tempo real de métricas operacionais e custos fixos.</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
              <WifiOff className="w-5 h-5 text-rose-600" />
            </div>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 15%
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500">Downtime Internet</p>
          <h3 className="text-2xl font-black text-slate-900">2.1h <span className="text-xs font-normal text-slate-400">/ mês</span></h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> 8%
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500">Gasto Água</p>
          <h3 className="text-2xl font-black text-slate-900">R$ 1.250 <span className="text-xs font-normal text-slate-400">/ mês</span></h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Zap className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 4%
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500">Gasto Luz</p>
          <h3 className="text-2xl font-black text-slate-900">R$ 4.700 <span className="text-xs font-normal text-slate-400">/ mês</span></h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> 12%
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500">Horas Extras</p>
          <h3 className="text-2xl font-black text-slate-900">670h <span className="text-xs font-normal text-slate-400">/ total</span></h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Internet Downtime Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-rose-500" />
              Tempo de Parada Internet (Horas)
            </h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={INTERNET_DOWNTIME_DATA}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="hours" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Utility Expenses Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-500" />
              Gastos com Água e Luz (R$)
            </h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={UTILITY_EXPENSES_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="agua" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Água" />
                <Bar dataKey="luz" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Luz" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Overtime by Department */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-500" />
              Horas Extras por Setor
            </h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={OVERTIME_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="hours"
                  nameKey="dept"
                >
                  {OVERTIME_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {OVERTIME_DATA.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-xs font-medium text-slate-600">{item.dept}: {item.hours}h</span>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Controls */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-slate-600" />
              Manutenções Administrativas
            </h3>
            <button className="text-xs font-bold text-indigo-600 hover:underline">Ver todas</button>
          </div>
          <div className="space-y-4">
            {[
              { task: 'Troca de lâmpadas - Bloco A', status: 'Concluído', date: '22/02' },
              { task: 'Reparo ar condicionado - RH', status: 'Em andamento', date: '23/02' },
              { task: 'Manutenção portão principal', status: 'Agendado', date: '25/02' },
              { task: 'Pintura recepção', status: 'Pendente', date: '01/03' },
            ].map((m, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    m.status === 'Concluído' ? 'bg-emerald-500' :
                    m.status === 'Em andamento' ? 'bg-blue-500' :
                    'bg-slate-300'
                  }`} />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{m.task}</p>
                    <p className="text-[10px] text-slate-500 font-medium uppercase">{m.status}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400">{m.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts / Insights */}
      <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
          <AlertCircle className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-amber-900">Insight de Eficiência</h4>
          <p className="text-xs text-amber-700 leading-relaxed mt-1">
            O gasto com energia elétrica subiu 4% este mês, impulsionado pelo uso intensivo de ar condicionado no setor administrativo. 
            Recomendamos a revisão dos horários de desligamento automático.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
