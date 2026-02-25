import { 
  LayoutDashboard, 
  Shield, 
  Droplets, 
  Wrench, 
  FileText, 
  Calendar, 
  Users, 
  DollarSign, 
  Receipt, 
  Calculator, 
  Monitor,
  Car,
  UsersRound,
  FolderOpen,
  Utensils,
  Scale,
  BarChart3
} from 'lucide-react';
import { ModuleInfo } from './types';

export const MODULES: ModuleInfo[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', color: 'text-slate-600' },
  { id: 'portaria', label: 'Portaria', icon: 'Shield', color: 'text-blue-600' },
  { id: 'refeitorio', label: 'Refeitório', icon: 'Utensils', color: 'text-orange-500' },
  { id: 'limpeza', label: 'Limpeza', icon: 'Droplets', color: 'text-cyan-600' },
  { id: 'manutencao', label: 'Manutenção', icon: 'Wrench', color: 'text-orange-600' },
  { id: 'documentos', label: 'Documentos', icon: 'FileText', color: 'text-amber-600' },
  { id: 'eventos', label: 'Eventos', icon: 'Calendar', color: 'text-purple-600' },
  { id: 'dp', label: 'DP / RH', icon: 'Users', color: 'text-rose-600' },
  { id: 'financeiro', label: 'Financeiro', icon: 'DollarSign', color: 'text-emerald-600' },
  { id: 'fiscal', label: 'Fiscal', icon: 'Receipt', color: 'text-indigo-600' },
  { id: 'contabil', label: 'Contábil', icon: 'Calculator', color: 'text-teal-600' },
  { id: 'ti', label: 'TI', icon: 'Monitor', color: 'text-slate-800' },
  { id: 'juridico', label: 'Jurídico', icon: 'Scale', color: 'text-slate-700' },
  { id: 'indicadores', label: 'Indicadores', icon: 'BarChart3', color: 'text-emerald-600' },
  { id: 'veiculos', label: 'Veículos', icon: 'Car', color: 'text-blue-500' },
  { id: 'atividades_equipe', label: 'Atividades Equipe', icon: 'UsersRound', color: 'text-indigo-500' },
  { id: 'arquivos', label: 'Arquivos', icon: 'FolderOpen', color: 'text-slate-700' },
];

export const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'LayoutDashboard': return LayoutDashboard;
    case 'Shield': return Shield;
    case 'Droplets': return Droplets;
    case 'Wrench': return Wrench;
    case 'FileText': return FileText;
    case 'Calendar': return Calendar;
    case 'Users': return Users;
    case 'DollarSign': return DollarSign;
    case 'Receipt': return Receipt;
    case 'Calculator': return Calculator;
    case 'Monitor': return Monitor;
    case 'Car': return Car;
    case 'UsersRound': return UsersRound;
    case 'FolderOpen': return FolderOpen;
    case 'Utensils': return Utensils;
    case 'Scale': return Scale;
    case 'BarChart3': return BarChart3;
    default: return LayoutDashboard;
  }
};
