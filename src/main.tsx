import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/home/Home.tsx';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';

import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <Home />
    </PrimeReactProvider>
  </React.StrictMode>,
);
