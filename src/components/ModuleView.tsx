import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { MODULES, getIcon } from '../constants';
import { ModuleId } from '../types';

export const ModuleView: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const module = MODULES.find(m => m.id === moduleId);
  
  if (!module) return <div>Módulo não encontrado</div>;
  
  const Icon = getIcon(module.icon);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
          module.color.replace('text-', 'bg-').replace('600', '100')
        }`}>
          <Icon className={`w-6 h-6 ${module.color}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{module.label}</h2>
          <p className="text-slate-500">Gerenciamento do módulo de {module.label.toLowerCase()}.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-dashed flex flex-col items-center justify-center text-center py-12">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-slate-300" />
            </div>
            <h4 className="text-slate-900 font-medium">Área em Desenvolvimento</h4>
            <p className="text-sm text-slate-500 mt-1 max-w-[200px]">
              As funcionalidades específicas para {module.label} estão sendo implementadas.
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Registros Recentes</h3>
          <button className="text-sm font-medium text-slate-600 hover:text-slate-900">Ver todos</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Descrição</th>
                <th className="px-6 py-3">Data</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[1, 2, 3, 4, 5].map((row) => (
                <tr key={row} className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 font-mono text-slate-500">#REG-{row}023</td>
                  <td className="px-6 py-4 font-medium text-slate-900">Exemplo de registro para {module.label}</td>
                  <td className="px-6 py-4 text-slate-500">23 Fev 2026</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase">
                      Concluído
                    </span>
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
