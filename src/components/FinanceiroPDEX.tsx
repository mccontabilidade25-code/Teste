import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  DollarSign,
  UserCheck,
  CreditCard,
  MoreVertical,
  X
} from 'lucide-react';
import { PDEXRequest, PDEXStatus } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const INITIAL_REQUESTS: PDEXRequest[] = [
  {
    id: 'PDEX-001',
    requester: 'Admin Administrativo',
    description: 'Compra de suprimentos de escritório - Lote Q1',
    amount: 1250.00,
    category: 'Suprimentos',
    status: 'pendente_diretoria',
    createdAt: '2026-02-23 08:30',
  },
  {
    id: 'PDEX-002',
    requester: 'Admin Administrativo',
    description: 'Reparo emergencial ar-condicionado bloco C',
    amount: 3400.00,
    category: 'Manutenção',
    status: 'pendente_pagamento',
    createdAt: '2026-02-22 14:15',
    approvedAt: '2026-02-22 16:00',
  },
  {
    id: 'PDEX-003',
    requester: 'Admin Administrativo',
    description: 'Renovação licença software TI',
    amount: 850.00,
    category: 'TI',
    status: 'pago',
    createdAt: '2026-02-20 10:00',
    approvedAt: '2026-02-20 11:30',
    paidAt: '2026-02-21 09:00',
  }
];

export const FinanceiroPDEX: React.FC = () => {
  const [requests, setRequests] = useState<PDEXRequest[]>(INITIAL_REQUESTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    description: '',
    amount: '',
    category: 'Geral'
  });

  const getStatusConfig = (status: PDEXStatus) => {
    switch (status) {
      case 'pendente_diretoria':
        return { label: 'Aguardando Diretor', color: 'bg-amber-100 text-amber-700', icon: UserCheck };
      case 'pendente_pagamento':
        return { label: 'Aguardando Pagamento', color: 'bg-blue-100 text-blue-700', icon: CreditCard };
      case 'pago':
        return { label: 'Pago', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 };
      case 'recusado':
        return { label: 'Recusado', color: 'bg-rose-100 text-rose-700', icon: X };
      default:
        return { label: 'Pendente', color: 'bg-slate-100 text-slate-700', icon: Clock };
    }
  };

  const handleAddRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const request: PDEXRequest = {
      id: `PDEX-00${requests.length + 1}`,
      requester: 'Admin Administrativo',
      description: newRequest.description,
      amount: parseFloat(newRequest.amount),
      category: newRequest.category,
      status: 'pendente_diretoria',
      createdAt: new Date().toLocaleString(),
    };
    setRequests([request, ...requests]);
    setIsModalOpen(false);
    setNewRequest({ description: '', amount: '', category: 'Geral' });
  };

  const updateStatus = (id: string, nextStatus: PDEXStatus) => {
    setRequests(requests.map(req => {
      if (req.id === id) {
        const updated = { ...req, status: nextStatus };
        if (nextStatus === 'pendente_pagamento') updated.approvedAt = new Date().toLocaleString();
        if (nextStatus === 'pago') updated.paidAt = new Date().toLocaleString();
        return updated;
      }
      return req;
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Financeiro - PDEX</h2>
          <p className="text-slate-500">Controle de solicitações de despesas administrativas.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nova Solicitação
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Pendente Direção</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            R$ {requests.filter(r => r.status === 'pendente_diretoria').reduce((acc, r) => acc + r.amount, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Pendente Pagamento</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            R$ {requests.filter(r => r.status === 'pendente_pagamento').reduce((acc, r) => acc + r.amount, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Pago (Mês)</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            R$ {requests.filter(r => r.status === 'pago').reduce((acc, r) => acc + r.amount, 0).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar solicitações..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-slate-200 outline-none"
            />
          </div>
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-3">ID / Data</th>
                <th className="px-6 py-3">Descrição / Categoria</th>
                <th className="px-6 py-3">Valor</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map((req) => {
                const config = getStatusConfig(req.status);
                const StatusIcon = config.icon;
                return (
                  <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-mono text-slate-900 font-medium">{req.id}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{req.createdAt}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{req.description}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{req.category}</p>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      R$ {req.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase", config.color)}>
                        <StatusIcon className="w-3 h-3" />
                        {config.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {req.status === 'pendente_diretoria' && (
                          <button 
                            onClick={() => updateStatus(req.id, 'pendente_pagamento')}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Aprovar (Diretor)"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        {req.status === 'pendente_pagamento' && (
                          <button 
                            onClick={() => updateStatus(req.id, 'pago')}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Confirmar Pagamento"
                          >
                            <DollarSign className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nova Solicitação */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Nova Solicitação PDEX</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleAddRequest} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
                  <textarea 
                    required
                    value={newRequest.description}
                    onChange={e => setNewRequest({...newRequest, description: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-200 outline-none min-h-[100px]"
                    placeholder="Descreva a necessidade da despesa..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Valor (R$)</label>
                    <input 
                      required
                      type="number"
                      step="0.01"
                      value={newRequest.amount}
                      onChange={e => setNewRequest({...newRequest, amount: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-200 outline-none"
                      placeholder="0,00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Categoria</label>
                    <select 
                      value={newRequest.category}
                      onChange={e => setNewRequest({...newRequest, category: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-200 outline-none"
                    >
                      <option>Geral</option>
                      <option>Suprimentos</option>
                      <option>Manutenção</option>
                      <option>TI</option>
                      <option>Marketing</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
                  >
                    Enviar Solicitação
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
