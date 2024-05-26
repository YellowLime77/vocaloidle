import React from 'react';

import './card.css'

interface Props {
    label: string;
    shown: boolean;
    colour: string;
}

const Card: React.FC<Props> = (props) => {
  return (
    <div className={(props.shown ? "shown bg-" + props.colour + "-600 border-" + props.colour + "-800" : "border-slate-700/50 bg-muted") + " card flex items-center justify-center text-center rounded-md border-4 px-4 py-2 text-lg overflow-clip h-full min-h-12 max-h-20 duration-700 font-bold w-full"}>
        {props.shown ? props.label : ""}
    </div>
  );
}

export default Card;