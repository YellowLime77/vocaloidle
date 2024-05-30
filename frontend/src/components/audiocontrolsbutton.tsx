import React from 'react';

import './audiocontrolsbutton.css';

import play from '/play.svg'
import pause from '/pause.svg'

interface Props {
    playing: boolean;
    setPlaying: (playing: boolean) => void;

    src: string;
    audioRef: React.RefObject<HTMLAudioElement>;
    onTimeUpdate: () => void;
}

const AudioControlButton: React.FC<Props> = ({playing, setPlaying, src, audioRef, onTimeUpdate}) => {
    const playSong = () => {
        setPlaying(true);

        if (audioRef.current) {
            audioRef.current.play();
        }
    }

    const pauseSong = () => {
        setPlaying(false);

        if (audioRef.current) {
            audioRef.current.pause();
        }
    }

    return (
        <>
            <button className="justify-center w-20 h-20 cursor-pointer rounded-full hover:opacity-75 active:opacity-30 active:scale-90 duration-200">
            {playing ? (<img src={pause} className="w-full h-full" draggable={false} alt="Play" onClick={pauseSong} />) : (<img src={play} className="w-full h-full" draggable={false} alt="Pause button" onClick={playSong} />)}
            </button>
            <audio ref={audioRef} src={src} className='h-20' onTimeUpdate={onTimeUpdate} preload="auto"/>
        </>
        
    );
}

export default AudioControlButton;