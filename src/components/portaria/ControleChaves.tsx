import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Key, 
  ArrowLeft, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  ShieldAlert,
  Shield,
  X,
  User,
  Info
} from 'lucide-react';

interface KeyRecord {
  id: string;
  keyName: string;
  keyNumber: string;
  sector: string;
  permissions: string;
  securityLevel: 'baixo' | 'medio' | 'alto';
  timeDelivered?: string;
  timeReturned?: string;
  status: 'disponivel' | 'em_uso' | 'manutencao';
  responsible?: string;
}

const INITIAL_KEYS: KeyRecord[] = [
  { 
    id: '1', 
    keyName: 'Almoxarifado Central', 
    keyNumber: 'CH-001',
    sector: 'Logística', 
    permissions: 'Gerentes, Supervisores', 
    securityLevel: 'alto', 
    timeDelivered: '08:15', 
    status: 'em_uso',
    responsible: 'Ricardo Santos'
  },
  { 
    id: '2', 
    keyName: 'Sala de Reuniões A', 
    keyNumber: 'CH-012',
    sector: 'Administrativo', 
    permissions: 'Todos os colaboradores', 
    securityLevel: 'baixo', 
    timeReturned: '11:30', 
    status: 'disponivel' 
  },
  { 
    id: '3', 
    keyName: 'TI - Servidores', 
    keyNumber: 'CH-005',
    sector: 'TI', 
    permissions: 'Equipe TI Nível 3', 
    securityLevel: 'alto', 
    status: 'disponivel' 
  },
  { 
    id: '4', 
    keyName: 'Copa / Cozinha', 
    keyNumber: 'CH-020',
    sector: 'Serviços Gerais', 
    permissions: 'Equipe de Limpeza', 
    securityLevel: 'baixo', 
    timeDelivered: '06:00', 
    timeReturned: '14:00', 
    status: 'disponivel' 
  },
  { 
    id: '5', 
    keyName: 'Depósito de Químicos', 
    keyNumber: 'CH-008',
    sector: 'Produção', 
    permissions: 'Técnicos de Segurança', 
    securityLevel: 'medio', 
    status: 'manutencao' 
  },
];

interface Props {
  onBack: () => void;
}

export const ControleChaves: React.FC<Props> = ({ onBack }) => {
  const [keys, setKeys] = useState<KeyRecord[]>(INITIAL_KEYS);
  const [selectedKey, setSelectedKey] = useState<KeyRecord | null>(null);
  const [deliveryForm, setDeliveryForm] = useState({ responsible: '', time: '' });
  const [viewMode, setViewMode] = useState<'entregas' | 'permissoes'>('entregas');
  const [showAddPermission, setShowAddPermission] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // Simulating admin role
  const [newPermission, setNewPermission] = useState({
    sector: '',
    keyNumber: '',
    permissions: '',
    keyName: '',
    securityLevel: 'baixo' as KeyRecord['securityLevel']
  });

  const getStatusBadge = (status: KeyRecord['status']) => {
    switch (status) {
      case 'disponivel':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 uppercase"><CheckCircle2 className="w-3 h-3" /> Disponível</span>;
      case 'em_uso':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200 uppercase"><Clock className="w-3 h-3" /> Em Uso</span>;
      case 'manutencao':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200 uppercase"><AlertCircle className="w-3 h-3" /> Manutenção</span>;
    }
  };

  const getSecurityIcon = (level: KeyRecord['securityLevel']) => {
    switch (level) {
      case 'alto': return <ShieldAlert className="w-4 h-4 text-rose-500" />;
      case 'medio': return <ShieldCheck className="w-4 h-4 text-amber-500" />;
      case 'baixo': return <Shield className="w-4 h-4 text-emerald-500" />;
    }
  };

  const handleRegisterDelivery = () => {
    if (!selectedKey || !deliveryForm.responsible || !deliveryForm.time) return;

    setKeys(prev => prev.map(k => 
      k.id === selectedKey.id 
        ? { ...k, status: 'em_uso', responsible: deliveryForm.responsible, timeDelivered: deliveryForm.time, timeReturned: undefined } 
        : k
    ));
    setSelectedKey(null);
    setDeliveryForm({ responsible: '', time: '' });
    setViewMode('entregas');
  };

  const handleAddPermission = () => {
    if (!newPermission.sector || !newPermission.keyNumber || !newPermission.permissions) return;

    const newKey: KeyRecord = {
      id: Math.random().toString(36).substr(2, 9),
      keyName: newPermission.keyName || `Chave ${newPermission.keyNumber}`,
      keyNumber: newPermission.keyNumber,
      sector: newPermission.sector,
      permissions: newPermission.permissions,
      securityLevel: newPermission.securityLevel,
      status: 'disponivel'
    };

    setKeys(prev => [...prev, newKey]);
    setShowAddPermission(false);
    setNewPermission({
      sector: '',
      keyNumber: '',
      permissions: '',
      keyName: '',
      securityLevel: 'baixo'
    });
  };

  const filteredKeys = viewMode === 'entregas' 
    ? keys.filter(k => k.status === 'em_uso')
    : keys;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Portaria
        </button>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-lg mr-2">
            <button 
              onClick={() => setIsAdmin(true)}
              className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${isAdmin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
            >
              ADMIN
            </button>
            <button 
              onClick={() => setIsAdmin(false)}
              className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${!isAdmin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
            >
              PORTEIRO
            </button>
          </div>
          <button 
            onClick={() => setViewMode(viewMode === 'entregas' ? 'permissoes' : 'entregas')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
              viewMode === 'permissoes' 
                ? 'bg-amber-100 text-amber-700 border-amber-200' 
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            {viewMode === 'entregas' ? 'Ver Permissões' : 'Ver Entregas Ativas'}
          </button>
          {viewMode === 'permissoes' && isAdmin && (
            <button 
              onClick={() => setShowAddPermission(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Adicionar Permissão
            </button>
          )}
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
            <Plus className="w-4 h-4" />
            Nova Entrega/Retirada
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${viewMode === 'entregas' ? 'bg-blue-50' : 'bg-amber-50'}`}>
              {viewMode === 'entregas' ? <Clock className="w-5 h-5 text-blue-600" /> : <Key className="w-5 h-5 text-amber-600" />}
            </div>
            <div>
              <h3 className="font-bold text-slate-900">
                {viewMode === 'entregas' ? 'Entregas de Chaves Ativas' : 'Liberações de Acessos'}
              </h3>
              <p className="text-xs text-slate-500">
                {viewMode === 'entregas' ? 'Monitoramento de chaves em uso no momento' : 'Controle de acesso a setores restritos'}
              </p>
            </div>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar chave ou setor..." 
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-full md:w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Chave / Setor</th>
                {viewMode === 'permissoes' ? (
                  <>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Pessoas com Liberação / Permissões</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Nível Seg.</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Nível Seg.</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Entregue</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Situação</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Ações</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredKeys.length > 0 ? (
                filteredKeys.map((k) => (
                  <tr key={k.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
                          {k.keyNumber}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{k.keyName}</p>
                          <p className="text-xs text-slate-500">{k.sector}</p>
                        </div>
                      </div>
                    </td>
                    {viewMode === 'permissoes' ? (
                      <>
                        <td className="px-6 py-4">
                          <p className="text-xs text-slate-600 leading-relaxed">{k.permissions}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col items-center gap-1">
                            {getSecurityIcon(k.securityLevel)}
                            <span className="text-[10px] font-bold uppercase text-slate-400">{k.securityLevel}</span>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4">
                          <div className="flex flex-col items-center gap-1">
                            {getSecurityIcon(k.securityLevel)}
                            <span className="text-[10px] font-bold uppercase text-slate-400">{k.securityLevel}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {k.timeDelivered ? (
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-slate-900">{k.timeDelivered}</p>
                              {k.responsible && <p className="text-[10px] text-slate-400 font-medium uppercase">{k.responsible}</p>}
                            </div>
                          ) : (
                            <span className="text-slate-300">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(k.status)}
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => setSelectedKey(k)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold hover:bg-amber-100 transition-all border border-amber-100"
                          >
                            <Info className="w-3 h-3" />
                            Ver Detalhes
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={viewMode === 'permissoes' ? 3 : 5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
                        <Key className="w-6 h-6 text-slate-300" />
                      </div>
                      <p className="text-sm font-medium text-slate-500">Nenhuma entrega ativa no momento.</p>
                      <button 
                        onClick={() => setViewMode('permissoes')}
                        className="text-xs font-bold text-indigo-600 hover:underline"
                      >
                        Ver lista completa de chaves
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Permissões e Entrega */}
      <AnimatePresence>
        {selectedKey && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Key className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{selectedKey.keyName}</h3>
                    <p className="text-xs text-slate-500">{selectedKey.sector}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedKey(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3" />
                    Permissões de Acesso
                  </h4>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {selectedKey.permissions}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    Registrar Entrega de Chave
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 ml-1">Responsável</label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="text" 
                          value={deliveryForm.responsible}
                          onChange={(e) => setDeliveryForm(prev => ({ ...prev, responsible: e.target.value }))}
                          placeholder="Nome do colaborador"
                          className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 ml-1">Horário</label>
                      <div className="relative">
                        <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="time" 
                          value={deliveryForm.time}
                          onChange={(e) => setDeliveryForm(prev => ({ ...prev, time: e.target.value }))}
                          className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleRegisterDelivery}
                    disabled={!deliveryForm.responsible || !deliveryForm.time}
                    className="w-full py-3 bg-amber-600 text-white rounded-xl font-bold text-sm hover:bg-amber-700 transition-all shadow-lg shadow-amber-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Confirmar Entrega
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Adicionar Permissão */}
      <AnimatePresence>
        {showAddPermission && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-emerald-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-slate-900">Nova Permissão de Acesso</h3>
                </div>
                <button 
                  onClick={() => setShowAddPermission(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 ml-1">Setor / Sala</label>
                    <input 
                      type="text" 
                      value={newPermission.sector}
                      onChange={(e) => setNewPermission(prev => ({ ...prev, sector: e.target.value }))}
                      placeholder="Ex: Sala 102 - RH"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 ml-1">Número da Chave</label>
                    <input 
                      type="text" 
                      value={newPermission.keyNumber}
                      onChange={(e) => setNewPermission(prev => ({ ...prev, keyNumber: e.target.value }))}
                      placeholder="Ex: CH-045"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 ml-1">Nome Descritivo (Opcional)</label>
                  <input 
                    type="text" 
                    value={newPermission.keyName}
                    onChange={(e) => setNewPermission(prev => ({ ...prev, keyName: e.target.value }))}
                    placeholder="Ex: Chave Reserva TI"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 ml-1">Pessoas com Liberação</label>
                  <textarea 
                    value={newPermission.permissions}
                    onChange={(e) => setNewPermission(prev => ({ ...prev, permissions: e.target.value }))}
                    placeholder="Liste os nomes ou cargos autorizados..."
                    rows={3}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 ml-1">Nível de Segurança</label>
                  <div className="flex gap-2">
                    {(['baixo', 'medio', 'alto'] as const).map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setNewPermission(prev => ({ ...prev, securityLevel: level }))}
                        className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase border transition-all ${
                          newPermission.securityLevel === level
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleAddPermission}
                  disabled={!newPermission.sector || !newPermission.keyNumber || !newPermission.permissions}
                  className="w-full mt-4 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Salvar Permissão
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
