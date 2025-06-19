'use client';
import React, { useState } from 'react';
import { useSearchCriteria } from '@context/SearchCriteriaContext';
import { BuchArt, type SuchkriterienInput } from '@/graphql/interfaces';
import {
  Button,
  Checkbox,
  HStack,
  NativeSelect,
  RatingGroup,
  Stack,
} from '@chakra-ui/react';
import style from '@/components/search/filter/filter.module.css';

const Filter: React.FC = () => {
  const [lieferbar, setLieferbar] = useState<boolean>(true);
  const [rating, setRating] = useState<number>(5);
  const [buchArt, setBuchArt] = useState<BuchArt>(BuchArt.EPUB);
  const { criteria, setCriteria } = useSearchCriteria();

  const propagateSearch = () => {
    const suchkriterien: SuchkriterienInput = {
      titel: criteria.titel,
      isbn: '',
      lieferbar: lieferbar,
      rating: rating,
      art: buchArt,
    };
    setCriteria(suchkriterien);
  };

  return (
    <div className={style.wrapper}>
      <div>
        <h6>Lieferbar?</h6>
        <HStack align="flex-start">
          <Stack align="flex-start" flex="1">
            <Checkbox.Root
              className="form-check-input"
              defaultChecked
              variant="subtle"
              checked={lieferbar}
              onChange={(e: {
                target: {
                  checked: boolean | ((prevState: boolean) => boolean);
                };
              }) => {
                setLieferbar(e.target.checked);
              }}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Ja</Checkbox.Label>
            </Checkbox.Root>
          </Stack>
        </HStack>
      </div>
      <div className="">
        <h6 className="">Rating</h6>
        <RatingGroup.Root
          className="form-check-input"
          count={5}
          defaultValue={3}
          size="sm"
          onChange={(e: {
            target: { value: React.SetStateAction<number> };
          }) => {
            setRating(e.target.value);
          }}
        >
          <RatingGroup.HiddenInput />
          <RatingGroup.Control />
        </RatingGroup.Root>
      </div>
      <div>
        <h6 className="">Art</h6>
        <NativeSelect.Root
          className="form-check-input"
          onChange={(e) => {
            const selectEl = e.target as HTMLSelectElement;
            setBuchArt(selectEl.value as BuchArt);
          }}
        >
          <NativeSelect.Field>
            <option value={BuchArt.EPUB}>Epub</option>
            <option value={BuchArt.HARDCOVER}>Hardcover</option>
            <option value={BuchArt.PAPERBACK}>Paperback</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </div>
      <br />
      <Button
        variant="solid"
        onClick={
          propagateSearch
        }
      >
        Save Filter
      </Button>
    </div>
  );
};

export default Filter;
