
import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Home } from './pages/Home';
import { Privacy } from './pages/Privacy';
import { Roulette } from './pages/Roulette';
import { Prize } from './pages/Prize';
import { Kiosk } from './pages/Kiosk';
import { SplashScreen } from './components/SplashScreen';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <AppProvider>
      {!isLoaded && <SplashScreen onComplete={() => setIsLoaded(true)} />}
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacidad" element={<Privacy />} />
          <Route path="/ruleta" element={<Roulette />} />
          <Route path="/premio" element={<Prize />} />
          <Route path="/kiosco" element={<Kiosk />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
