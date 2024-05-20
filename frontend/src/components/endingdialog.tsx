import React from 'react';

import './endingdialog.css';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;

    won: boolean;

    imgSrc: string;
}

const EndingDialog: React.FC<Props> = ({open, setOpen, won, imgSrc}) => {
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

    return (
        <div ref={endingRef} className="h-screen w-full flex fixed justify-center items-center top-0 left-0 right-0 bottom-0 bg-transparent/30 backdrop-blur-lg z-20 duration-500">
            <div className='container bg-slate-800 border-rose-900 border-4 rounded-md p-4 flex flex-row items-center justify-center text-center'>
                <img src="" className="w-40 h-40"/>
            </div>
        </div>
    );
}

export default EndingDialog;