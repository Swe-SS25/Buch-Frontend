import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from '@/components/ui/provider';
import { SearchCriteriaProvider } from './context/SearchCriteriaContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SearchCriteriaProvider>
      <Provider>
        <App />
      </Provider>
    </SearchCriteriaProvider>
  </StrictMode>,
);
