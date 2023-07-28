import React from 'react';
import ReactDOM from 'react-dom/client';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';

import './index.css';
import AppRoutes from './routes/Routes.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <AppRoutes />
    </PrimeReactProvider>
  </React.StrictMode>,
);
