import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './index.css';
const root = createRoot(document.querySelector('#root') as HTMLDivElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
