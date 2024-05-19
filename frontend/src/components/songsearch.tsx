import React, {useState} from 'react';

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
  songs: string[];
}

const SongSearch: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Command className="h-fit w-full">
      <CommandInput className="text-md" placeholder="Search song..." value={value} onInput={(e) => {
        setValue(e.currentTarget.value);
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
                key={song}
                value={song}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
                className="text-md m-1"
              >
                {song}
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