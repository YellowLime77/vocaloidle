import React from 'react';

import { Button } from '@/components/ui/button';

import './endingdialog.css';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;

    en: string;
    jp: string;
    romaji: string;
    producer: string;

    spotifyLink: string;
    youtubeLink: string;
    appleMusicLink: string;

    won: boolean;

    imgSrc: string;
}

const EndingDialog: React.FC<Props> = ({open, setOpen, won, imgSrc, en, jp, romaji, producer, spotifyLink, youtubeLink, appleMusicLink}) => {
    const endingRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (open) {
            endingRef.current!.style.opacity = "1";
            endingRef.current!.style.pointerEvents = "all";
        } else {
            endingRef.current!.style.opacity = "0";
            endingRef.current!.style.pointerEvents = "none";
        }
    }, [open])

    const onClick = () => {
        setOpen(false);
    }

    const preventClose = (e: React.MouseEvent) => {
        e.stopPropagation();
    }

    return (
        <div ref={endingRef} className="h-screen w-full flex fixed justify-center items-center top-0 left-0 right-0 bottom-0 bg-transparent/30 backdrop-blur-lg z-20 duration-500" onClick={onClick}>
            <div className='container h-fit w-fit bg-slate-800 border-slate-700 border rounded-md p-4 flex flex-col space-y-4 items-center justify-center text-center shadow-lg' onClick={preventClose}>
                <p className="text-2xl font-sans text-white">{won ? "Congrats!" : "Better luck next time"}</p>
                <div className="container flex flex-row space-x-2 p-4">
                    <div className="container flex flex-col space-y-2 p-4">

                        <div className="w-fit h-fit min-w-16 min-h-16">
                            <img src={imgSrc} className="w-full h-full object-cover rounded-md shadow-lg" alt="Ending"/>
                        </div>

                        <p className='text-xl font-sans text-white'>{en + " - " + producer}</p>
                        <p className='text-lg font-sans text-white/75'>{jp}</p>
                        <p className='text-lg font-sans text-white/75'>{romaji}</p>
                    </div>
                    <div className="container flex flex-col space-y-2 p-4">
                        <a href={spotifyLink} className="text-white">Spotify</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EndingDialog;