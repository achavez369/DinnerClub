
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
    if (form.documentType === 'DNI' && form.documentNumber.length !== 8) newErrors.documentNumber = 'DNI inválido';
    if (!form.phoneNumber || form.phoneNumber.length !== 9) newErrors.phoneNumber = 'Celular inválido';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) newErrors.email = 'Email inválido';
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
      <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col gap-6 w-full max-w-sm mx-auto overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black text-diners-navy tracking-tight uppercase">Registro</h1>
          <p className="text-[#667085] text-[11px] font-bold tracking-wide">INGRESA TUS DATOS PARA PARTICIPAR</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Tipo de Documento" 
            as="select" 
            value={form.documentType}
            onChange={e => setForm({...form, documentType: e.target.value as DocumentType})}
          >
            <option value="DNI">DNI - Identidad</option>
            <option value="CE">CE - Extranjería</option>
            <option value="Pasaporte">Pasaporte</option>
          </Input>

          <div className="grid grid-cols-2 gap-3">
            <Input 
              label="N° Documento" 
              type="tel"
              maxLength={form.documentType === 'DNI' ? 8 : 12}
              placeholder="12345678"
              value={form.documentNumber}
              error={errors.documentNumber}
              onChange={e => setForm({...form, documentNumber: e.target.value.replace(/\D/g, '')})}
            />
            
            <Input 
              label="Celular" 
              type="tel"
              maxLength={9}
              placeholder="999888777"
              value={form.phoneNumber}
              error={errors.phoneNumber}
              onChange={e => setForm({...form, phoneNumber: e.target.value.replace(/\D/g, '')})}
              prefix={
                <select 
                  className="bg-transparent text-diners-navy text-[10px] font-black outline-none cursor-pointer pr-1"
                  value={form.countryCode}
                  onChange={e => setForm({...form, countryCode: e.target.value})}
                >
                  {COUNTRY_CODES.map(c => (
                    <option key={c.code} value={c.code}>{c.label}</option>
                  ))}
                </select>
              }
            />
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

          <div className="space-y-3 pt-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 mt-0.5 rounded border-[#D1D5DB] text-diners-royal focus:ring-0 cursor-pointer"
                checked={form.privacyAccepted}
                onChange={e => setForm({...form, privacyAccepted: e.target.checked})}
              />
              <span className="text-[11px] text-[#667085] leading-tight font-semibold group-hover:text-diners-navy transition-colors">
                Acepto la <Link to="/privacidad" className="text-diners-royal font-black hover:underline">Política de Privacidad</Link>
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 mt-0.5 rounded border-[#D1D5DB] text-diners-royal focus:ring-0 cursor-pointer"
                checked={form.marketingAccepted}
                onChange={e => setForm({...form, marketingAccepted: e.target.checked})}
              />
              <span className="text-[11px] text-[#667085] leading-tight font-semibold group-hover:text-diners-navy transition-colors">
                Autorizo tratamiento de datos comerciales
              </span>
            </label>
          </div>

          <Button 
            fullWidth 
            type="submit" 
            className="mt-2 uppercase tracking-[0.2em] py-4 text-[12px] font-black shadow-2xl"
            disabled={!form.privacyAccepted}
          >
            Siguiente
          </Button>
        </form>
      </div>
    </Layout>
  );
};
