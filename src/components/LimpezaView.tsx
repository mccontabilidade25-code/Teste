import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplets, 
  ClipboardCheck, 
  Calendar, 
  Package, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Plus,
  Search,
  ArrowRight,
  Beaker
} from 'lucide-react';

type Tab = 'processos' | 'checklist' | 'programacoes';

interface Product {
  id: string;
  name: string;
  category: string;
  stock: string;
  status: 'ok' | 'baixo' | 'critico';
}

interface ChecklistItem {
  id: string;
  area: string;
  frequency: string;
  lastDone: string;
  status: 'concluido' | 'pendente';
}

const PRODUCTS: Product[] = [
  { id: '1', name: 'Detergente Neutro 5L', category: 'Limpeza Geral', stock: '12 un', status: 'ok' },
  { id: '2', name: 'Desinfetante Hospitalar', category: 'Sanitização', stock: '2 un', status: 'critico' },
  { id: '3', name: 'Papel Toalha Interfolha', category: 'Higiene', stock: '5 fardos', status: 'baixo' },
  { id: '4', name: 'Saco de Lixo 100L', category: 'Descarte', stock: '20 pacotes', status: 'ok' },
];

const CHECKLIST: ChecklistItem[] = [
  { id: '1', area: 'Refeitório', frequency: 'Diário', lastDone: '23/02/2026 08:00', status: 'concluido' },
  { id: '2', area: 'Banheiros Administrativos', frequency: '3x ao dia', lastDone: '23/02/2026 10:30', status: 'concluido' },
  { id: '3', area: 'Área de Produção', frequency: 'Semanal', lastDone: '16/02/2026', status: 'pendente' },
  { id: '4', area: 'Vidraças Externas', frequency: 'Mensal', lastDone: '01/02/2026', status: 'concluido' },
];

export const LimpezaView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('processos');

  const getStatusColor = (status: Product['status'] | ChecklistItem['status']) => {
    switch (status) {
      case 'ok':
      case 'concluido': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'baixo': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'critico':
      case 'pendente': return 'text-rose-600 bg-rose-50 border-rose-100';
      default: return 'text-slate-500 bg-slate-50 border-slate-100';
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
          <h2 className="text-2xl font-bold text-slate-900">Limpeza e Conservação</h2>
          <p className="text-slate-500">Gestão de processos, estoque de produtos e cronogramas de higienização.</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
          {[
            { id: 'processos', label: 'Processos e Produtos', icon: Beaker },
            { id: 'checklist', label: 'Checklist', icon: ClipboardCheck },
            { id: 'programacoes', label: 'Programações', icon: Calendar },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
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
          {activeTab === 'processos' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <Package className="w-5 h-5 text-indigo-600" />
                      Estoque de Produtos
                    </h3>
                    <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Ver Inventário</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Produto</th>
                          <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Categoria</th>
                          <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Estoque</th>
                          <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {PRODUCTS.map((product) => (
                          <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">{product.name}</td>
                            <td className="px-6 py-4 text-sm text-slate-500">{product.category}</td>
                            <td className="px-6 py-4 text-sm text-slate-900 font-bold">{product.stock}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase ${getStatusColor(product.status)}`}>
                                {product.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Beaker className="w-5 h-5 text-emerald-600" />
                    Procedimentos de Uso
                  </h3>
                  <div className="space-y-3">
                    {[
                      'Diluição de Desinfetantes',
                      'Limpeza de Áreas Comuns',
                      'Higienização de Banheiros',
                      'Tratamento de Pisos',
                    ].map((proc, i) => (
                      <div key={i} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-slate-100 transition-all">
                        <span className="text-sm font-medium text-slate-700">{proc}</span>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="font-bold text-slate-900">Checklist de Higienização</h3>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Buscar área..." 
                      className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-full md:w-64"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
                    <Plus className="w-4 h-4" />
                    Novo Registro
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Área / Setor</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Frequência</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Última Execução</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {CHECKLIST.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{item.area}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">{item.frequency}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-300" />
                            {item.lastDone}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase ${getStatusColor(item.status)}`}>
                            {item.status === 'concluido' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'programacoes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Escala da Equipe
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'Maria Oliveira', shift: 'Manhã (06:00 - 15:00)', area: 'Administrativo' },
                    { name: 'José Santos', shift: 'Tarde (13:00 - 22:00)', area: 'Produção' },
                    { name: 'Lucia Costa', shift: 'Noite (22:00 - 06:00)', area: 'Geral' },
                  ].map((staff, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                          {staff.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{staff.name}</p>
                          <p className="text-xs text-slate-500">{staff.area}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-700">{staff.shift}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden flex flex-col justify-center">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Cronograma de Limpeza Pesada</h3>
                  <p className="text-slate-400 text-sm mb-6">Próxima limpeza de caixa d'água e dedetização programada para Março/2026.</p>
                  <button className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">
                    Ver Calendário Anual
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-20 -mt-20 blur-3xl" />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
