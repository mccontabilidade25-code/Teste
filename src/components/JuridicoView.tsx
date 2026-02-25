import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scale, 
  FileText, 
  Briefcase, 
  AlertCircle, 
  Search, 
  Plus, 
  Download, 
  ExternalLink,
  Clock,
  CheckCircle2,
  Calendar,
  Gavel,
  FileCheck,
  ShieldAlert
} from 'lucide-react';

type JuridicoTab = 'processos' | 'contratos' | 'documentos' | 'consultas';

interface Processo {
  id: string;
  numero: string;
  titulo: string;
  tipo: 'Trabalhista' | 'Cível' | 'Tributário';
  status: 'Em andamento' | 'Concluído' | 'Suspenso';
  ultimaAtualizacao: string;
  valor?: string;
}

const PROCESSOS: Processo[] = [
  { id: '1', numero: '0001234-56.2024.5.02.0000', titulo: 'Ação Trabalhista - Ex-colaborador A', tipo: 'Trabalhista', status: 'Em andamento', ultimaAtualizacao: '15/02/2026', valor: 'R$ 45.000,00' },
  { id: '2', numero: '1005678-90.2023.8.26.0100', titulo: 'Cobrança Indevida Fornecedor X', tipo: 'Cível', status: 'Suspenso', ultimaAtualizacao: '10/01/2026', valor: 'R$ 12.500,00' },
  { id: '3', numero: '5009876-12.2025.4.03.6100', titulo: 'Defesa Tributária ICMS', tipo: 'Tributário', status: 'Em andamento', ultimaAtualizacao: '20/02/2026', valor: 'R$ 150.000,00' },
];

export const JuridicoView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<JuridicoTab>('processos');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Jurídico</h2>
          <p className="text-slate-500">Gestão de processos judiciais, contratos e conformidade legal.</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl w-fit overflow-x-auto">
          {[
            { id: 'processos', label: 'Processos', icon: Gavel },
            { id: 'contratos', label: 'Contratos', icon: FileCheck },
            { id: 'documentos', label: 'Documentos', icon: FileText },
            { id: 'consultas', label: 'Consultas', icon: Briefcase },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as JuridicoTab)}
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

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <Scale className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Processos Ativos</p>
            <h3 className="text-2xl font-black text-slate-900">14</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
            <FileCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Contratos Vigentes</p>
            <h3 className="text-2xl font-black text-slate-900">42</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Prazos Próximos</p>
            <h3 className="text-2xl font-black text-slate-900">3</h3>
          </div>
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
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                    <Gavel className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Processos Judiciais</h3>
                    <p className="text-xs text-slate-500">Acompanhamento de ações e prazos</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Buscar processo..." 
                      className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-full md:w-64"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
                    <Plus className="w-4 h-4" />
                    Novo Processo
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Número / Título</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tipo</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Última Atu.</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Valor</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {PROCESSOS.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-xs font-mono text-blue-600 font-bold mb-1">{p.numero}</p>
                          <p className="text-sm font-bold text-slate-900">{p.titulo}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-medium text-slate-600">{p.tipo}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                            p.status === 'Em andamento' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                            p.status === 'Concluído' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                            'bg-amber-100 text-amber-700 border-amber-200'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{p.ultimaAtualizacao}</td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-700">{p.valor || '-'}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'contratos' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900">Contratos em Vigor</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
                  <Plus className="w-4 h-4" />
                  Novo Contrato
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Contrato de Aluguel - Galpão B', vendor: 'Imobiliária Central', expiry: '12/12/2026', status: 'Vigente' },
                  { title: 'Prestação de Serviços TI', vendor: 'Tech Solutions Ltda', expiry: '05/06/2026', status: 'Renovação' },
                  { title: 'Fornecimento de Matéria Prima', vendor: 'Indústria Metalúrgica S.A', expiry: '20/01/2027', status: 'Vigente' },
                  { title: 'Seguro Patrimonial', vendor: 'Seguradora Porto', expiry: '15/03/2026', status: 'Vencendo' },
                ].map((c, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                        <FileCheck className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{c.title}</p>
                        <p className="text-xs text-slate-500">{c.vendor} • Expira em {c.expiry}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                      c.status === 'Vigente' ? 'bg-emerald-100 text-emerald-700' :
                      c.status === 'Renovação' ? 'bg-blue-100 text-blue-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documentos' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-900 mb-6">Repositório de Documentos Legais</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Contrato Social', type: 'PDF' },
                  { name: 'Cartão CNPJ', type: 'PDF' },
                  { name: 'Alvará de Funcionamento', type: 'PDF' },
                  { name: 'Certidões Negativas', type: 'ZIP' },
                  { name: 'Procurações Ativas', type: 'PDF' },
                  { name: 'Regulamento Interno', type: 'PDF' },
                ].map((doc, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-md transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-3 group-hover:border-blue-200">
                      <FileText className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <p className="text-xs font-bold text-slate-900 mb-1">{doc.name}</p>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{doc.type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'consultas' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-900 mb-6">Consultas Jurídicas Internas</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-blue-900">Aviso Legal</h4>
                    <p className="text-xs text-blue-700 leading-relaxed mt-1">
                      Este módulo é para controle administrativo. Consultas formais devem ser enviadas via sistema de chamados para o escritório parceiro.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { title: 'Dúvida sobre rescisão indireta', date: '22/02', status: 'Respondido' },
                    { title: 'Análise de cláusula de exclusividade', date: '23/02', status: 'Em análise' },
                  ].map((q, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{q.title}</p>
                          <p className="text-xs text-slate-500">Enviado em {q.date}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                        q.status === 'Respondido' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {q.status}
                      </span>
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
