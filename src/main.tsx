import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { ThirdwebProvider } from 'thirdweb/react';
import { ErrorBoundary } from './components/ErrorBoundary';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThirdwebProvider>
        <App />
      </ThirdwebProvider>
    </ErrorBoundary>
  </StrictMode>,
);
