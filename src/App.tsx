/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ModuleView } from './components/ModuleView';
import { FinanceiroPDEX } from './components/FinanceiroPDEX';
import { PortariaView } from './components/PortariaView';
import { LimpezaView } from './components/LimpezaView';
import { ManutencaoView } from './components/ManutencaoView';
import { DocumentosView } from './components/DocumentosView';
import { EventosView } from './components/EventosView';
import { DPView } from './components/DPView';
import { FiscalView } from './components/FiscalView';
import { ContabilView } from './components/ContabilView';
import { TIView } from './components/TIView';
import { VeiculosView } from './components/VeiculosView';
import { AtividadesEquipeView } from './components/AtividadesEquipeView';
import { ArquivosView } from './components/ArquivosView';
import { RefeitorioView } from './components/RefeitorioView';
import { AdmissionPortal } from './components/AdmissionPortal';
import { JuridicoView } from './components/JuridicoView';
import { IndicadoresView } from './components/IndicadoresView';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Admission Route */}
        <Route path="/admissao/:token" element={<AdmissionPortal />} />

        {/* Protected App Routes */}
        <Route path="/*" element={
          <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto w-full">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/financeiro" element={<FinanceiroPDEX />} />
                <Route path="/portaria" element={<PortariaView />} />
                <Route path="/refeitorio" element={<RefeitorioView />} />
                <Route path="/limpeza" element={<LimpezaView />} />
                <Route path="/manutencao" element={<ManutencaoView />} />
                <Route path="/documentos" element={<DocumentosView />} />
                <Route path="/eventos" element={<EventosView />} />
                <Route path="/dp" element={<DPView />} />
                <Route path="/fiscal" element={<FiscalView />} />
                <Route path="/contabil" element={<ContabilView />} />
                <Route path="/ti" element={<TIView />} />
                <Route path="/juridico" element={<JuridicoView />} />
                <Route path="/indicadores" element={<IndicadoresView />} />
                <Route path="/veiculos" element={<VeiculosView />} />
                <Route path="/atividades_equipe" element={<AtividadesEquipeView />} />
                <Route path="/arquivos" element={<ArquivosView />} />
                <Route path="/:moduleId" element={<ModuleView />} />
              </Routes>
            </main>
          </div>
        } />
      </Routes>
    </Router>
  );
}
