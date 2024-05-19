import React, {useState} from 'react';

import './audiocontrolsbutton.css';

import { CirclePlay, CirclePause } from 'lucide-react';

interface Props {
    playing: boolean;
}

const AudioControlButton: React.FC<Props> = (props) => {
    const [playing, setPlaying] = useState(props.playing);

    const playSong = () => {
        console.log("Playing song");

        setPlaying(true);
    }

    const pauseSong = () => {
        console.log("Pausing song");

        setPlaying(false);
    }

    return (
        <div className="justify-center w-20 h-20 cursor-pointer hover:opacity-75 active:opacity-30 active:scale-90 duration-200">
            {playing ? (<CirclePause className="w-full h-full" onClick={pauseSong}/>) : (<CirclePlay className="w-full h-full" onClick={playSong}/>)}
        </div>
    );
}

export default AudioControlButton;