import React, {useEffect, useState} from 'react';

import './songsearch.css';

import {
  Command,
  CommandEmpty,
  CommandList,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { Input } from "@/components/ui/input"

interface Props {
  songs: {
    _id: string;
    producer: string;
    en: string;
    jp: string;
    romaji: string;
  }[];

  value: string;
  onValueChange: (value: string) => void;
}

const SongSearch: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  useEffect(() => {
    setValue(props.value);
  }, [props.value])

  return (
    <Command className="h-fit w-full duration-1000">
      <CommandInput className="text-md" placeholder="Search song..." value={value} onInput={(e) => {
        setValue(e.currentTarget.value);
        props.onValueChange(e.currentTarget.value);

        if (e.currentTarget.value === "" && open) {
          setOpen(false)
        } else {
          setOpen(true)
        }
      }}/>

      { open ? (
        <>
          <CommandEmpty>No Songs Found</CommandEmpty>
          <CommandList className="p-2 h-fit">
            {props.songs.map((song) => (
              <CommandItem
                key={ song._id }
                value={ song.en + " - " + song.jp + " - " + song.romaji + " - " + song.producer }
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  props.onValueChange(currentValue === value ? "" : currentValue)
                  
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
    </Command>
  );
}

export default SongSearch;