import React from 'react';

import './audiocontrolsbutton.css';

import { CirclePlay, CirclePause } from 'lucide-react';

interface Props {
    playing: boolean;
    setPlaying: (playing: boolean) => void;

    src: string;
    audioRef: React.RefObject<HTMLAudioElement>;
    onTimeUpdate: () => void;
}

const AudioControlButton: React.FC<Props> = ({playing, setPlaying, src, audioRef, onTimeUpdate}) => {

    const playSong = () => {
        console.log("Playing song");

        setPlaying(true);

        if (audioRef.current) {
            audioRef.current.play();
        }
    }

    const pauseSong = () => {
        console.log("Pausing song");

        setPlaying(false);

        if (audioRef.current) {
            audioRef.current.pause();
        }
    }

    return (
        <>
            <div className="justify-center w-20 h-20 cursor-pointer hover:opacity-75 active:opacity-30 active:scale-90 duration-200">
                {playing ? (<CirclePause className="w-full h-full" onClick={pauseSong}/>) : (<CirclePlay className="w-full h-full" onClick={playSong}/>)}
            </div>
            <audio ref={audioRef} src={src} className='h-20' controls onTimeUpdate={onTimeUpdate} preload="auto"/>
        </>
        
    );
}

export default AudioControlButton;