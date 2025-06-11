import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from '@/components/ui/provider';
import { SearchCriteriaProvider } from './context/SearchCriteriaContext.tsx';

import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> {/* <-- Hier */}
      <SearchCriteriaProvider>
        <Provider>
          <App />
        </Provider>
      </SearchCriteriaProvider>
    </BrowserRouter> {/* <-- Und hier */}
  </StrictMode>,
);
