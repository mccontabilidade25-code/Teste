import React from 'react';
import { NavLink } from 'react-router-dom';
import { MODULES, getIcon } from '../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-sm" />
          </div>
          IndusControl
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-medium uppercase tracking-wider">Sistema Industrial</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
        {MODULES.map((module) => {
          const Icon = getIcon(module.icon);
          return (
            <NavLink
              key={module.id}
              to={module.id === 'dashboard' ? '/' : `/${module.id}`}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-slate-100 text-slate-900" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              <Icon className={cn("w-4 h-4", module.color)} />
              {module.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">Admin User</p>
            <p className="text-xs text-slate-500 truncate">admin@factory.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
