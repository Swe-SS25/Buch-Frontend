'use client';
import React, { useEffect, useState } from 'react';
import type { Buch } from '@graphql/interfaces';
import { useSearchCriteria } from '@context/SearchCriteriaContext';
import { queryBuecher } from '@graphql/queries';
import { Button, Flex, Link } from '@chakra-ui/react';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Buch[]>([]);
  const [error, setError] = useState<string>('');
  const { criteria } = useSearchCriteria();

  useEffect(() => {
    console.log(criteria);
    const response = queryBuecher(criteria).then((response) => {
      console.log(response);
      if (response.status == 200) {
        if (response.data.data.buecher) {
          setBooks(response.data.data.buecher);
          setError('');
        } else {
          setBooks([]);
          if (response.data.errors.length >= 1) {
            setError(response.data.errors[0].message);
          }
        }
      }
    });
  }, [criteria]);

  return (
    <div>
      {error}
      {books.map((book: Buch) => (
        <Flex
          key={book.id}
          justifyContent="space-between"
          alignItems="center"
          padding="1"
        >
          <div>
            Buch: {book.titel.titel}, {book.titel.untertitel}, ISBN: {book.isbn}
            , Rating: {book.rating}, Preis: {book.preis} €, Art: {book.art}
          </div>
          <div className="flex-shrink-0">
            <Button asChild>
                <a href={`/${book.id}/details`}>Details</a>
            </Button>
          </div>
        </Flex>
      ))}
    </div>
  );
};

export default BookList;
