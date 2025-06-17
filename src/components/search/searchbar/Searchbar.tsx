'use client';
import type { SuchkriterienInput } from '@graphql/interfaces';
import { useSearchCriteria } from '@context/SearchCriteriaContext';
import React, { useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import styles from './Searchbar.module.css';

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
    <div className={styles.wrapper}>
      <Input
        type="text"
        placeholder="Nach Title suchen"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
        type="button"
        id="search-button"
        onClick={(e) => {
          e.preventDefault();
          propagateSearch();
        }}
      >
        Suchen
      </Button>
    </div>
  );
};

export default Searchbar;
