import React, { useState} from 'react';

import './songsearch.css';

interface Props {
  songs: {
    _id: string;
    producer: string;
    en: string;
    jp: string;
    romaji: string;
  }[];

  songSearchValue: string;
  setSongSearchValue: (value: string) => void;
  onValueChange: (value: string) => void;
}

const SongSearch: React.FC<Props> = ({songs, songSearchValue, setSongSearchValue, onValueChange}) => {
  const [open, setOpen] = useState(false);

  return (
    <Command className="h-fit w-full duration-1000 my-4">
      <CommandInput className="text-md" placeholder="Search song..." value={songSearchValue} onInput={(e) => {
        setSongSearchValue(e.currentTarget.value);
        onValueChange(e.currentTarget.value);

        if (e.currentTarget.value === "" && open) {
          setOpen(false)
        } else {
          setOpen(true)
        }
      }}/>

      <ScrollArea className="z-20">
        { open ? (
          <>
            <CommandList className="p-2 h-fit overflow-y-scroll">
              <CommandEmpty>No Songs Found</CommandEmpty>
                {songs.map((song) => (
                  <CommandItem
                    key={ song._id }
                    value={ [song.en, song.jp, song.romaji, song.producer].filter(Boolean).join(' - ') }
                    onSelect={(currentValue) => {
                      setSongSearchValue(currentValue === songSearchValue ? "" : currentValue)
                      onValueChange(currentValue === songSearchValue ? "" : currentValue)
                      
                      setOpen(false)
                    }}
                    className="text-md m-1 cursor-pointer"
                  >
                    {song.en + " - " + song.producer}
                  </CommandItem>
                ))}
            </CommandList>
          </>
        ) : (
          <>
            <CommandEmpty className="h-0"/>
            <CommandList/>
          </>
        )}
      </ScrollArea>
    </Command>
  );
}

export default SongSearch;