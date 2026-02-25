import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserPlus, 
  Users, 
  UserMinus, 
  Briefcase, 
  FileText, 
  Receipt, 
  Palmtree, 
  UserX, 
  AlertCircle, 
  TrendingUp, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { ContratacoesView } from './ContratacoesView';
import { ColaboradoresAtivosView } from './ColaboradoresAtivosView';

const DP_OPTIONS = [
  { id: 'contratacoes', label: 'Contratações', icon: UserPlus, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'ativos', label: 'Colaboradores Ativos', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'demitidos', label: 'Colaboradores Demitidos', icon: UserMinus, color: 'text-slate-600', bg: 'bg-slate-50' },
  { id: 'vagas', label: 'Vagas Abertas', icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 'observacoes-folha', label: 'Observações da Folha', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 'contra-cheques', label: 'Contra-Cheques', icon: Receipt, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { id: 'ferias', label: 'Controle de Férias', icon: Palmtree, color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'faltas', label: 'Faltas', icon: UserX, color: 'text-rose-600', bg: 'bg-rose-50' },
  { id: 'advertencias', label: 'Advertências', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
  { id: 'promocoes', label: 'Promoções', icon: TrendingUp, color: 'text-violet-600', bg: 'bg-violet-50' },
  { id: 'mp', label: 'MP', icon: ShieldAlert, color: 'text-slate-900', bg: 'bg-slate-100' },
];

export const DPView: React.FC = () => {
  const [activeSubModule, setActiveSubModule] = useState<string | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <AnimatePresence mode="wait">
        {!activeSubModule ? (
          <motion.div
            key="main-grid"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Departamento Pessoal / RH</h2>
              <p className="text-slate-500">Gestão de capital humano, folha de pagamento e conformidade trabalhista.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DP_OPTIONS.map((option, i) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setActiveSubModule(option.id)}
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900">Resumo de Colaboradores</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Ativos</span>
                      <span className="text-sm font-bold text-slate-900">124</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[85%]" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Em Férias</span>
                      <span className="text-sm font-bold text-slate-900">12</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full w-[10%]" />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Afastados</span>
                      <span className="text-sm font-bold text-slate-900">5</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-rose-500 h-full w-[5%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900">Vagas em Aberto</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      { cargo: 'Operador de Produção', depto: 'Fábrica', status: 'Urgente' },
                      { cargo: 'Analista de Qualidade', depto: 'Qualidade', status: 'Em seleção' },
                      { cargo: 'Técnico de Manutenção', depto: 'Manutenção', status: 'Triagem' },
                    ].map((vaga, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <div>
                          <p className="text-sm font-bold text-slate-900">{vaga.cargo}</p>
                          <p className="text-xs text-slate-500">{vaga.depto}</p>
                        </div>
                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                          vaga.status === 'Urgente' ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {vaga.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="sub-module"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {activeSubModule === 'contratacoes' && (
              <ContratacoesView onBack={() => setActiveSubModule(null)} />
            )}
            {activeSubModule === 'ativos' && (
              <ColaboradoresAtivosView onBack={() => setActiveSubModule(null)} />
            )}
            {activeSubModule !== 'contratacoes' && activeSubModule !== 'ativos' && (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Módulo em Desenvolvimento</h3>
                <p className="text-slate-500 mb-6">A funcionalidade para "{DP_OPTIONS.find(o => o.id === activeSubModule)?.label}" está sendo implementada.</p>
                <button 
                  onClick={() => setActiveSubModule(null)}
                  className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold"
                >
                  Voltar
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
