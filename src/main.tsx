import ReactDOM from 'react-dom/client';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';

import { MyApp } from './MyApp';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<MyApp />);
