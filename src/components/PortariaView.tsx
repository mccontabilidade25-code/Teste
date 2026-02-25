import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Key, 
  Coffee, 
  Droplet, 
  Clock, 
  AlertTriangle, 
  Users, 
  Car, 
  UserPlus,
  ArrowRight,
  Plus,
  X,
  Settings
} from 'lucide-react';
import { ControleChaves } from './portaria/ControleChaves';
import { PortariaAdministrativo } from './portaria/PortariaAdministrativo';

const PORTARIA_OPTIONS = [
  { id: 'chaves', label: 'Controle de Chaves', icon: Key, color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 'desjejum', label: 'Entrega do Desjejum', icon: Coffee, color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'agua', label: 'Controle de Água', icon: Droplet, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'ponto', label: 'Folha de Ponto Portaria', icon: Clock, color: 'text-slate-600', bg: 'bg-slate-50' },
  { id: 'ocorrencia', label: 'Ocorrência Diária', icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
  { id: 'terceiros', label: 'Controle Colaboradores Terceiros', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 'veiculos', label: 'Fluxo de Veículos', icon: Car, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'visitantes', label: 'Controle de Visitantes', icon: UserPlus, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { id: 'administrativo', label: 'Administrativo', icon: Settings, color: 'text-slate-800', bg: 'bg-slate-100' },
];

export const PortariaView: React.FC = () => {
  const [activeSubModule, setActiveSubModule] = useState<string | null>(null);
  const [daysWithoutAccidents, setDaysWithoutAccidents] = useState(124);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetReason, setResetReason] = useState('');

  const handleReset = () => {
    if (!resetReason.trim()) return;
    setDaysWithoutAccidents(0);
    setShowResetModal(false);
    setResetReason('');
    // In a real app, we would log the reason somewhere
  };

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
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Portaria</h2>
                <p className="text-slate-500">Gestão de acessos, segurança e controles operacionais da portaria.</p>
              </div>

              {/* Dashboard de Segurança */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Dias sem Acidentes</span>
                  <div className="text-4xl font-black text-emerald-600 tabular-nums">
                    {daysWithoutAccidents}
                  </div>
                </div>
                <div className="h-10 w-px bg-slate-100" />
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => setDaysWithoutAccidents(prev => prev + 1)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-bold hover:bg-emerald-100 transition-all border border-emerald-100"
                  >
                    <Plus className="w-3 h-3" />
                    +1 DIA
                  </button>
                  <button 
                    onClick={() => setShowResetModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 rounded-lg text-[10px] font-bold hover:bg-rose-100 transition-all border border-rose-100"
                  >
                    <AlertTriangle className="w-3 h-3" />
                    ZERAR
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PORTARIA_OPTIONS.map((option, i) => (
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
          </motion.div>
        ) : (
          <motion.div
            key="sub-module"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {activeSubModule === 'chaves' && (
              <ControleChaves onBack={() => setActiveSubModule(null)} />
            )}
            {activeSubModule === 'administrativo' && (
              <PortariaAdministrativo onBack={() => setActiveSubModule(null)} />
            )}
            {activeSubModule !== 'chaves' && activeSubModule !== 'administrativo' && (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Módulo em Desenvolvimento</h3>
                <p className="text-slate-500 mb-6">A funcionalidade para "{PORTARIA_OPTIONS.find(o => o.id === activeSubModule)?.label}" está sendo implementada.</p>
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

      {/* Modal de Zerar Contador */}
      <AnimatePresence>
        {showResetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-rose-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-rose-600" />
                  </div>
                  <h3 className="font-bold text-slate-900">Zerar Contador de Acidentes</h3>
                </div>
                <button 
                  onClick={() => setShowResetModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-sm text-slate-600">
                  Ao zerar o contador, você deve obrigatoriamente informar o motivo da ocorrência para registro no sistema.
                </p>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 ml-1">Motivo da Ocorrência</label>
                  <textarea 
                    value={resetReason}
                    onChange={(e) => setResetReason(e.target.value)}
                    placeholder="Descreva brevemente o que aconteceu..."
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all resize-none"
                  />
                </div>

                <button 
                  onClick={handleReset}
                  disabled={!resetReason.trim()}
                  className="w-full py-3 bg-rose-600 text-white rounded-xl font-bold text-sm hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirmar e Zerar Contador
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
