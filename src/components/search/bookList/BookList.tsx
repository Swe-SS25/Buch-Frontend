'use client';
import React, { useEffect, useState } from 'react';
import type { Buch } from '@graphql/interfaces';
import { useSearchCriteria } from '@context/SearchCriteriaContext';
import { queryBuecher } from '@graphql/queries';
import { Button, Center, Table } from '@chakra-ui/react';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Buch[]>([]);
  const [error, setError] = useState<string>('');
  const { criteria } = useSearchCriteria();

  useEffect(() => {
    console.log(criteria);
    queryBuecher(criteria).then((response) => {
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
      <Table.ScrollArea>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Titel</Table.ColumnHeader>
              <Table.ColumnHeader>Untertitel</Table.ColumnHeader>
              <Table.ColumnHeader>ISBN</Table.ColumnHeader>
              <Table.ColumnHeader>Rating</Table.ColumnHeader>
              <Table.ColumnHeader>Preis</Table.ColumnHeader>
              <Table.ColumnHeader>Art</Table.ColumnHeader>
              <Table.ColumnHeader>Aktionen</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {books.map((book: Buch) => (
              <Table.Row key={book.id}>
                <Table.Cell>{book.titel.titel}</Table.Cell>
                <Table.Cell>{book.titel.untertitel}</Table.Cell>
                <Table.Cell>{book.isbn}</Table.Cell>
                <Table.Cell>{book.rating}</Table.Cell>
                <Table.Cell>{book.preis}</Table.Cell>
                <Table.Cell>{book.art}</Table.Cell>
                <Table.Cell>
                  <Button asChild>
                    <a href={`/${book.id}/details`}>Details</a>
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
      <Center>{error}</Center>
    </div>
  );
};

export default BookList;
