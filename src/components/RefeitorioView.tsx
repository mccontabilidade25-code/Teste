import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Utensils, 
  Coffee, 
  ChefHat, 
  ClipboardList, 
  MessageSquare, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  Search,
  Plus,
  Calendar,
  FileText,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Clock
} from 'lucide-react';

type Tab = 'almoco' | 'desjejum' | 'nf' | 'cardapio' | 'feedback';

interface Employee {
  id: string;
  name: string;
  department: string;
  present: boolean;
}

const INITIAL_EMPLOYEES: Employee[] = [
  { id: '1', name: 'João Silva', department: 'Produção', present: false },
  { id: '2', name: 'Maria Oliveira', department: 'Administrativo', present: true },
  { id: '3', name: 'Carlos Santos', department: 'Logística', present: false },
  { id: '4', name: 'Ana Costa', department: 'TI', present: false },
  { id: '5', name: 'Ricardo Pereira', department: 'Produção', present: true },
];

export const RefeitorioView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('almoco');
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [searchTerm, setSearchTerm] = useState('');

  const togglePresence = (id: string) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, present: !emp.present } : emp
    ));
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Refeitório</h2>
          <p className="text-slate-500">Gestão de refeições, cardápios e controle de fornecedores.</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl w-fit overflow-x-auto">
          {[
            { id: 'almoco', label: 'Almoço', icon: ChefHat },
            { id: 'desjejum', label: 'Desjejum', icon: Coffee },
            { id: 'nf', label: 'Conferência NF', icon: ClipboardList },
            { id: 'cardapio', label: 'Cardápios', icon: Calendar },
            { id: 'feedback', label: 'Sugestões', icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'almoco' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-900">Lista de Presença - Almoço</h3>
                  <p className="text-xs text-slate-500 mt-1">Marque os colaboradores presentes para o almoço de hoje.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Buscar colaborador..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all w-full md:w-64"
                    />
                  </div>
                  <div className="px-4 py-2 bg-orange-50 text-orange-700 rounded-xl text-sm font-bold border border-orange-100">
                    {employees.filter(e => e.present).length} / {employees.length} Presentes
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Colaborador</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Departamento</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Presença</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEmployees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-900">{emp.name}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{emp.department}</td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <button 
                              onClick={() => togglePresence(emp.id)}
                              className={`p-2 rounded-xl transition-all ${
                                emp.present 
                                  ? 'bg-emerald-100 text-emerald-600' 
                                  : 'bg-slate-100 text-slate-300 hover:text-slate-400'
                              }`}
                            >
                              <CheckCircle2 className="w-6 h-6" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'desjejum' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-orange-600" />
                  Registro de Desjejum Entregues
                </h3>
                <div className="space-y-4">
                  {[
                    { date: '23/02/2026', qty: 45, status: 'concluido' },
                    { date: '22/02/2026', qty: 42, status: 'concluido' },
                    { date: '21/02/2026', qty: 48, status: 'concluido' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{item.date}</p>
                          <p className="text-xs text-slate-500">Quantidade: {item.qty}</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 uppercase">
                        Confirmado
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-orange-600 rounded-2xl p-6 text-white flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-lg mb-2">Resumo Semanal</h4>
                  <p className="text-orange-100 text-sm">Total de desjejuns entregues nesta semana.</p>
                  <div className="mt-8 text-4xl font-black">312</div>
                  <p className="text-xs text-orange-200 mt-1">+5% em relação à semana anterior</p>
                </div>
                <button className="w-full py-3 bg-white text-orange-600 rounded-xl font-bold text-sm hover:bg-orange-50 transition-all">
                  Gerar Relatório
                </button>
              </div>
            </div>
          )}

          {activeTab === 'nf' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                    Consumo Semanal
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Almoços</span>
                      <span className="text-sm font-bold text-slate-900">1.240 refeições</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Desjejuns</span>
                      <span className="text-sm font-bold text-slate-900">312 refeições</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 w-[75%]" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    Consumo Quinzenal
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Almoços</span>
                      <span className="text-sm font-bold text-slate-900">2.580 refeições</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Desjejuns</span>
                      <span className="text-sm font-bold text-slate-900">645 refeições</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[82%]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-slate-900">Conferência de Notas Fiscais</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
                    <Plus className="w-4 h-4" />
                    Nova Conferência
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { id: 'NF-2026-001', vendor: 'Sabor & Cia', period: '01/02 - 15/02', status: 'conferido' },
                    { id: 'NF-2026-002', vendor: 'Sabor & Cia', period: '16/02 - 28/02', status: 'pendente' },
                  ].map((nf) => (
                    <div key={nf.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{nf.id}</p>
                          <p className="text-xs text-slate-500">{nf.vendor} • {nf.period}</p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase ${
                        nf.status === 'conferido' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200'
                      }`}>
                        {nf.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cardapio' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-orange-600" />
                  Cardápio do Dia
                </h3>
                <div className="space-y-6">
                  <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                    <h4 className="text-xs font-bold text-orange-700 uppercase tracking-wider mb-2">Prato Principal</h4>
                    <p className="text-lg font-bold text-slate-900">Frango Grelhado com Ervas</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Guarnição</h4>
                      <p className="text-sm font-bold text-slate-900">Seleta de Legumes</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Acompanhamento</h4>
                      <p className="text-sm font-bold text-slate-900">Arroz e Feijão</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Salada</h4>
                      <p className="text-sm font-bold text-slate-900">Mix de Folhas</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sobremesa</h4>
                      <p className="text-sm font-bold text-slate-900">Fruta da Estação</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 mb-6">Programação Semanal</h3>
                <div className="space-y-3">
                  {['Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'].map((day) => (
                    <div key={day} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:bg-slate-100 transition-all cursor-pointer">
                      <span className="text-sm font-bold text-slate-700">{day}</span>
                      <span className="text-xs text-slate-400 group-hover:text-slate-600">Ver Cardápio</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <ThumbsUp className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900">85%</h4>
                  <p className="text-sm text-slate-500">Satisfação Geral</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900">12</h4>
                  <p className="text-sm text-slate-500">Sugestões este mês</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                    <ThumbsDown className="w-6 h-6 text-rose-600" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900">2</h4>
                  <p className="text-sm text-slate-500">Reclamações pendentes</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900">Sugestões e Reclamações Recentes</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {[
                    { type: 'sugestao', text: 'Poderia ter mais opções de frutas na sobremesa.', user: 'Anônimo', date: '2 horas atrás' },
                    { type: 'reclamacao', text: 'O suco estava muito doce hoje.', user: 'João Silva', date: '1 dia atrás' },
                    { type: 'sugestao', text: 'O frango grelhado de hoje estava excelente!', user: 'Maria Oliveira', date: '2 dias atrás' },
                  ].map((fb, i) => (
                    <div key={i} className="p-6 flex gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        fb.type === 'sugestao' ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'
                      }`}>
                        {fb.type === 'sugestao' ? <MessageSquare className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${
                            fb.type === 'sugestao' ? 'text-blue-600' : 'text-rose-600'
                          }`}>
                            {fb.type}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {fb.date}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 mb-2">{fb.text}</p>
                        <p className="text-xs text-slate-500 font-medium">— {fb.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
