'use client';

import React, { useState } from 'react';
import {
  Box,
  Stack,
  HStack,
  Flex,
  Text,
  Input,
  chakra,
  Button,
  InputGroup,
  Wrap,
  WrapItem,
  Tag,
  CloseButton,
  Field,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  BuchArt,
  type AbbildungInput,
  type BuchInput,
} from '@/graphql/interfaces';
import { createBuch } from '@/graphql/queries';

const ChakraSelect = chakra('select', {
  base: {
    width: '100%',
    p: 2,
    borderRadius: 'md',
    borderColor: 'gray.200',
    _focus: { borderColor: 'blue.500', boxShadow: 'outline' },
  },
});

const isValidISBN = (isbn: string) => {
  // Entferne Bindestriche und Leerzeichen
  const clean = isbn.replace(/[\s-]/g, '');
  if (!/^\d{13}$/.test(clean)) return false;

  // Prüfziffer nach ISBN-13 Regel berechnen
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(clean.charAt(i)) * (i % 2 === 0 ? 1 : 3);
  }
  const check = (10 - (sum % 10)) % 10;
  return check === parseInt(clean.charAt(12));
};


const CreateBookForm: React.FC = () => {
  const navigate = useNavigate();

  //–– States
  const [titel, setTitel] = useState<string>('');
  const [untertitel, setUntertitel] = useState<string>('');
  const [datum, setDatum] = useState<string>('');
  const [art, setArt] = useState<BuchArt>(BuchArt.EPUB);
  const [isbn, setIsbn] = useState<string>('');

  const [isbnError, setIsbnError] = useState<string>('');

  const [preis, setPreis] = useState<number>(0);
  const [rabatt, setRabatt] = useState<number>(0);
  const [schlagwort, setSchlagwort] = useState<string>('');
  const [schlagwoerter, setSchlagwoerter] = useState<string[]>([]);
  const [lieferbar, setLieferbar] = useState<boolean>(true);
  const [homepage, setHomepage] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [beschriftung, setBeschriftung] = useState<string>('');
  const [contentType, setContentType] = useState<string>('');
  const [abbildungen, setAbbildungen] = useState<AbbildungInput[]>([]);
  const [error, setError] = useState<string>('');

  //–– Handlers
  const handleTitel = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitel(e.target.value);
  const handleUntertitel = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUntertitel(e.target.value);
  const handleDatum = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDatum(e.target.value);
  const handleArt = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setArt(e.target.value as BuchArt);
  // const handleIsbn = (e: React.ChangeEvent<HTMLInputElement>) =>
  //   setIsbn(e.target.value);
  const handleIsbn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsbn(value);

    if (value && !isValidISBN(value)) {
      setIsbnError('Bitte eine gültige ISBN-13 angeben (z. B. 978-0-007-00644-1)');
    } else {
      setIsbnError('');
    }
  };

  const handlePreis = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPreis(Number(e.target.value));
  const handleRabatt = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRabatt(Number(e.target.value));
  const handleSchlagwort = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSchlagwort(e.target.value);
  const addSchlagwort = () => {
    if (schlagwort.trim()) {
      setSchlagwoerter((prev) => [...prev, schlagwort.trim()]);
      setSchlagwort('');
    }
  };
  const removeSchlagwort = (i: number) =>
    setSchlagwoerter((prev) => prev.filter((_, idx) => idx !== i));

  const handleHomepage = (e: React.ChangeEvent<HTMLInputElement>) =>
    setHomepage(e.target.value);
  const handleRating = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRating(Number(e.target.value));
  const handleBeschriftung = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBeschriftung(e.target.value);
  const handleContentType = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContentType(e.target.value);
  const addAbbildung = () => {
    if (beschriftung && contentType) {
      setAbbildungen((prev) => [...prev, { beschriftung, contentType }]);
      setBeschriftung('');
      setContentType('');
    }
  };

  //–– Submit
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!titel.trim()) {
      setError('Titel ist ein Pflichtfeld.');
      return;
    }

    const payload: BuchInput = {
      titel: { titel, untertitel },
      isbn,
      rating,
      art,
      preis,
      rabatt,
      lieferbar,
      datum,
      homepage,
      schlagwoerter,
      abbildungen,
    };

    try {
      const res = await createBuch(payload);
      if (res.data.errors && res.data.errors.length) {
        setError(res.data.errors[0].message);
      } else {
        navigate(`/${res.data.data.create.id}/details`);
      }
    } catch (err: any) {
      setError(err.message || 'Unbekannter Fehler');
    }
  };

  return (
    <Box as="form" onSubmit={onSubmit} p={4}>
      <Stack gap={6}>
        {/* Titel und Untertitel */}
        <HStack gap={6} align="flex-start" flexWrap="wrap">
          <Box flex="1" minW={0}>
            <Text fontWeight="bold">Titel *</Text>
            <Input
              value={titel}
              onChange={handleTitel}
              placeholder="Titel eingeben"
            />
          </Box>
          <Box flex="1" minW={0}>
            <Text>Untertitel</Text>
            <Input
              value={untertitel}
              onChange={handleUntertitel}
              placeholder="Untertitel eingeben"
            />
          </Box>
        </HStack>

        {/* Erscheinungsdatum und Buchart */}
        <HStack gap={6} align="flex-start" flexWrap="wrap">
          <Box flex="1" minW={0}>
            <Text>Erscheinungsdatum</Text>
            <Input type="date" value={datum} onChange={handleDatum} />
          </Box>
          <Box flex="1" minW={0}>
            <Text>Buchart</Text>
            <ChakraSelect value={art} onChange={handleArt}>
              {Object.values(BuchArt).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </ChakraSelect>
          </Box>
        </HStack>

        {/* ISBN und Preis */}
        <HStack gap={6} align="flex-start" flexWrap="wrap">
          <Box flex="1" minW={0}>
            <Text>ISBN</Text>
            <Field.Root invalid={!!isbnError}>
              <Input
                value={isbn}
                onChange={handleIsbn}
                placeholder="z. B. 978-0-007-00644-1"
              />
              {isbnError && (
                <Field.ErrorText>
                  {isbnError}
                </Field.ErrorText>
              )}
            </Field.Root>
          </Box>
          <Box flex="1" minW={0}>
            <Text>Preis (€)</Text>
            <Input
              type="number"
              min={0}
              step={0.01}
              value={preis}
              onChange={handlePreis}
              placeholder="Preis"
            />
          </Box>
        </HStack>

        {/* Rabatt und Schlagwörter */}
        <HStack gap={6} align="flex-start" flexWrap="wrap">
          <Box flex="1" minW={0}>
            <Text>Rabatt (%)</Text>
            <Input
              type="number"
              min={0}
              step={0.01}
              value={rabatt}
              onChange={handleRabatt}
              placeholder="Rabatt"
            />
          </Box>
          <Box flex="1" minW={0}>
            <Text>Schlagwörter</Text>
            <HStack>
              <Input
                value={schlagwort}
                onChange={handleSchlagwort}
                placeholder="Schlagwort"
              />
              <Button size={'sm'} onClick={addSchlagwort} type="button">
                +
              </Button>
            </HStack>
            <Wrap mt={'2'} gap={'5'}>
              {schlagwoerter.map((w, i) => (
                <WrapItem key={i}>
                  <Tag.Root>
                    <Tag.Label>{w}</Tag.Label>
                    <CloseButton onClick={() => removeSchlagwort(i)} />
                  </Tag.Root>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </HStack>

        {/* Lieferbar und Homepage */}
        <HStack gap={6} align="flex-start" flexWrap="wrap">
          <Box flex="1" minW={0}>
            <Text fontWeight="bold" mb={2}>
              Lieferbar
            </Text>
            <HStack gap={4}>
              <chakra.label display="flex" alignItems="center">
                <chakra.input
                  type="radio"
                  name="lieferbar"
                  value="true"
                  checked={lieferbar}
                  onChange={() => setLieferbar(true)}
                  mr={2}
                />
                Ja
              </chakra.label>
              <chakra.label display="flex" alignItems="center">
                <chakra.input
                  type="radio"
                  name="lieferbar"
                  value="false"
                  checked={!lieferbar}
                  onChange={() => setLieferbar(false)}
                  mr={2}
                />
                Nein
              </chakra.label>
            </HStack>
          </Box>
          <Box flex="1" minW={0}>
            <Text>Homepage</Text>
            <InputGroup
              startElement="https://"
              startElementProps={{ color: "fg.muted" }}
            >
              <Input ps="8ch" placeholder="yoursite.com" value={homepage} onChange={handleHomepage}/>
            </InputGroup>
          </Box>
        </HStack>

        {/* Rating und Abbildungen */}
        <HStack gap={6} align="flex-start" flexWrap="wrap">
          <Box flex="1" minW={0}>
            <Text>Rating</Text>
            <Input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={handleRating}
              placeholder="1–5"
            />
          </Box>
          <Box flex="1" minW={0}>
            <Text>Abbildungen</Text>
            <Stack gap={2}>
              <Input
                placeholder="Beschriftung"
                value={beschriftung}
                onChange={handleBeschriftung}
              />
              <Input
                placeholder="Content-Type"
                value={contentType}
                onChange={handleContentType}
              />
              <Button size="sm" onClick={addAbbildung} type="button">
                Abbildung hinzufügen
              </Button>
              {abbildungen.map((a, i) => (
                <Text key={i}>
                  {a.beschriftung}: {a.contentType}
                </Text>
              ))}
            </Stack>
          </Box>
        </HStack>
      </Stack>

      {error && (
        <Text color="red.500" mt={4}>
          {error}
        </Text>
      )}

      <Flex justify="center" mt={6}>
        <Button colorScheme="blue" type="submit">
          Hinzufügen
        </Button>
      </Flex>
    </Box>
  );
};

export default CreateBookForm;
