import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  UsersRound, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  Search,
  Filter,
  MoreVertical,
  Calendar
} from 'lucide-react';

interface TeamTask {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  status: 'concluido' | 'em_andamento' | 'atrasado' | 'pendente';
  priority: 'baixa' | 'media' | 'alta';
}

const INITIAL_TASKS: TeamTask[] = [
  { id: '1', title: 'Relatório de Produção Semanal', assignee: 'Ana Silva', dueDate: '24/02/2026', status: 'em_andamento', priority: 'alta' },
  { id: '2', title: 'Treinamento de Segurança', assignee: 'Carlos Souza', dueDate: '26/02/2026', status: 'pendente', priority: 'media' },
  { id: '3', title: 'Manutenção Preventiva - Linha A', assignee: 'João Pereira', dueDate: '23/02/2026', status: 'atrasado', priority: 'alta' },
  { id: '4', title: 'Atualização de Inventário', assignee: 'Mariana Lima', dueDate: '22/02/2026', status: 'concluido', priority: 'baixa' },
];

export const AtividadesEquipeView: React.FC = () => {
  const [tasks] = useState<TeamTask[]>(INITIAL_TASKS);

  const getStatusStyles = (status: TeamTask['status']) => {
    switch (status) {
      case 'concluido': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'em_andamento': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'atrasado': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getPriorityStyles = (priority: TeamTask['priority']) => {
    switch (priority) {
      case 'alta': return 'text-rose-600';
      case 'media': return 'text-amber-600';
      default: return 'text-slate-400';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Atividades Equipe</h2>
          <p className="text-slate-500">Gestão de tarefas, produtividade e acompanhamento da equipe.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
            <Plus className="w-4 h-4" />
            Nova Tarefa
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total de Tarefas', value: 24, icon: UsersRound, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Concluídas', value: 18, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Em Andamento', value: 4, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Atrasadas', value: 2, icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stat.bg}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-sm text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-bold text-slate-900">Quadro de Atividades</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar tarefa..." 
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-full md:w-64"
              />
            </div>
            <button className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-slate-900 transition-all">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Tarefa</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Responsável</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Vencimento</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Prioridade</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900">{task.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700">
                        {task.assignee.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm text-slate-600">{task.assignee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar className="w-4 h-4" />
                      {task.dueDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <div className={`w-1.5 h-1.5 rounded-full bg-current ${getPriorityStyles(task.priority)}`} />
                      <span className={`text-xs font-bold uppercase ${getPriorityStyles(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase ${getStatusStyles(task.status)}`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
