import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  BookOpen,
  ClipboardList,
  Building2
} from 'lucide-react';

type Company = 'MTB' | 'TGM';

interface FiscalDocument {
  id: string;
  name: string;
  deadline: string;
  status: 'pendente' | 'em_andamento' | 'concluido' | 'atrasado';
}

const FISCAL_DOCS: Record<Company, FiscalDocument[]> = {
  MTB: [
    { id: '1', name: 'SPED Fiscal (ICMS/IPI)', deadline: '15/03/2026', status: 'em_andamento' },
    { id: '2', name: 'EFD Contribuições', deadline: '20/03/2026', status: 'pendente' },
    { id: '3', name: 'GIA Mensal', deadline: '10/03/2026', status: 'concluido' },
    { id: '4', name: 'DCTF Mensal', deadline: '22/03/2026', status: 'pendente' },
  ],
  TGM: [
    { id: '1', name: 'SPED Fiscal (ICMS/IPI)', deadline: '15/03/2026', status: 'concluido' },
    { id: '2', name: 'EFD Contribuições', deadline: '20/03/2026', status: 'em_andamento' },
    { id: '3', name: 'ISSQN Mensal', deadline: '10/03/2026', status: 'concluido' },
    { id: '4', name: 'REINF', deadline: '15/03/2026', status: 'pendente' },
  ]
};

const ATIVIDADES = [
  'Conferência de Notas Fiscais de Entrada',
  'Apuração de Impostos Retidos',
  'Validação de Alíquotas de ICMS/ST',
  'Conciliação de Livros Fiscais',
  'Atendimento a Fiscalizações e Auditorias'
];

const PROCEDIMENTOS = [
  { title: 'Emissão de NF-e', desc: 'Passo a passo para emissão de notas de saída e devolução.' },
  { title: 'Recebimento de Mercadorias', desc: 'Fluxo de conferência de XML e entrada no sistema.' },
  { title: 'Retenções na Fonte', desc: 'Guia de alíquotas para serviços tomados (ISS, IRRF, PCC).' },
];

export const FiscalView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Company>('MTB');

  const getStatusColor = (status: FiscalDocument['status']) => {
    switch (status) {
      case 'concluido': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'em_andamento': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'atrasado': return 'text-rose-600 bg-rose-50 border-rose-100';
      default: return 'text-slate-500 bg-slate-50 border-slate-100';
    }
  };

  const getStatusIcon = (status: FiscalDocument['status']) => {
    switch (status) {
      case 'concluido': return <CheckCircle2 className="w-3 h-3" />;
      case 'em_andamento': return <Clock className="w-3 h-3" />;
      case 'atrasado': return <AlertCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
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
          <h2 className="text-2xl font-bold text-slate-900">Fiscal</h2>
          <p className="text-slate-500">Gestão tributária, obrigações acessórias e conformidade fiscal.</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
          {(['MTB', 'TGM'] as Company[]).map((company) => (
            <button
              key={company}
              onClick={() => setActiveTab(company)}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === company 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                {company}
              </div>
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
          className="space-y-8"
        >
          {/* Documentos Fiscais */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900">Documentos Fiscais (Prazos e Status) - {activeTab}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Obrigação</th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Vencimento</th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {FISCAL_DOCS[activeTab].map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{doc.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          {doc.deadline}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(doc.status)}`}>
                          {getStatusIcon(doc.status)}
                          {doc.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Atividades do Fiscal */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900">Atividades do Fiscal</h3>
              </div>
              <div className="p-6 space-y-4">
                {ATIVIDADES.map((atividade, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">{atividade}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Procedimentos */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900">Procedimentos</h3>
              </div>
              <div className="p-6 space-y-4">
                {PROCEDIMENTOS.map((proc, i) => (
                  <div key={i} className="group p-4 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{proc.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{proc.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
