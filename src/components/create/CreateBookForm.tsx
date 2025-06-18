'use client';

import {
  Box,
  Button,
  chakra,
  CloseButton,
  Field,
  Flex,
  HStack,
  Input,
  Stack,
  Tag,
  Text,
  Wrap,
  WrapItem,
  FileUpload,
} from '@chakra-ui/react';
import { HiUpload } from 'react-icons/hi';
import {
  BuchArt,
  type AbbildungInput,
  type BuchInput,
} from '@/graphql/interfaces';
import { createBuch } from '@/graphql/queries';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Validierungsfunktionen ---
function isValidISBN(isbn: string): boolean {
  // Entferne Bindestriche und Leerzeichen
  const cleanIsbn = isbn.replace(/[-\s]/g, '');

  // Prüfe auf ISBN-10
  if (/^\d{9}[\dX]$/.test(cleanIsbn)) {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += (i + 1) * parseInt(cleanIsbn.charAt(i));
    }
    let check =
      cleanIsbn.charAt(9) === 'X' ? 10 : parseInt(cleanIsbn.charAt(9));
    sum += 10 * check;
    return sum % 11 === 0;
  }

  // Prüfe auf ISBN-13
  if (/^\d{13}$/.test(cleanIsbn)) {
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanIsbn.charAt(i)) * (i % 2 === 0 ? 1 : 3);
    }
    let check = (10 - (sum % 10)) % 10;
    return check === parseInt(cleanIsbn.charAt(12));
  }

  return false;
}
const isValidRating = (value: number) =>
  Number.isInteger(value) && value >= 0 && value <= 5;

const isValidPreis = (value: number) =>
  typeof value === 'number' && !isNaN(value) && value >= 0;

const isValidRabatt = (value: number | undefined) =>
  value === undefined || (value >= 0 && value <= 1);

const isValidDate = (value: string | undefined) =>
  !value || /^\d{4}-\d{2}-\d{2}$/.test(value);

const isValidUrl = (value: string | undefined) =>
  !value || /^https?:\/\/[^\s$.?#].[^\s]*$/.test(value);

// ChakraSelect bleibt wie gehabt
const ChakraSelect = chakra('select', {
  base: {
    width: '100%',
    p: 2,
    borderRadius: 'md',
    borderColor: 'gray.200',
    _focus: { borderColor: 'blue.500', boxShadow: 'outline' },
  },
});

const CreateBookForm: React.FC = () => {
  const navigate = useNavigate();

  // States für die Felder
  const [titel, setTitel] = useState<string>('');
  const [untertitel, setUntertitel] = useState<string>('');
  const [datum, setDatum] = useState<string>('');
  const [art, setArt] = useState<BuchArt>(BuchArt.EPUB);
  const [isbn, setIsbn] = useState<string>('');
  const [preis, setPreis] = useState<number>(0);
  const [rabatt, setRabatt] = useState<number>(0);
  const [schlagwort, setSchlagwort] = useState<string>('');
  const [schlagwoerter, setSchlagwoerter] = useState<string[]>([]);
  const [lieferbar, setLieferbar] = useState<boolean>(true);
  const [homepage, setHomepage] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [abbildungen, setAbbildungen] = useState<AbbildungInput[]>([]);

  // States für die Fehlerbehandlung
  const [titelError, setTitelError] = useState<string>('');
  const [datumError, setDatumError] = useState<string>('');
  const [isbnError, setIsbnError] = useState<string>('');
  const [preisError, setPreisError] = useState<string>('');
  const [rabattError, setRabattError] = useState<string>('');
  const [homepageError, setHomepageError] = useState<string>('');
  const [ratingError, setRatingError] = useState<string>('');
  const [error, setError] = useState<string>('');

  // --- Handlers mit Validierung ---
  const handleTitel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitel(value);
    setTitelError(value.trim() === '' ? 'Titel ist ein Pflichtfeld.' : '');
  };

  const handleUntertitel = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUntertitel(e.target.value);

  const handleDatum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDatum(value);
    setDatumError(
      isValidDate(value) ? '' : 'Datum muss im Format JJJJ-MM-TT sein.',
    );
  };

  const handleArt = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as BuchArt;
    setArt(value);
  };

  const handleIsbn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsbn(value);
    setIsbnError(
      value && !isValidISBN(value)
        ? 'Bitte eine gültige ISBN-13 angeben (z. B. 978-0-007-00644-1)'
        : '',
    );
  };

  const handlePreis = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPreis(value);
    setPreisError(!isValidPreis(value) ? 'Preis muss positiv sein.' : '');
  };

  const handleRabatt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setRabatt(value);
    setRabattError(
      !isValidRabatt(value) ? 'Rabatt muss zwischen 0 und 1 liegen.' : '',
    );
  };

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

  const handleHomepage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHomepage(value);
    setHomepageError(
      isValidUrl(value) ? '' : 'Homepage muss eine gültige URL sein.',
    );
  };

  const handleRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setRating(value);
    setRatingError(
      !isValidRating(value)
        ? 'Rating muss eine ganze Zahl zwischen 0 und 5 sein.'
        : '',
    );
  };

  // --- Neuer Handler für Abbildungen-Upload ---
  const handleAbbildungenUpload = (files: FileList) => {
    const neueAbbildungen = Array.from(files).map((file) => ({
      beschriftung: file.name,
      contentType: file.name.split('.').pop() || '',
    }));
    setAbbildungen((prev) => [...prev, ...neueAbbildungen]);
  };

  // --- Submit-Handler mit Validierung aller Felder ---
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    let valid = true;

    if (!titel.trim()) {
      setTitelError('Titel ist ein Pflichtfeld.');
      valid = false;
    }

    if (!isValidISBN(isbn)) {
      setIsbnError(
        'Bitte eine gültige ISBN-13 angeben (z. B. 978-0-007-00644-1)',
      );
      valid = false;
    }

    if (!isValidPreis(preis)) {
      setPreisError('Preis muss positiv sein.');
      valid = false;
    }

    if (!isValidRabatt(rabatt)) {
      setRabattError('Rabatt muss zwischen 0 und 1 liegen.');
      valid = false;
    }

    if (!isValidRating(rating)) {
      setRatingError('Rating muss eine ganze Zahl zwischen 0 und 5 sein.');
      valid = false;
    }

    if (!isValidDate(datum)) {
      setDatumError('Datum muss im Format JJJJ-MM-TT sein.');
      valid = false;
    }

    if (!isValidUrl(homepage)) {
      setHomepageError('Homepage muss eine gültige URL sein.');
      valid = false;
    }

    if (!valid) return;

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

  // --- Render ---
  return (
    <Box as="form" onSubmit={onSubmit} p={4}>
      <Stack gap={6}>
        {/* Titel und Untertitel */}
        <HStack gap={6} align="flex-start" flexWrap="wrap">
          <Box flex="1" minW={0}>
            <Text fontWeight="bold">Titel *</Text>
            <Field.Root invalid={!!titelError}>
              <Input
                value={titel}
                onChange={handleTitel}
                placeholder="Titel eingeben"
              />
              {titelError && <Field.ErrorText>{titelError}</Field.ErrorText>}
            </Field.Root>
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
            <Field.Root invalid={!!datumError}>
              <Input type="date" value={datum} onChange={handleDatum} />
              {datumError && <Field.ErrorText>{datumError}</Field.ErrorText>}
            </Field.Root>
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
              {isbnError && <Field.ErrorText>{isbnError}</Field.ErrorText>}
            </Field.Root>
          </Box>
          <Box flex="1" minW={0}>
            <Text>Preis (€)</Text>
            <Field.Root invalid={!!preisError}>
              <Input
                type="number"
                min={0}
                step={0.01}
                value={preis}
                onChange={handlePreis}
                placeholder="Preis"
              />
              {preisError && <Field.ErrorText>{preisError}</Field.ErrorText>}
            </Field.Root>
          </Box>
        </HStack>

        {/* Rabatt und Schlagwörter */}
        <HStack gap={6} align="flex-start" flexWrap="wrap">
          <Box flex="1" minW={0}>
            <Text>Rabatt (%)</Text>
            <Field.Root invalid={!!rabattError}>
              <Input
                type="number"
                min={0}
                max={1}
                step={0.01}
                value={rabatt}
                onChange={handleRabatt}
                placeholder="Rabatt"
              />
              {rabattError && <Field.ErrorText>{rabattError}</Field.ErrorText>}
            </Field.Root>
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
            <Field.Root invalid={!!homepageError}>
              <Input
                placeholder="https://yoursite.com"
                value={homepage}
                onChange={handleHomepage}
              />
              {homepageError && (
                <Field.ErrorText>{homepageError}</Field.ErrorText>
              )}
            </Field.Root>
          </Box>
        </HStack>

        {/* Rating und Abbildungen */}
        <HStack gap={6} align="flex-start" flexWrap="wrap">
          <Box flex="1" minW={0}>
            <Text>Rating</Text>
            <Field.Root invalid={!!ratingError}>
              <Input
                type="number"
                min={1}
                max={5}
                value={rating}
                onChange={handleRating}
                placeholder="1–5"
              />
              {ratingError && <Field.ErrorText>{ratingError}</Field.ErrorText>}
            </Field.Root>
          </Box>
          <Box flex="1" minW={0}>
            <Text>Abbildungen</Text>
            <FileUpload.Root
              accept="image/*"
              multiple={true}
              onFilesChange={handleAbbildungenUpload}
            >
              <FileUpload.HiddenInput />
              <FileUpload.Trigger>
                <Button variant="outline" size="sm">
                  <HiUpload /> Upload file
                </Button>
              </FileUpload.Trigger>
              <FileUpload.List />
            </FileUpload.Root>
            <Stack mt={2} gap={2}>
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
