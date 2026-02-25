import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Users,
  DollarSign,
  UserPlus,
  FileWarning,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { DashboardStat, RecentActivity } from '../types';
import { MODULES, getIcon } from '../constants';

const STATS: DashboardStat[] = [
  { label: 'Dias sem Acidentes', value: '124', change: '+1', trend: 'up' },
  { label: 'Pessoas na Planta', value: '342', change: '+12', trend: 'up' },
  { label: 'Colaboradores Contratados', value: '850', change: '+5', trend: 'up' },
  { label: 'Pagamentos PDEX (Mês)', value: '15', change: 'R$ 45k', trend: 'up' },
];

const EFFICIENCY_DATA = [
  { name: 'Limpeza', value: 94, color: '#10b981' },
  { name: 'Atividades Equipe', value: 82, color: '#6366f1' },
];

const VISITORS = [
  { id: '1', name: 'Marcos Oliveira', company: 'LogTech Express', time: '13:45', status: 'pendente' },
  { id: '2', name: 'Julia Costa', company: 'Clean Solutions', time: '14:10', status: 'pendente' },
];

const DOC_EXPIRATIONS = [
  { id: '1', title: 'Alvará de Funcionamento', date: '15/03/2026', daysLeft: 20, priority: 'alta' },
  { id: '2', title: 'Licença Ambiental', date: '28/04/2026', daysLeft: 64, priority: 'media' },
  { id: '3', title: 'Seguro Predial', date: '10/03/2026', daysLeft: 15, priority: 'alta' },
];

const ACTIVITIES: RecentActivity[] = [
  { id: '1', module: 'portaria', description: 'Novo visitante registrado: João Silva', timestamp: '10 min atrás', user: 'Portaria Sul' },
  { id: '2', module: 'manutencao', description: 'Manutenção preventiva concluída: Gerador B', timestamp: '45 min atrás', user: 'Eng. Carlos' },
  { id: '3', module: 'financeiro', description: 'Pagamento de fornecedor aprovado', timestamp: '2 horas atrás', user: 'Financeiro' },
  { id: '4', module: 'dp', description: 'Novo funcionário cadastrado: Maria Oliveira', timestamp: '4 horas atrás', user: 'RH' },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Visão Geral</h2>
          <p className="text-slate-500">Bem-vindo ao painel de controle administrativo.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-bold text-emerald-700">Planta Operacional Segura</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              {i === 0 && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
              {i === 1 && <Users className="w-4 h-4 text-blue-500" />}
              {i === 2 && <UserPlus className="w-4 h-4 text-indigo-500" />}
              {i === 3 && <DollarSign className="w-4 h-4 text-emerald-500" />}
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              {stat.change && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 ${
                  stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                  {stat.change}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Eficiência Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Eficiência de Equipes</h3>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={EFFICIENCY_DATA} layout="vertical" margin={{ left: 20, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis 
                  dataKey="name" 
                  type="category"
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                  width={100}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                  {EFFICIENCY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {EFFICIENCY_DATA.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between">
                <span className="text-sm text-slate-500">{entry.name}</span>
                <span className="text-sm font-bold text-slate-900">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visitantes Pendentes */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Visitantes (Aguardando)</h3>
            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full uppercase">2 Pendentes</span>
          </div>
          <div className="space-y-4">
            {VISITORS.map((visitor) => (
              <div key={visitor.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between group hover:bg-slate-100 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{visitor.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-medium">{visitor.company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-700">{visitor.time}</p>
                  <button className="text-[10px] font-bold text-indigo-600 hover:underline">Liberar</button>
                </div>
              </div>
            ))}
            <button className="w-full py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">Ver todos os visitantes</button>
          </div>
        </div>

        {/* Vencimentos de Documentos */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Vencimentos Próximos</h3>
          <div className="space-y-4">
            {DOC_EXPIRATIONS.map((doc) => (
              <div key={doc.id} className="flex items-start gap-3">
                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                  doc.priority === 'alta' ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{doc.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-slate-500 font-medium">{doc.date}</span>
                    <span className={`text-[10px] font-bold ${
                      doc.priority === 'alta' ? 'text-rose-600' : 'text-amber-600'
                    }`}>
                      ({doc.daysLeft} dias)
                    </span>
                  </div>
                </div>
                <button className="p-1 text-slate-300 hover:text-slate-600 transition-colors">
                  <FileWarning className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-slate-900 rounded-xl text-white">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold">Ação Necessária</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              3 documentos administrativos expiram nos próximos 30 dias. Inicie o processo de renovação.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Atividade Recente</h3>
            <button className="text-slate-500 hover:text-slate-900 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-6">
            {ACTIVITIES.map((activity) => {
              const module = MODULES.find(m => m.id === activity.module);
              const Icon = getIcon(module?.icon || 'LayoutDashboard');
              return (
                <div key={activity.id} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    module?.color.replace('text-', 'bg-').replace('600', '100').replace('500', '100').replace('800', '100')
                  }`}>
                    <Icon className={cn("w-5 h-5", module?.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 leading-tight">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.timestamp}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500">{activity.user}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Status da Planta</h3>
            <p className="text-sm text-slate-500 mb-6">Monitoramento em tempo real das operações.</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  <span className="text-sm font-medium text-slate-700">Produção</span>
                </div>
                <span className="text-xs font-bold text-emerald-600">OPERACIONAL</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  <span className="text-sm font-medium text-slate-700">Logística</span>
                </div>
                <span className="text-xs font-bold text-emerald-600">OPERACIONAL</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                  <span className="text-sm font-medium text-slate-700">Manutenção</span>
                </div>
                <span className="text-xs font-bold text-amber-600">ATENÇÃO</span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-indigo-600 rounded-2xl text-white">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-bold">Relatório Diário</span>
            </div>
            <p className="text-xs text-indigo-100 mb-4">
              O relatório consolidado de hoje já está disponível para revisão.
            </p>
            <button className="w-full py-2 bg-white text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-all">
              Acessar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
