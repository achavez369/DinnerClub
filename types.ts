
export type DocumentType = 'DNI' | 'CE' | 'Pasaporte';

export interface FormData {
  documentType: DocumentType;
  documentNumber: string;
  countryCode: string;
  phoneNumber: string;
  birthDate: string;
  email: string;
  privacyAccepted: boolean;
  marketingAccepted: boolean;
}

export interface AppState {
  formData: FormData | null;
  spinResult: string | null;
  redeemCode: string | null;
  isKioskMode: boolean;
}

export const PRIZES = [
  "Kit Vino",
  "Termo de Acero",
  "Libro de Recetas",
  "Toalla Premium",
  "Prensa Francesa",
  "Set Cuchillos",
  "Velas Aromáticas",
  "Set de Té"
];

export const COUNTRY_CODES = [
  { code: '+51', label: 'PE' },
  { code: '+57', label: 'CO' },
  { code: '+54', label: 'AR' },
  { code: '+56', label: 'CL' },
  { code: '+593', label: 'EC' },
  { code: '+1', label: 'US' },
];
