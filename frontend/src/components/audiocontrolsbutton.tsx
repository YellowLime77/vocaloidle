import React from 'react';

import './audiocontrolsbutton.css';

import { CirclePlay } from 'lucide-react';

interface Props {
    playing: boolean;
}

const AudioControlButton: React.FC<Props> = () => {
    return (
        <div className="justify-center h-1/6 w-1/6">
            <CirclePlay className="h-16 w-16" />
        </div>
    );
}

export default AudioControlButton;