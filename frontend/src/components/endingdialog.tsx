import React from 'react';

// import { SiApplemusic } from "react-icons/si";
import { /*FaSpotify,*/ FaYoutube } from "react-icons/fa";

// import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import Confetti from 'react-confetti'

import './endingdialog.css';
import { Button } from './ui/button';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;

    en: string;
    jp: string;
    romaji: string;
    producer: string;

    src: string;

    spotifyLink: string;
    youtubeLink: string;
    appleMusicLink: string;

    won: boolean;

    imgSrc: string;
}

const EndingDialog: React.FC<Props> = ({open, setOpen, won/*, src*/, imgSrc, en, jp, romaji, producer, youtubeLink}) => {
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

    const onClick = () => {
        setOpen(false);
    }

    const preventClose = (e: React.MouseEvent) => {
        e.stopPropagation();
    }

    const newSong = () => {
        location.reload();
    }

    return (
        <>
            <div ref={endingRef} className="h-screen w-full flex fixed justify-center items-center top-0 left-0 right-0 bottom-0 bg-transparent/30 backdrop-blur-lg z-20 duration-500" onClick={onClick}>
                { won ? <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} gravity={0.03} tweenDuration={50000} numberOfPieces={window.innerWidth} className="z-30" colors={
                    ["#06b6d4", "#e3007f"]
                } /> : null }
                <div className='container h-fit w-fit max-w-full max-h-full bg-slate-800 border-slate-700 border rounded-md p-8 flex flex-col space-y-2 items-center justify-center text-center shadow-lg z-40' onClick={preventClose}>
                    <p className={"text-4xl my-4 text-" + (won ? "cyan" : "rose") + "-300 font-extrabold"}>{won ? "Congrats!" : "Better luck next time..."}</p>

                    <div className="w-fit h-fit max-w-full max-h-screen flex justify-center">
                        <img src={imgSrc} className="annoying-image h-full w-full object-cover rounded-md shadow-lg" alt="Ending"/>
                    </div>

                    <p className='text-xl text-white font-medium'>{en + " - " + producer}</p>
                    <p className='text-lg text-white/75'>{jp}</p>
                    <p className='text-lg text-white/75'>{romaji}</p>

                    {/* <AudioPlayer
                        src={src}
                        showJumpControls={false}
                        showSkipControls={false}
                        showDownloadProgress={true}
                        autoPlay={false}
                        customAdditionalControls={[]}
                        volume={0.5}
                        preload={"auto"}
                        className="rounded-md shadow-lg bg-cyan-50 border-2 w-full h-fit duration-300 hidden md:block"
                    /> */}

                    <div className="container flex flex-col h-fit w-fit space-y-2 p-4 md:flex-row md:space-x-2">
                        {/* <a href={spotifyLink} target="_blank" className="container w-fit flex flex-row space-x-4 bg-green-600 text-white text-lg hover:bg-green-700 py-2 px-3 rounded-xl shadow-lg items-center text-center duration-300">
                            <FaSpotify className="w-10 h-10"/>
                            <p>Spotify</p>
                        </a> */}
                        <a href={youtubeLink} target="_blank" className="container w-fit flex flex-row space-x-4 bg-red-700 text-white text-lg hover:bg-red-800 py-2 px-3 rounded-xl shadow-lg items-center text-center duration-300">
                            <FaYoutube className="w-10 h-10"/>
                            <p>YouTube</p>
                        </a>
                        {/* <a href={appleMusicLink} target="_blank" className="container w-fit flex flex-row space-x-4 bg-rose-600 text-white text-lg hover:bg-rose-700 py-2 px-3 rounded-xl shadow-lg items-center text-center duration-300">
                            <SiApplemusic className="w-10 h-10"/>
                            <p>Apple Music</p>
                        </a> */}
                    </div>
                    <div className="container w-full h-[10px]"/>
                    <Button className="bg-cyan-700 select-none text-white hover:bg-cyan-800 w-32 h-12 justify-center text-md m-2" onClick={newSong}>New Song</Button>
                </div>
            </div>
        </>
    );
}

export default EndingDialog;