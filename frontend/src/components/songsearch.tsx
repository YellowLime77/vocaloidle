import React, { Key } from 'react';

import {
  Autocomplete,
  AutocompleteItem
} from "@nextui-org/autocomplete";

import './songsearch.css';

interface Props {
  songs: {
    producer: string;
    en: string;
    jp: string;
    romaji: string;
  }[];

  setSongSearchValue: (value: string) => void;
}

const SongSearch: React.FC<Props> = ({songs, setSongSearchValue}) => {

  const onSelectionChange = (key: Key) => {
    console.log(key);
    if (key === null) {
      setSongSearchValue('');
    } else {
      setSongSearchValue(key as string);
    }
  };


  return (
    <Autocomplete className="h-full w-full my-4" label="Search song..."
      onSelectionChange={onSelectionChange}
      allowsCustomValue={true}>

      {songs.map((song) => (
        <AutocompleteItem 
          key={ [song.en, song.jp, song.romaji, song.producer].filter(Boolean).join(' - ') }
        >
          {song.en + " - " + song.producer}
        </AutocompleteItem >
      ))}
    </Autocomplete>
  );
}

export default SongSearch;