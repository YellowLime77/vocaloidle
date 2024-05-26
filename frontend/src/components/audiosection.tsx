import './audiosection.css';
import React from 'react';

interface Props { 
    width: string;
    state: string;
}

const AudioSection: React.FC<Props> = (props) => {
    return (
        <div className={"h-full border  " + (props.state === "playing" ? "bg-cyan-500 border-cyan-100" : (props.state === "played" ? "bg-cyan-700/80 border-cyan-300/80" : "bg-muted border-slate-500"))}
            style={{width: parseInt(props.width, 10) / 16 * 100 + "%"}}
        />
    );
}

export default AudioSection;