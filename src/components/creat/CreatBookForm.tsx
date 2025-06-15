"use client";

import React, { useState } from "react";
import {
  Box,
  SimpleGrid,
  Flex,
  Text,
  Input,
  chakra,
  NumberInput,
  HStack,
  Button,
  InputGroup,
  Wrap, WrapItem, Tag, TagLabel,
  CloseButton, RadioGroup
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BuchArt, type AbbildungInput, type BuchInput } from "@/graphql/interfaces";
import { createBuch } from "@/graphql/queries";

const ChakraSelect = chakra("select", {
  base: {
    width: "100%",
    p: 2,
    borderRadius: "md",
    borderColor: "gray.200",
    _focus: { borderColor: "blue.500", boxShadow: "outline" },
  },
});

const lieferbarItems = [
  { label: "Nein", value: "false" },
  { label: "Ja", value: "true" },
];

const CreateBookForm: React.FC = () => {
  const navigate = useNavigate();

  const [lieferbarValue, setLieferbarValue] = useState<"true" | "false">("true");

  //–– States
  const [titel, setTitel] = useState<string>("");
  const [untertitel, setUntertitel] = useState<string>("");
  const [datum, setDatum] = useState<string>("");
  const [art, setArt] = useState<BuchArt>(BuchArt.EPUB);
  const [isbn, setIsbn] = useState<string>("");
  const [preis, setPreis] = useState<number>(0);
  const [rabatt, setRabatt] = useState<number>(0);
  const [schlagwort, setSchlagwort] = useState<string>("");
  const [schlagwoerter, setSchlagwoerter] = useState<string[]>([]);
  const [lieferbar, setLieferbar] = useState<boolean>(true);
  const [homepage, setHomepage] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [beschriftung, setBeschriftung] = useState<string>("");
  const [contentType, setContentType] = useState<string>("");
  const [abbildungen, setAbbildungen] = useState<AbbildungInput[]>([]);
  const [error, setError] = useState<string>("");

  //–– Handlers
  const handleTitel = (e: React.ChangeEvent<HTMLInputElement>) => setTitel(e.target.value);
  const handleUntertitel = (e: React.ChangeEvent<HTMLInputElement>) => setUntertitel(e.target.value);
  const handleDatum = (e: React.ChangeEvent<HTMLInputElement>) => setDatum(e.target.value);
  const handleArt = (e: React.ChangeEvent<HTMLSelectElement>) => setArt(e.target.value as BuchArt);
  const handleIsbn = (e: React.ChangeEvent<HTMLInputElement>) => setIsbn(e.target.value);
  const handlePreis = (_: string, valueAsNumber: number) => setPreis(valueAsNumber);
  const handleRabatt = (_: string, valueAsNumber: number) => setRabatt(valueAsNumber);
  const handleSchlagwort = (e: React.ChangeEvent<HTMLInputElement>) => setSchlagwort(e.target.value);
  const addSchlagwort = () => {
    if (schlagwort.trim()) {
      setSchlagwoerter(prev => [...prev, schlagwort.trim()]);
      setSchlagwort("");
    }
  };
  const removeSchlagwort = (i: number) => setSchlagwoerter(prev => prev.filter((_, idx) => idx !== i));
  const handleLieferbar = (checked: boolean) => setLieferbar(checked);

  const handleHomepage = (e: React.ChangeEvent<HTMLInputElement>) => setHomepage(e.target.value);
  const handleRating = (e: React.ChangeEvent<HTMLInputElement>) => setRating(Number(e.target.value));
  const handleBeschriftung = (e: React.ChangeEvent<HTMLInputElement>) => setBeschriftung(e.target.value);
  const handleContentType = (e: React.ChangeEvent<HTMLInputElement>) => setContentType(e.target.value);
  const addAbbildung = () => {
    if (beschriftung && contentType) {
      setAbbildungen(prev => [...prev, { beschriftung, contentType }]);
      setBeschriftung("");
      setContentType("");
    }
  };

  //–– Submit
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!titel.trim()) {
      setError("Titel ist ein Pflichtfeld.");
      return;
    }

    const payload: BuchInput = {
      titel: { titel, untertitel },
      isbn,
      rating,
      art,
      preis,
      rabatt,
      lieferbar: lieferbarValue === "true",
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
      setError(err.message || "Unbekannter Fehler");
    }
  };

  return (
    <Box as="form" onSubmit={onSubmit} p={4}>
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        {/* Titel */}
        <Box>
          <Text fontWeight="bold">Titel *</Text>
          <Input value={titel} onChange={handleTitel} placeholder="Titel eingeben" />
        </Box>

        {/* Untertitel */}
        <Box>
          <Text>Untertitel</Text>
          <Input value={untertitel} onChange={handleUntertitel} placeholder="Untertitel eingeben" />
        </Box>

        {/* Erscheinungsdatum */}
        <Box>
          <Text>Erscheinungsdatum</Text>
          <Input type="date" value={datum} onChange={handleDatum} />
        </Box>

        {/* Buchart */}
        <Box>
          <Text>Buchart</Text>
          <ChakraSelect
            value={art}
            onChange={handleArt}
          >
            {Object.values(BuchArt).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </ChakraSelect>
        </Box>

        {/* ISBN */}
        <Box>
          <Text>ISBN</Text>
          <Input value={isbn} onChange={handleIsbn} placeholder="ISBN eingeben" />
        </Box>

        {/* Preis */}
        {/* <Box>
          <Text>Preis (€)</Text>
          <NumberInput.Root
            defaultValue="45"
            onChange={handlePreis}
            min={0}
            formatOptions={{
              style: "currency",
              currency: "EUR",
              currencyDisplay: "code",
              currencySign: "accounting",
            }}
          >
            <NumberInput.Control />
            <NumberInput.Input />
          </NumberInput.Root>
        </Box> */}

        {/* Rabatt */}
        {/* <Box>
          <Text>Rabatt (%)</Text>
          <NumberInput.Root
            defaultValue="0"
            onChange={handleRabatt}
            min={0}
            max={100}
            formatOptions={{
              style: "percent",
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }}
          >
            <NumberInput.Control />
            <NumberInput.Input />
          </NumberInput.Root>
        </Box> */}

        {/* Schlagwörter */}
        <Box>
          <Text>Schlagwörter</Text>
          <HStack>
            <Input value={schlagwort} onChange={handleSchlagwort} placeholder="Schlagwort" />
            <Button size={"sm"} onClick={addSchlagwort} type="button"> + </Button>
          </HStack>
          <Wrap mt={"2"} gap={"5"}>
            {schlagwoerter.map((w, i) => (
              <WrapItem key={i}>
                <Tag.Root>
                  <TagLabel>{w}</TagLabel>
                  <CloseButton onClick={() => removeSchlagwort(i)} />
                </Tag.Root>
              </WrapItem>
            ))}
          </Wrap>
        </Box>

        {/* Lieferbar */}
        {/* <Box>
          <Text>Lieferbar</Text>
          <RadioGroup.Root
            value={lieferbarValue}
            onValueChange={(e) => setLieferbarValue(e.value)}
          >
            <HStack gap="6">
              {lieferbarItems.map((item) => (
                <RadioGroup.Item key={item.value} value={item.value} asChild>
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                </RadioGroup.Item>
              ))}
            </HStack>
          </RadioGroup.Root>
        </Box> */}

        {/* Homepage */}
        <Box>
          <Text>Homepage</Text>
          <InputGroup startAddon="https://">
            <Input placeholder="yoursite.com" value={homepage} onChange={handleHomepage} />
          </InputGroup>

        </Box>

        {/* Rating */}
        <Box>
          <Text>Rating</Text>
          <Input type="number" min={1} max={5} value={rating} onChange={handleRating} placeholder="1–5" />
        </Box>

        {/* Abbildungen */}
        {/* <Box>
          <Text>Abbildungen</Text>
          <Stack spacing={2}>
            <Input placeholder="Beschriftung" value={beschriftung} onChange={handleBeschriftung} />
            <Input placeholder="Content-Type" value={contentType} onChange={handleContentType} />
            <Button size="sm" onClick={addAbbildung}>Abbildung hinzufügen</Button>
            {abbildungen.map((a, i) => (
              <Text key={i}>{a.beschriftung}: {a.contentType}</Text>
            ))}
          </Stack>
        </Box> */}
      </SimpleGrid>

      {error && (
        <Text color="red.500" mt={4}>{error}</Text>
      )}

      <Flex justify="center" mt={6}>
        <Button colorScheme="blue" type="submit">Hinzufügen</Button>
      </Flex>
    </Box>
  );
};

export default CreateBookForm;
