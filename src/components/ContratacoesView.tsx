import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserPlus, 
  ArrowLeft, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Link as LinkIcon, 
  Stethoscope, 
  Users, 
  Calendar,
  X,
  Send,
  ExternalLink,
  Info,
  CreditCard,
  Bus
} from 'lucide-react';

interface HiringProcess {
  id: string;
  candidateName: string;
  role: string;
  asoDone: boolean;
  docsStatus: 'pendente' | 'parcial' | 'completo';
  docsSubmitted: string[];
  startDate: string;
  integrationDone: boolean;
  probationEnd: string;
  transportValue?: string;
  bankAccount?: string;
  bankName?: string;
  bankAgency?: string;
  status: 'em_andamento' | 'concluido' | 'cancelado';
  token: string;
}

const INITIAL_HIRING: HiringProcess[] = [
  { 
    id: '1', 
    candidateName: 'Marcos Oliveira', 
    role: 'Operador de Máquina', 
    asoDone: true, 
    docsStatus: 'parcial',
    docsSubmitted: ['RG', 'CPF', 'Comprovante Residência'],
    startDate: '10/03/2026',
    integrationDone: false,
    probationEnd: '10/06/2026',
    status: 'em_andamento',
    token: 'marcos-123'
  },
  { 
    id: '2', 
    candidateName: 'Julia Fernandes', 
    role: 'Analista Administrativo', 
    asoDone: false, 
    docsStatus: 'pendente',
    docsSubmitted: [],
    startDate: '15/03/2026',
    integrationDone: false,
    probationEnd: '15/06/2026',
    status: 'em_andamento',
    token: 'julia-456'
  }
];

interface Props {
  onBack: () => void;
}

export const ContratacoesView: React.FC<Props> = ({ onBack }) => {
  const [hiringList, setHiringList] = useState<HiringProcess[]>(() => {
    const saved = localStorage.getItem('processos_contratacao');
    return saved ? JSON.parse(saved) : INITIAL_HIRING;
  });
  const [selectedHiring, setSelectedHiring] = useState<HiringProcess | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState<HiringProcess | null>(null);

  // Persist hiring list changes
  useEffect(() => {
    localStorage.setItem('processos_contratacao', JSON.stringify(hiringList));
  }, [hiringList]);

  // Sync with Admission Portal submissions (LocalStorage simulation)
  useEffect(() => {
    const interval = setInterval(() => {
      setHiringList(prev => {
        let hasChanges = false;
        const newList = prev.map(h => {
          const savedData = localStorage.getItem(`admission_${h.token}`);
          if (savedData) {
            const data = JSON.parse(savedData);
            // Check if we already have this data to avoid unnecessary state updates
            if (h.docsStatus !== (data.docsCount >= 5 ? 'completo' : data.docsCount > 0 ? 'parcial' : h.docsStatus) || 
                h.candidateName !== (data.fullName || h.candidateName)) {
              hasChanges = true;
              return {
                ...h,
                candidateName: data.fullName || h.candidateName,
                bankAccount: data.bankAccount,
                bankName: data.bankName,
                bankAgency: data.bankAgency,
                transportValue: data.transportValue,
                docsStatus: data.docsCount >= 5 ? 'completo' : data.docsCount > 0 ? 'parcial' : h.docsStatus,
                docsSubmitted: data.uploadedDocs ? data.uploadedDocs.map((d: any) => d.label) : h.docsSubmitted
              };
            }
          }
          return h;
        });
        return hasChanges ? newList : prev;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleAso = (id: string) => {
    setHiringList(prev => prev.map(h => h.id === id ? { ...h, asoDone: !h.asoDone } : h));
    if (selectedHiring?.id === id) {
      setSelectedHiring(prev => prev ? { ...prev, asoDone: !prev.asoDone } : null);
    }
  };

  const toggleIntegration = (id: string) => {
    setHiringList(prev => prev.map(h => h.id === id ? { ...h, integrationDone: !h.integrationDone } : h));
    if (selectedHiring?.id === id) {
      setSelectedHiring(prev => prev ? { ...prev, integrationDone: !prev.integrationDone } : null);
    }
  };

  const handleCompleteAdmission = (hiring: HiringProcess) => {
    // 1. Get existing employees
    const existingEmployeesRaw = localStorage.getItem('colaboradores_ativos');
    const existingEmployees = existingEmployeesRaw ? JSON.parse(existingEmployeesRaw) : [];
    
    // 2. Add new employee
    const newEmployee = {
      id: Date.now().toString(),
      name: hiring.candidateName,
      role: hiring.role,
      startDate: hiring.startDate,
      status: 'Ativo',
      documents: hiring.docsSubmitted,
      bankInfo: {
        name: hiring.bankName,
        agency: hiring.bankAgency,
        account: hiring.bankAccount
      },
      transportValue: hiring.transportValue,
      admittedFrom: hiring.id
    };

    localStorage.setItem('colaboradores_ativos', JSON.stringify([...existingEmployees, newEmployee]));

    // 3. Remove from hiring list
    setHiringList(prev => prev.filter(h => h.id !== hiring.id));
    setSelectedHiring(null);
    alert(`Admissão de ${hiring.candidateName} concluída com sucesso! O colaborador agora consta na lista de Ativos.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para DP / RH
        </button>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Nova Contratação
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Processos de Contratação</h3>
              <p className="text-xs text-slate-500">Acompanhamento de admissões em andamento</p>
            </div>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar candidato..." 
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all w-full md:w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Candidato / Cargo</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">ASO</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Docs</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Início</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Integração</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hiringList.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{h.candidateName}</p>
                    <p className="text-xs text-slate-500">{h.role}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <button 
                        onClick={() => toggleAso(h.id)}
                        className={`p-1.5 rounded-lg transition-all ${h.asoDone ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-300'}`}
                      >
                        <Stethoscope className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center gap-1">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                        h.docsStatus === 'completo' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                        h.docsStatus === 'parcial' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                        'bg-rose-100 text-rose-700 border-rose-200'
                      }`}>
                        {h.docsStatus}
                      </span>
                      <span className="text-[9px] text-slate-400 font-medium">{h.docsSubmitted.length} docs entregues</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-700">{h.startDate}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <button 
                        onClick={() => toggleIntegration(h.id)}
                        className={`p-1.5 rounded-lg transition-all ${h.integrationDone ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-300'}`}
                      >
                        <Users className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setSelectedHiring(h)}
                        className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                        title="Ver Detalhes"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setShowLinkModal(h)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Solicitar Documentação"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detalhes da Contratação */}
      <AnimatePresence>
        {selectedHiring && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{selectedHiring.candidateName}</h3>
                    <p className="text-xs text-slate-500">{selectedHiring.role}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedHiring(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status Admissional</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-3">
                          <Stethoscope className={`w-4 h-4 ${selectedHiring.asoDone ? 'text-emerald-500' : 'text-slate-300'}`} />
                          <span className="text-sm font-medium text-slate-700">ASO Realizado</span>
                        </div>
                        <button 
                          onClick={() => toggleAso(selectedHiring.id)}
                          className={`w-10 h-5 rounded-full transition-all relative ${selectedHiring.asoDone ? 'bg-emerald-500' : 'bg-slate-300'}`}
                        >
                          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${selectedHiring.asoDone ? 'left-6' : 'left-1'}`} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-3">
                          <Users className={`w-4 h-4 ${selectedHiring.integrationDone ? 'text-blue-500' : 'text-slate-300'}`} />
                          <span className="text-sm font-medium text-slate-700">Integração Concluída</span>
                        </div>
                        <button 
                          onClick={() => toggleIntegration(selectedHiring.id)}
                          className={`w-10 h-5 rounded-full transition-all relative ${selectedHiring.integrationDone ? 'bg-blue-500' : 'bg-slate-300'}`}
                        >
                          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${selectedHiring.integrationDone ? 'left-6' : 'left-1'}`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Datas Importantes</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Início</p>
                        <p className="text-sm font-bold text-slate-900">{selectedHiring.startDate}</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Fim Experiência</p>
                        <p className="text-sm font-bold text-slate-900">{selectedHiring.probationEnd}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Documentação Admissionais</h4>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-600">Progresso</span>
                        <span className="text-xs font-bold text-emerald-600">{selectedHiring.docsSubmitted.length} / 8</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full" style={{ width: `${(selectedHiring.docsSubmitted.length / 8) * 100}%` }} />
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {selectedHiring.docsSubmitted.map((doc, i) => (
                          <div key={i} className="flex items-center gap-2 text-[11px] text-slate-600">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            {doc}
                          </div>
                        ))}
                        {selectedHiring.docsSubmitted.length < 8 && (
                          <p className="text-[10px] text-amber-600 font-medium mt-2 italic">Aguardando envio do restante pelo candidato...</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dados Financeiros / Transporte</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Vale Transporte (Diário)</p>
                        <p className="text-sm font-bold text-slate-900">{selectedHiring.transportValue ? `R$ ${parseFloat(selectedHiring.transportValue).toFixed(2)}` : 'Não informado'}</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Conta Bancária</p>
                        <p className="text-sm font-bold text-slate-900">
                          {selectedHiring.bankAccount ? (
                            `${selectedHiring.bankName} - Ag: ${selectedHiring.bankAgency} / CC: ${selectedHiring.bankAccount}`
                          ) : 'Não informado'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                <button 
                  onClick={() => setSelectedHiring(null)}
                  className="px-6 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-all"
                >
                  Fechar
                </button>
                <button 
                  onClick={() => handleCompleteAdmission(selectedHiring)}
                  className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all"
                >
                  Concluir Admissão
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Solicitar Documentação (Real Link) */}
      <AnimatePresence>
        {showLinkModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <LinkIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Solicitar Documentação</h3>
                  <p className="text-sm text-slate-500">Enviar link de admissão para {showLinkModal.candidateName}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 break-all">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Link de Admissão</p>
                  <code className="text-xs text-blue-600 font-mono">
                    {`${window.location.origin}/admissao/${showLinkModal.token}`}
                  </code>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/admissao/${showLinkModal.token}`);
                      alert('Link copiado!');
                    }}
                  >
                    <FileText className="w-4 h-4" />
                    Copiar Link
                  </button>
                  <button 
                    className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                    onClick={() => {
                      alert('Link enviado por WhatsApp/E-mail!');
                      setShowLinkModal(null);
                    }}
                  >
                    <Send className="w-4 h-4" />
                    Enviar Link
                  </button>
                </div>
              </div>

              <button 
                onClick={() => setShowLinkModal(null)}
                className="w-full py-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-all"
              >
                Cancelar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
