'use client';
import React, { useState } from 'react';
import Searchbar from '@/components/search/searchbar/Searchbar';
import BookList from '@/components/search/bookList/BookList';
import { SearchCriteriaProvider } from '@context/SearchCriteriaContext';
import Filter from '@/components/search/filter/Filter.tsx';
import Navbar from '@/components/Nav/navbar';
import styles from './search.module.css';
import {  IconButton, } from '@chakra-ui/react';
import { FaBars, FaTimes } from 'react-icons/fa';
import AnlegeButton from '@/components/search/bookList/AnlegeButton';

const SearchPage: React.FC = () => {
  function handleLogout(): void {
    throw new Error('Function not implemented.');
  }

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <SearchCriteriaProvider>
        <div className={styles.wrapper}>
          <div className={styles.filter}>
            <div className={styles.searchbar}>
              <Searchbar />
            </div>
            {isOpen && (
                  <Filter />
            )}
            <IconButton
              aria-label={isOpen ? 'Verstecken' : 'Anzeigen'}
              size="lg"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </IconButton>
            <br />
            <AnlegeButton />
          </div>
          <div className={styles.booklist}>
            <BookList />
          </div>
        </div>
      </SearchCriteriaProvider>
    </>
  );
};

export default SearchPage;
<div></div>;
