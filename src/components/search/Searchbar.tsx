'use client';
import type { SuchkriterienInput } from '@graphql/interfaces';
import { useSearchCriteria } from '@context/SearchCriteriaContext';
import React, { useState } from 'react';

const Searchbar: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const { criteria, setCriteria } = useSearchCriteria();

  const propagateSearch = () => {
    const suchkriterien: SuchkriterienInput = {
      titel: title,
      isbn: '',
      lieferbar: criteria.lieferbar,
      rating: criteria.rating,
      art: criteria.art,
    };

    setCriteria(suchkriterien);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nach Title suchen"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="button"
        id="search-button"
        onClick={(e) => {
          e.preventDefault();
          propagateSearch();
        }}
      >
        Suchen
      </button>
    </div>
  );
};

export default Searchbar;
