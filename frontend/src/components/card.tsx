import React from 'react';

import './card.css'

interface Props {
    song: string;
    author: string;
    shown: boolean;
    correct?: boolean;
}

const Card: React.FC<Props> = (props) => {
  return (
    <div className={(props.shown ? "shown " + (!props.correct ? "border-rose-900 bg-rose-700 shown" : "border-green-900 bg-green-700") : "border-slate-900 bg-muted") + " card flex items-center justify-center rounded-md border-4 px-4 py-3 font-sans text-lg h-16 duration-700 w-full"}>
        {props.shown ? props.song + " by " + props.author : ""}
    </div>
  );
}

export default Card;