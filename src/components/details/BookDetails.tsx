'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { type Buch } from '@graphql/interfaces';
import { queryBuch } from '@graphql/queries';
import {
  Box,
  Center,
  Flex,
  Grid,
  Image,
  Link,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';

const BookDetails: React.FC = () => {
  const { id: buchId } = useParams<{ id: string }>();
  const [buch, setBuch] = useState<Buch | null>(null);
  const [pending, setPending] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!buchId) return;
    setPending(true);
    queryBuch(buchId)
      .then((res) => {
        const fetched = res.data?.data?.buch;
        if (fetched) {
          setBuch(fetched);
        } else {
          setError('Kein Buch gefunden');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Fehler beim Laden');
      })
      .finally(() => {
        setPending(false);
      });
  }, [buchId]);

  const check = (v: any) => (v != null && v !== '' ? v : 'n.a.');

  if (pending) {
    return (
      <Center h="60vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="60vh">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  if (!buch) {
    return (
      <Center h="60vh">
        <Text>Kein Buch geladen.</Text>
      </Center>
    );
  }

  return (
    <Box maxW="container.lg" mx="auto" p={6}>
      <Grid templateColumns={{ base: '1fr', md: '5fr 7fr' }} gap={8}>
        <Flex justify="center">
          <Image
            src="https://archive.org/download/placeholder-image/placeholder-image.jpg"
            alt="Buchabbildung"
            maxW="250px"
            borderRadius="md"
          />
        </Flex>

        <Stack>
          <Row label="Titel" value={check(buch.titel.titel)} />
          <Row label="Untertitel" value={check(buch.titel.untertitel)} />
          <Row label="ISBN" value={check(buch.isbn)} />
          <Row label="Art" value={check(buch.art)} />
          <Row label="Erschienen" value={check(buch.datum)} />
          <Row label="Rating" value={check(buch.rating)} />
          <Row
            label="Homepage"
            value={
              buch.homepage ? (
                <Link href={buch.homepage} color="teal.500">
                  {buch.homepage}
                </Link>
              ) : (
                'n.a.'
              )
            }
          />
          <Row
            label="Schlagwörter"
            value={check(buch.schlagwoerter?.join(', '))}
          />
          <Row
            label="Preis"
            value={
              typeof buch.preis === 'number'
                ? `${buch.preis.toFixed(2)} €`
                : 'n.a.'
            }
          />
          <Row
            label="Rabatt"
            value={buch.rabatt != null ? buch.rabatt : 'n.a.'}
          />
          <Row label="Lieferbar" value={buch.lieferbar ? 'Ja' : 'Nein'} />
        </Stack>
      </Grid>
    </Box>
  );
};

interface RowProps {
  label: string;
  value: React.ReactNode;
}

const Row: React.FC<RowProps> = ({ label, value }) => (
  <Flex>
    <Box flex="0 0 30%" fontWeight="bold">
      {label}:
    </Box>
    <Box flex="1">{value}</Box>
  </Flex>
);

export default BookDetails;
