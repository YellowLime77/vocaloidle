import './audiosection.css';
import React from 'react';

interface Props { 
    width: string;
    state: string;
}

const AudioSection: React.FC<Props> = (props) => {
    return (
        <div className={"h-full border  " + (props.state === "playing" ? "bg-rose-300 border-rose-100" : (props.state === "played" ? "bg-rose-300/60 border-rose-100/60" : "bg-purple-900/20 border-purple-600"))}
            style={{width: parseInt(props.width, 10) / 16 * 100 + "%"}}
        />
    );
}

export default AudioSection;