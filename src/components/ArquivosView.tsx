import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderOpen, 
  Cpu, 
  BookOpen, 
  Building2, 
  Search, 
  Plus, 
  FileText, 
  Download, 
  MoreVertical,
  ArrowRight
} from 'lucide-react';

type ArquivoCategory = 'maquinas' | 'procedimentos' | 'patrimonial';

interface Document {
  id: string;
  name: string;
  category: ArquivoCategory;
  date: string;
  size: string;
  type: string;
}

const DOCUMENTS: Document[] = [
  { id: '1', name: 'Manual Prensa Hidráulica X1', category: 'maquinas', date: '12/01/2026', size: '4.2 MB', type: 'PDF' },
  { id: '2', name: 'Procedimento de Segurança Interna', category: 'procedimentos', date: '05/02/2026', size: '1.5 MB', type: 'PDF' },
  { id: '3', name: 'Inventário Patrimonial 2025', category: 'patrimonial', date: '20/12/2025', size: '8.7 MB', type: 'XLSX' },
  { id: '4', name: 'Diagrama Elétrico Torno CNC', category: 'maquinas', date: '15/01/2026', size: '2.1 MB', type: 'DWG' },
  { id: '5', name: 'Normas de Conduta Administrativa', category: 'procedimentos', date: '10/01/2026', size: '0.8 MB', type: 'PDF' },
];

export const ArquivosView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ArquivoCategory | 'all'>('all');

  const filteredDocs = activeCategory === 'all' 
    ? DOCUMENTS 
    : DOCUMENTS.filter(doc => doc.category === activeCategory);

  const categories = [
    { id: 'maquinas', label: 'Máquinas', icon: Cpu, color: 'text-blue-600', bg: 'bg-blue-50', count: 12 },
    { id: 'procedimentos', label: 'Procedimentos Internos', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50', count: 24 },
    { id: 'patrimonial', label: 'Patrimonial', icon: Building2, color: 'text-purple-600', bg: 'bg-purple-50', count: 8 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Arquivos</h2>
          <p className="text-slate-500">Repositório central de documentos técnicos, normas e registros patrimoniais.</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
          <Plus className="w-4 h-4" />
          Upload de Arquivo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            whileHover={{ y: -4 }}
            onClick={() => setActiveCategory(cat.id as ArquivoCategory)}
            className={`p-6 rounded-2xl border transition-all cursor-pointer ${
              activeCategory === cat.id 
                ? 'bg-white border-slate-900 shadow-md' 
                : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${cat.bg}`}>
              <cat.icon className={`w-6 h-6 ${cat.color}`} />
            </div>
            <h3 className="font-bold text-slate-900">{cat.label}</h3>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">{cat.count} arquivos</span>
              <ArrowRight className={`w-4 h-4 transition-transform ${activeCategory === cat.id ? 'text-slate-900 translate-x-1' : 'text-slate-300'}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h3 className="font-bold text-slate-900">Documentos</h3>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${activeCategory === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
              >
                Todos
              </button>
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as ArquivoCategory)}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${activeCategory === cat.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                >
                  {cat.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar documento..." 
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all w-full md:w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Nome do Arquivo</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tamanho</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <AnimatePresence mode="popLayout">
                {filteredDocs.map((doc) => (
                  <motion.tr 
                    key={doc.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{doc.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{doc.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                        doc.category === 'maquinas' ? 'bg-blue-50 text-blue-600' :
                        doc.category === 'procedimentos' ? 'bg-emerald-50 text-emerald-600' :
                        'bg-purple-50 text-purple-600'
                      }`}>
                        {categories.find(c => c.id === doc.category)?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{doc.date}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{doc.size}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
