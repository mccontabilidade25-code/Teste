import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ClipboardCheck, 
  Calendar, 
  RefreshCw, 
  FileSearch,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  User
} from 'lucide-react';

interface ContabilItem {
  id: string;
  task: string;
  date: string;
  deadline: string;
  status: 'pendente' | 'em_andamento' | 'concluido';
  missing: string;
  responsible: string;
  category: 'procedimentos' | 'documentos_aj' | 'fechamento';
}

const INITIAL_DATA: ContabilItem[] = [
  { 
    id: '1', 
    task: 'Conciliação Bancária Mensal', 
    date: '01/03/2026', 
    deadline: '05/03/2026', 
    status: 'concluido', 
    missing: '-', 
    responsible: 'Ana Silva',
    category: 'procedimentos'
  },
  { 
    id: '2', 
    task: 'Lançamento de Provisões', 
    date: '02/03/2026', 
    deadline: '07/03/2026', 
    status: 'em_andamento', 
    missing: 'Extratos de cartões', 
    responsible: 'Carlos Souza',
    category: 'procedimentos'
  },
  { 
    id: '3', 
    task: 'Importação de XML de Entrada', 
    date: '01/03/2026', 
    deadline: '03/03/2026', 
    status: 'concluido', 
    missing: '-', 
    responsible: 'Ana Silva',
    category: 'fechamento'
  },
  { 
    id: '4', 
    task: 'Checklist Documentos AJ', 
    date: '05/03/2026', 
    deadline: '10/03/2026', 
    status: 'pendente', 
    missing: 'Contratos novos', 
    responsible: 'Mariana Lima',
    category: 'documentos_aj'
  },
];

export const ContabilView: React.FC = () => {
  const [items] = useState<ContabilItem[]>(INITIAL_DATA);

  const getStatusBadge = (status: ContabilItem['status']) => {
    switch (status) {
      case 'concluido':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 uppercase"><CheckCircle2 className="w-3 h-3" /> Concluído</span>;
      case 'em_andamento':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200 uppercase"><Clock className="w-3 h-3" /> Em Andamento</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase"><AlertCircle className="w-3 h-3" /> Pendente</span>;
    }
  };

  const renderTable = (category: ContabilItem['category'], title: string, icon: React.ReactNode) => {
    const filteredItems = items.filter(item => item.category === category);
    
    return (
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <h3 className="font-bold text-slate-900">{title}</h3>
          </div>
          <button className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            <Plus className="w-3 h-3" /> Adicionar Item
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tarefa / Procedimento</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Prazo</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">O que falta</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Responsável</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{item.task}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.date}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">{item.deadline}</td>
                  <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 italic">{item.missing}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                        {item.responsible.split(' ').map(n => n[0]).join('')}
                      </div>
                      {item.responsible}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm">
                    Nenhum item registrado nesta categoria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Contábil</h2>
          <p className="text-slate-500">Gestão contábil, fechamentos mensais e checklists de documentos.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
            <Calendar className="w-4 h-4 text-indigo-600" />
            Calendário de Programação
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Procedimentos', count: 12, color: 'bg-blue-500' },
          { label: 'Documentos AJ', count: 5, color: 'bg-amber-500' },
          { label: 'Importações', count: 8, color: 'bg-emerald-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-500">{stat.label}</span>
              <div className={`w-2 h-2 rounded-full ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.count}</div>
            <div className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Itens pendentes</div>
          </div>
        ))}
      </div>

      {renderTable('procedimentos', 'Procedimentos Contábeis - Checklist', <ClipboardCheck className="w-5 h-5 text-blue-600" />)}
      
      {renderTable('fechamento', 'Fechamento do Sistema e Importações', <RefreshCw className="w-5 h-5 text-emerald-600" />)}
      
      {renderTable('documentos_aj', 'Documentos AJ - Checklist', <FileSearch className="w-5 h-5 text-amber-600" />)}

      <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">Calendário de Programação</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-md">Visualize todos os prazos contábeis e fiscais em uma linha do tempo unificada para evitar atrasos.</p>
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">
            Abrir Calendário Completo
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full -mr-10 -mb-10 blur-2xl" />
      </div>
    </motion.div>
  );
};
