import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  UserPlus, 
  Upload, 
  CheckCircle2, 
  FileText, 
  CreditCard, 
  Bus, 
  Send,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useParams } from 'react-router-dom';

export const AdmissionPortal: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    bankName: '',
    bankAgency: '',
    bankAccount: '',
    transportValue: '',
  });
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    rg: null,
    cpf: null,
    residencia: null,
    titulo: null,
    reservista: null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({ ...prev, [key]: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would upload files to S3/Cloudinary and save data to DB
    setSubmitted(true);
    
    // Simulate saving to "system" for the demo
    const uploadedDocs = Object.entries(files)
      .filter(([_, file]) => file !== null)
      .map(([key, file]) => {
        const f = file as File;
        return {
          type: key,
          name: f.name,
          label: [
            { id: 'rg', label: 'RG' },
            { id: 'cpf', label: 'CPF' },
            { id: 'residencia', label: 'Comprovante de Residência' },
            { id: 'titulo', label: 'Título de Eleitor' },
            { id: 'reservista', label: 'Certificado de Reservista' },
          ].find(d => d.id === key)?.label || key
        };
      });

    const admissionData = {
      ...formData,
      docsCount: uploadedDocs.length,
      uploadedDocs,
      submittedAt: new Date().toISOString(),
      token
    };
    localStorage.setItem(`admission_${token}`, JSON.stringify(admissionData));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center space-y-6 border border-slate-100"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Documentação Recebida!</h2>
          <p className="text-slate-500">
            Obrigado, <strong>{formData.fullName}</strong>. Seus dados e documentos foram enviados com sucesso para o nosso RH.
          </p>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-600 text-left">
            <p className="font-bold mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Próximos Passos:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Análise da documentação pelo RH</li>
              <li>Confirmação da data de início</li>
              <li>Agendamento da Integração</li>
            </ul>
          </div>
          <p className="text-xs text-slate-400 italic">Você já pode fechar esta aba.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/20 mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-900">Portal de Admissão</h1>
          <p className="text-slate-500">Seja bem-vindo! Por favor, preencha seus dados para iniciarmos sua jornada conosco.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-100">
            {[
              { step: 1, label: 'Dados Pessoais', icon: FileText },
              { step: 2, label: 'Dados Bancários', icon: CreditCard },
              { step: 3, label: 'Documentos', icon: Upload },
            ].map((s) => (
              <button
                key={s.step}
                onClick={() => setStep(s.step)}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  step === s.step ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <s.icon className="w-4 h-4" />
                <span className="hidden md:inline">{s.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 ml-1">Nome Completo</label>
                    <input 
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 ml-1">CPF</label>
                    <input 
                      required
                      name="cpf"
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 ml-1 flex items-center gap-2">
                    <Bus className="w-3 h-3" />
                    Valor de Transporte Diário (Opcional)
                  </label>
                  <input 
                    name="transportValue"
                    type="number"
                    step="0.01"
                    placeholder="R$ 0,00"
                    value={formData.transportValue}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
                <button 
                  type="button" 
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all"
                >
                  Próxima Etapa
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 ml-1">Banco</label>
                  <input 
                    required
                    name="bankName"
                    placeholder="Ex: Itaú, Bradesco, Nubank..."
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 ml-1">Agência</label>
                    <input 
                      required
                      name="bankAgency"
                      value={formData.bankAgency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 ml-1">Conta com Dígito</label>
                    <input 
                      required
                      name="bankAccount"
                      value={formData.bankAccount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all"
                  >
                    Voltar
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setStep(3)}
                    className="flex-2 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all"
                  >
                    Próxima Etapa
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Envie fotos ou PDFs legíveis dos seus documentos. Certifique-se de que todos os dados estão visíveis.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'rg', label: 'RG (Frente e Verso)' },
                    { id: 'cpf', label: 'CPF' },
                    { id: 'residencia', label: 'Comprovante de Residência' },
                    { id: 'titulo', label: 'Título de Eleitor' },
                    { id: 'reservista', label: 'Certificado de Reservista' },
                  ].map((doc) => (
                    <div key={doc.id} className="relative group">
                      <input 
                        type="file" 
                        id={doc.id}
                        onChange={(e) => handleFileChange(e, doc.id)}
                        className="hidden"
                      />
                      <label 
                        htmlFor={doc.id}
                        className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                          files[doc.id] 
                            ? 'bg-emerald-50 border-emerald-200' 
                            : 'bg-slate-50 border-slate-200 hover:border-emerald-400 hover:bg-white'
                        }`}
                      >
                        {files[doc.id] ? (
                          <>
                            <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-2" />
                            <span className="text-[10px] font-bold text-emerald-700 uppercase truncate max-w-full px-2">
                              {files[doc.id]?.name}
                            </span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-slate-400 mb-2 group-hover:text-emerald-500 transition-colors" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase">{doc.label}</span>
                          </>
                        )}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all"
                  >
                    Voltar
                  </button>
                  <button 
                    type="submit"
                    className="flex-2 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Finalizar Admissão
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </div>

        <div className="text-center">
          <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
            <ShieldCheck className="w-3 h-3" />
            Seus dados estão protegidos de acordo com a LGPD.
          </p>
        </div>
      </div>
    </div>
  );
};
