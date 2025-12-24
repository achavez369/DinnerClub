
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AppState, FormData } from '../types';

interface AppContextType {
  state: AppState;
  setFormData: (data: FormData) => void;
  setSpinResult: (prize: string) => void;
  setKioskMode: (enabled: boolean) => void;
  resetApp: () => void;
}

const STORAGE_KEY = 'dc_experience_state';

const defaultState: AppState = {
  formData: null,
  spinResult: null,
  redeemCode: null,
  isKioskMode: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setFormData = useCallback((data: FormData) => {
    setState(prev => ({ ...prev, formData: data }));
  }, []);

  const setSpinResult = useCallback((prize: string) => {
    const code = `DC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setState(prev => ({ ...prev, spinResult: prize, redeemCode: code }));
  }, []);

  const setKioskMode = useCallback((enabled: boolean) => {
    setState(prev => ({ ...prev, isKioskMode: enabled }));
  }, []);

  const resetApp = useCallback(() => {
    setState(prev => ({
      ...defaultState,
      isKioskMode: prev.isKioskMode // Persist kiosk mode flag if already set
    }));
  }, []);

  return (
    <AppContext.Provider value={{ state, setFormData, setSpinResult, setKioskMode, resetApp }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
