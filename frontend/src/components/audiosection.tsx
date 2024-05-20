import './audiosection.css';
import React from 'react';

interface Props { 
    width: string;
    done?: boolean;
}

const AudioSection: React.FC<Props> = (props) => {
    return (
        <div className={"h-full border  " + (props.done ? "bg-cyan-500 border-cyan-100" : "bg-muted border-slate-500")}
            style={{width: parseInt(props.width, 10) / 16 * 100 + "%"}}
        />
    );
}

export default AudioSection;