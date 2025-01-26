import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Theme, ThemePanel } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './styles/main.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme accentColor="primary">
      <App />
    </Theme>
  </StrictMode>,
);
