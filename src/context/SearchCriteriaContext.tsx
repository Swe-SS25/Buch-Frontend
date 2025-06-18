// src/context/SearchCriteriaContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
} from 'react';
import type { SuchkriterienInput } from '@graphql/interfaces';

interface SearchCriteriaContextType {
  criteria: SuchkriterienInput;
  setCriteria: (criteria: SuchkriterienInput) => void;
}

const SearchCriteriaContext = createContext<
  SearchCriteriaContextType | undefined
>(undefined);

interface SearchCriteriaProviderProps {
  children: ReactNode; // Definiert den Typ für children explizit als ReactNode
}

export const SearchCriteriaProvider: React.FC<SearchCriteriaProviderProps> = ({
  children,
}) => {
  const [criteria, setCriteria] = useState<SuchkriterienInput>({});

  return (
    <SearchCriteriaContext.Provider value={{ criteria, setCriteria }}>
      {children}
    </SearchCriteriaContext.Provider>
  );
};

export const useSearchCriteria = () => {
  const context = useContext(SearchCriteriaContext);
  if (!context) {
    throw new Error(
      'useSearchCriteria must be used within a SearchCriteriaProvider',
    );
  }
  return context;
};
