import React from 'react';
import { motion } from 'motion/react';
import { 
  ClipboardList, 
  CalendarClock, 
  HardHat,
  ArrowRight,
  Wrench
} from 'lucide-react';

const MANUTENCAO_OPTIONS = [
  { id: 'solicitacoes', label: 'Solicitações', icon: ClipboardList, color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'programacoes', label: 'Programações', icon: CalendarClock, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'prestadores', label: 'Prestadores de Serviço', icon: HardHat, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

export const ManutencaoView: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Manutenção</h2>
        <p className="text-slate-500">Gestão de solicitações, cronogramas e prestadores de serviço de manutenção.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MANUTENCAO_OPTIONS.map((option, i) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${option.bg}`}>
              <option.icon className={`w-6 h-6 ${option.color}`} />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
              {option.label}
            </h3>
            <div className="mt-4 flex items-center text-xs font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
              Acessar módulo
              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Ordens de Serviço Ativas</h3>
          <button className="text-sm font-medium text-slate-600 hover:text-slate-900">Ver todas</button>
        </div>
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wrench className="w-8 h-8 text-slate-200" />
          </div>
          <h4 className="text-slate-900 font-medium">Nenhuma ordem de serviço ativa</h4>
          <p className="text-sm text-slate-500 mt-1">As manutenções programadas aparecerão aqui.</p>
        </div>
      </div>
    </motion.div>
  );
};
