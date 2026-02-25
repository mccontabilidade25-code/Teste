export type PDEXStatus = 'pendente_diretoria' | 'pendente_pagamento' | 'pago' | 'recusado';

export interface PDEXRequest {
  id: string;
  requester: string;
  description: string;
  amount: number;
  category: string;
  status: PDEXStatus;
  createdAt: string;
  approvedAt?: string;
  paidAt?: string;
}

export type ModuleId = 
  | 'portaria' 
  | 'limpeza' 
  | 'manutencao' 
  | 'documentos' 
  | 'eventos' 
  | 'dp' 
  | 'financeiro' 
  | 'fiscal' 
  | 'contabil' 
  | 'ti'
  | 'juridico'
  | 'indicadores'
  | 'veiculos'
  | 'atividades_equipe'
  | 'arquivos'
  | 'refeitorio'
  | 'dashboard';

export interface ModuleInfo {
  id: ModuleId;
  label: string;
  icon: string;
  color: string;
}

export interface DashboardStat {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface RecentActivity {
  id: string;
  module: ModuleId;
  description: string;
  timestamp: string;
  user: string;
}
