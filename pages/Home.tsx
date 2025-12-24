
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Input } from '../components/UI/Input';
import { Button } from '../components/UI/Button';
import { useApp } from '../context/AppContext';
import { DocumentType, FormData, COUNTRY_CODES } from '../types';

export const Home: React.FC = () => {
  const { setFormData, state } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>(state.formData || {
    documentType: 'DNI',
    documentNumber: '',
    countryCode: '+51',
    phoneNumber: '',
    birthDate: '',
    email: '',
    privacyAccepted: false,
    marketingAccepted: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    // Validación DNI Estricta: 8 dígitos
    if (form.documentType === 'DNI') {
      if (form.documentNumber.length !== 8) {
        newErrors.documentNumber = 'Debe tener 8 dígitos';
      }
    } else if (!form.documentNumber) {
      newErrors.documentNumber = 'Requerido';
    }

    // Validación Celular: 9 dígitos
    if (!form.phoneNumber || form.phoneNumber.length !== 9) {
      newErrors.phoneNumber = 'Debe tener 9 dígitos';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!form.birthDate) newErrors.birthDate = 'Requerido';
    if (!form.privacyAccepted) newErrors.privacyAccepted = 'Obligatorio';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setFormData(form);
      navigate('/ruleta');
    }
  };

  return (
    <Layout>
      <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-2xl flex flex-col gap-6 transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black text-[#0B1B3B] tracking-tight">REGISTRO</h1>
          <p className="text-[#667085] text-[11px] font-medium">Ingresa tus datos para participar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
             <Input 
                label="Tipo" 
                as="select" 
                containerClassName="w-[35%]"
                value={form.documentType}
                onChange={e => setForm({...form, documentType: e.target.value as DocumentType})}
              >
                <option value="DNI">DNI</option>
                <option value="CE">CE</option>
                <option value="Pasaporte">PAS</option>
              </Input>
              <Input 
                label="N° Documento" 
                type="tel"
                maxLength={form.documentType === 'DNI' ? 8 : 12}
                containerClassName="w-[65%]"
                placeholder="12345678"
                value={form.documentNumber}
                error={errors.documentNumber}
                onChange={e => setForm({...form, documentNumber: e.target.value.replace(/\D/g, '')})}
              />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black text-[#667085] uppercase tracking-widest ml-1">Celular</label>
            <div className="flex gap-2">
              <select 
                className="w-24 px-2 py-3 rounded-xl border-2 border-[#F3F6FB] bg-white text-[#0B1B3B] text-xs font-bold focus:border-[#1E88E5] outline-none"
                value={form.countryCode}
                onChange={e => setForm({...form, countryCode: e.target.value})}
              >
                {COUNTRY_CODES.map(c => (
                  <option key={c.code} value={c.code}>{c.label} {c.code}</option>
                ))}
              </select>
              <input 
                type="tel"
                maxLength={9}
                className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all outline-none bg-white text-[#0B1B3B] text-sm placeholder:text-[#667085]/20
                  ${errors.phoneNumber ? 'border-red-400' : 'border-[#F3F6FB] focus:border-[#1E88E5]'}`}
                placeholder="999888777"
                value={form.phoneNumber}
                onChange={e => setForm({...form, phoneNumber: e.target.value.replace(/\D/g, '')})}
              />
            </div>
            {errors.phoneNumber && <span className="text-[10px] text-red-500 ml-1 font-bold">{errors.phoneNumber}</span>}
          </div>

          <Input 
            label="Fecha de Nacimiento" 
            type="date"
            value={form.birthDate}
            error={errors.birthDate}
            onChange={e => setForm({...form, birthDate: e.target.value})}
          />

          <Input 
            label="Email" 
            type="email"
            placeholder="correo@ejemplo.com"
            value={form.email}
            error={errors.email}
            onChange={e => setForm({...form, email: e.target.value})}
          />

          <div className="space-y-3 pt-1">
            {[
              { id: 'privacy', label: 'Acepto la Política de Privacidad', checked: form.privacyAccepted, setter: (val: boolean) => setForm({...form, privacyAccepted: val}), required: true },
              { id: 'marketing', label: 'Autorizo el tratamiento de datos comerciales', checked: form.marketingAccepted, setter: (val: boolean) => setForm({...form, marketingAccepted: val}), required: false }
            ].map((opt) => (
              <label key={opt.id} className="flex items-start gap-2.5 p-0.5 group cursor-pointer">
                <div className="relative flex items-center h-4 mt-0.5">
                  <input 
                    type="checkbox" 
                    className="w-3.5 h-3.5 rounded border border-[#D1D5DB] text-[#1E88E5] focus:ring-0 focus:ring-offset-0 cursor-pointer transition-all"
                    checked={opt.checked}
                    onChange={e => opt.setter(e.target.checked)}
                  />
                </div>
                <span className="text-[10.5px] text-[#667085] leading-snug select-none font-medium">
                  {opt.label} {opt.required && <Link to="/privacidad" className="text-[#1E88E5] font-black hover:underline">(Obligatorio)</Link>}
                </span>
              </label>
            ))}
          </div>

          <Button 
            fullWidth 
            type="submit" 
            className="mt-3 uppercase tracking-widest py-3.5 text-[11px] font-black shadow-xl"
            disabled={!form.privacyAccepted}
          >
            Siguiente
          </Button>
        </form>
      </div>
    </Layout>
  );
};
