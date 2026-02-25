import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  ArrowLeft, 
  Search, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  CreditCard, 
  FileText,
  X,
  CheckCircle2,
  MoreVertical,
  Download
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  role: string;
  startDate: string;
  status: 'Ativo' | 'Afastado' | 'Férias';
  documents: string[];
  bankInfo: {
    name: string;
    agency: string;
    account: string;
  };
  transportValue?: string;
  email?: string;
  phone?: string;
}

interface Props {
  onBack: () => void;
}

export const ColaboradoresAtivosView: React.FC<Props> = ({ onBack }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('colaboradores_ativos');
    if (saved) {
      setEmployees(JSON.parse(saved));
    } else {
      // Default data if none exists
      const defaultData: Employee[] = [
        {
          id: '101',
          name: 'Ricardo Santos',
          role: 'Gerente de Produção',
          startDate: '15/01/2024',
          status: 'Ativo',
          documents: ['RG', 'CPF', 'Residência', 'Título'],
          bankInfo: { name: 'Itaú', agency: '0001', account: '12345-6' },
          email: 'ricardo.santos@empresa.com',
          phone: '(11) 98888-7777'
        },
        {
          id: '102',
          name: 'Ana Paula Lima',
          role: 'Analista de RH',
          startDate: '02/02/2024',
          status: 'Ativo',
          documents: ['RG', 'CPF', 'Residência'],
          bankInfo: { name: 'Bradesco', agency: '1234', account: '98765-4' },
          email: 'ana.lima@empresa.com',
          phone: '(11) 97777-6666'
        }
      ];
      setEmployees(defaultData);
      localStorage.setItem('colaboradores_ativos', JSON.stringify(defaultData));
    }
  }, []);

  const filteredEmployees = employees.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Colaboradores Ativos</h3>
              <p className="text-xs text-slate-500">Gestão de funcionários em atividade</p>
            </div>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar colaborador..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-full md:w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Colaborador</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Cargo</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Admissão</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
                        {e.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <p className="text-sm font-bold text-slate-900">{e.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600">{e.role}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600">{e.startDate}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                      e.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                      e.status === 'Férias' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                      'bg-rose-100 text-rose-700 border-rose-200'
                    }`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedEmployee(e)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detalhes do Colaborador */}
      <AnimatePresence>
        {selectedEmployee && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xl">
                    {selectedEmployee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{selectedEmployee.name}</h3>
                    <p className="text-sm text-slate-500">{selectedEmployee.role}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedEmployee(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Informações de Contato</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Mail className="w-4 h-4 text-slate-400" />
                        {selectedEmployee.email || 'Não informado'}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Phone className="w-4 h-4 text-slate-400" />
                        {selectedEmployee.phone || 'Não informado'}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        Admitido em {selectedEmployee.startDate}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dados Bancários</h4>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-bold text-slate-900">{selectedEmployee.bankInfo.name}</span>
                      </div>
                      <p className="text-xs text-slate-500 ml-7">
                        Ag: {selectedEmployee.bankInfo.agency} / CC: {selectedEmployee.bankInfo.account}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Documentos Anexados</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedEmployee.documents.map((doc, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group/doc">
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4 text-blue-500" />
                            <span className="text-xs font-medium text-slate-700">{doc}</span>
                          </div>
                          <button className="p-1.5 text-slate-400 hover:text-blue-600 opacity-0 group-hover/doc:opacity-100 transition-all">
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      {selectedEmployee.documents.length === 0 && (
                        <p className="text-xs text-slate-400 italic">Nenhum documento anexado.</p>
                      )}
                    </div>
                  </div>

                  {selectedEmployee.transportValue && (
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Benefícios</h4>
                      <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                        <p className="text-[10px] text-emerald-600 font-bold uppercase mb-1">Vale Transporte</p>
                        <p className="text-sm font-bold text-emerald-900">R$ {parseFloat(selectedEmployee.transportValue).toFixed(2)} / dia</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                <button 
                  onClick={() => setSelectedEmployee(null)}
                  className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all"
                >
                  Fechar Registro
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
