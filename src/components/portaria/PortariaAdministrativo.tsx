import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Send, 
  Phone, 
  BookOpen, 
  Play, 
  MessageSquare, 
  AlertCircle,
  ChevronRight,
  Info
} from 'lucide-react';

interface Props {
  onBack: () => void;
}

export const PortariaAdministrativo: React.FC<Props> = ({ onBack }) => {
  const [request, setRequest] = useState('');
  const [sent, setSent] = useState(false);

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setRequest('');
    }, 3000);
  };

  const emergencyContacts = [
    { name: 'Segurança Patrimonial (Central)', phone: '(11) 4004-0001', type: 'Interno' },
    { name: 'Ambulatório / Primeiros Socorros', phone: 'Ramal 222', type: 'Interno' },
    { name: 'Bombeiros', phone: '193', type: 'Externo' },
    { name: 'Polícia Militar', phone: '190', type: 'Externo' },
    { name: 'SAMU', phone: '192', type: 'Externo' },
  ];

  const procedures = [
    { id: '1', title: 'Procedimento de Entrada de Visitantes', duration: '2:30', type: 'video' },
    { id: '2', title: 'Protocolo de Emergência e Evacuação', duration: '5:15', type: 'video' },
    { id: '3', title: 'Manual de Uso do Sistema de Portaria', duration: 'PDF', type: 'doc' },
  ];

  return (
    <div className="space-y-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para Portaria
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Solicitações ao Administrativo */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Solicitações ao Administrativo</h3>
              <p className="text-xs text-slate-500">Informe necessidades ou problemas da portaria</p>
            </div>
          </div>

          <form onSubmit={handleSendRequest} className="space-y-4">
            <textarea 
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              placeholder="Descreva sua solicitação aqui (ex: falta de material, problema no portão, etc...)"
              rows={5}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
            />
            <button 
              type="submit"
              disabled={!request.trim() || sent}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                sent 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {sent ? (
                <>Solicitação Enviada!</>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Enviar Solicitação
                </>
              )}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          {/* Contatos de Emergência */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4 text-rose-500" />
              Contatos de Emergência
            </h3>
            <div className="space-y-3">
              {emergencyContacts.map((contact, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{contact.name}</p>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                      contact.type === 'Interno' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {contact.type}
                    </span>
                  </div>
                  <p className="text-sm font-black text-slate-900">{contact.phone}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Procedimentos e Vídeos */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-500" />
              Procedimentos e Treinamentos
            </h3>
            <div className="space-y-3">
              {procedures.map((proc) => (
                <div key={proc.id} className="group flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      proc.type === 'video' ? 'bg-rose-100' : 'bg-blue-100'
                    }`}>
                      {proc.type === 'video' ? <Play className="w-4 h-4 text-rose-600" /> : <Info className="w-4 h-4 text-blue-600" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{proc.title}</p>
                      <p className="text-[10px] text-slate-500 font-medium uppercase">{proc.duration}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
