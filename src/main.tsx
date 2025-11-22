import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { SideProvider } from './context/SideContext';
import './utils/fontLoader'; // Load fonts dynamically before CSS
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SideProvider>
      <App />
    </SideProvider>
  </StrictMode>
);
