
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/UI/Button';

export const Privacy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-2xl space-y-6">
        <h1 className="text-xl font-bold text-[#0B1B3B] border-b pb-4">Política de Privacidad</h1>
        
        <div className="text-sm text-[#667085] space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          <section>
            <h2 className="font-bold text-[#0B1B3B] mb-1">Responsable</h2>
            <p>Diners Club del Perú S.A. con domicilio en Av. Canaval y Moreyra 522, San Isidro.</p>
          </section>
          
          <section>
            <h2 className="font-bold text-[#0B1B3B] mb-1">Datos recolectados</h2>
            <p>Tipo y número de documento, celular, fecha de nacimiento y correo electrónico.</p>
          </section>

          <section>
            <h2 className="font-bold text-[#0B1B3B] mb-1">Finalidad</h2>
            <p>Participación en la dinámica "Ruleta Diners" y gestión de entrega de premios.</p>
          </section>

          <section>
            <h2 className="font-bold text-[#0B1B3B] mb-1">Conservación</h2>
            <p>Los datos serán conservados por el tiempo necesario para cumplir con la finalidad de la activación.</p>
          </section>

          <section>
            <h2 className="font-bold text-[#0B1B3B] mb-1">Derechos ARCO</h2>
            <p>Puede ejercer sus derechos de Acceso, Rectificación, Cancelación y Oposición a través de nuestros canales oficiales.</p>
          </section>

          <section>
            <h2 className="font-bold text-[#0B1B3B] mb-1">Contacto</h2>
            <p>atencion_al_cliente@dinersclub.com.pe</p>
          </section>
        </div>

        <Button fullWidth onClick={() => navigate(-1)}>
          VOLVER
        </Button>
      </div>
    </Layout>
  );
};
