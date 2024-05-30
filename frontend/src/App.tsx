import { useEffect, useState, useRef } from 'react'

import './App.css'

import { ThemeProvider } from './components/theme-provider'

import vocaloidle from '/Vocaloidle.svg'

import Card from './components/card'
import SongSearch from './components/songsearch'
import AudioSection from './components/audiosection'
import AudioControlButton from './components/audiocontrolsbutton'
import EndingDialog from './components/endingdialog'


import AudioMotionAnalyzer from 'audiomotion-analyzer';

import axios from 'axios'

function App() {
  const [songs, setSongs] = useState([]);
  const [songSearchValue, setSongSearchValue] = useState("");
  const [correctSong, setCorrectSong] = useState("");

  const [index, setIndex] = useState(0);

  const [src, setSrc] = useState("")

  const [durationMulti] = useState(2);
  const [playing, setPlaying] = useState(false);
  const [audioLength, setAudioLength] = useState(durationMulti);
  const [startingTime, setStartingTime] = useState(0);

  const [endingOpen, setEndingOpen] = useState(false);
  const [won, setWon] = useState(false);

  const [en, setEn] = useState("");
  const [jp, setJp] = useState("");
  const [romaji, setRomaji] = useState("");
  const [producer, setProducer] = useState("");
  const [spotifyLink, setSpotifyLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [appleMusicLink, setAppleMusicLink] = useState("");

  const [imgSrc, setImgSrc] = useState("")

  // const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  // const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const [cards] = useState([
    {label: "", shown: false, colour: "slate"},
    {label: "", shown: false, colour: "slate"},
    {label: "", shown: false, colour: "slate"},
    {label: "", shown: false, colour: "slate"},
    {label: "", shown: false, colour: "slate"},
    {label: "", shown: false, colour: "slate"}
  ])

  const [audioSections] = useState([
    {width: "1", state: "playing"},
    {width: "1", state: "upcoming"},
    {width: "2", state: "upcoming"},
    {width: "3", state: "upcoming"},
    {width: "4", state: "upcoming"},
    {width: "5", state: "upcoming"},
  ])

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const audioVisualizerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!audioVisualizerRef.current || !audioRef.current) {
        return;
    }

    audioRef.current.crossOrigin = "anonymous";

    let mode = 4;
    if (audioVisualizerRef.current.clientWidth < 500) {
      mode = 6;
    } else if (audioVisualizerRef.current.clientWidth < 1000) {
      mode = 5;
    } else if (audioVisualizerRef.current.clientWidth < 1500) {
      mode = 4;
    } else { 
      mode = 3;
    }

    const audioMotion = new AudioMotionAnalyzer(audioVisualizerRef.current, {
      source: audioRef.current,
      mode: mode,
      barSpace: 0.6,
      bgAlpha: 0.0,
      overlay: true,
      showBgColor: true,
      roundBars: true,
      showPeaks: false,
      showScaleX: false,
      outlineBars: true,
      fillAlpha: 0.5,
      lineWidth: 2,
      maxFreq: 10000,
    });
    
    // Register the gradient
    audioMotion.registerGradient('3939', {
      bgColor: '#011a35',
      dir: 'h',
      colorStops: [
        { color: '#06b6d4', pos: 0.4 },
        { color: '#e3007f', pos: 0.6 }
      ]
    });
    
    // Update the AudioMotionAnalyzer instance with the new gradient
    audioMotion.setOptions({
      gradient: '3939'
    });

  }, [audioVisualizerRef, audioRef])

  useEffect(() => {
    // wait for the request to finish
    axios.get('https://vocaloidle-server.onrender.com/ping')
      .then(res => {
        console.log(res.data)
        overlayRef.current!.style.opacity = "0";
        setTimeout(() => {
          overlayRef.current!.style.display = "none";
        }, 500)
      })

    axios.get('https://vocaloidle-server.onrender.com/songs/list')
      .then(res => {
        setSongs(res.data)
      })

    axios.get('https://vocaloidle-server.onrender.com/songs/random')
      .then(res => {
        const response = res.data;
        setCorrectSong([response.en, response.jp, response.romaji, response.producer].filter(Boolean).join(' - '));
        setSrc("https://vocaloidle-server.onrender.com/songs/audio/" + response._id)
        setImgSrc("https://vocaloidle-server.onrender.com/songs/image/" + response._id)

        setEn(response.en);
        setJp(response.jp);
        setRomaji(response.romaji);
        setProducer(response.producer);

        setSpotifyLink(response.spotify);
        setYoutubeLink(response.yt);
        setAppleMusicLink(response.apple);
      })

    if (audioRef.current) {
      audioRef.current.volume = 0.6;
    }

  }, [])

  const nextSong = () => {
    setSongSearchValue("");

    setIndex(index + 1);

    if (index > 0) audioSections[index - 1].state = "played";

    audioSections[index + 1].state = "playing";

    let tempStartingTime = 0;

    if (index === 0) {
      tempStartingTime = 0;
      setAudioLength(2 * durationMulti);
    } else if (index === 1) {
      tempStartingTime = durationMulti;
      setAudioLength(4 * durationMulti);
    } else if (index === 2) {
      tempStartingTime = 2 * durationMulti;
      setAudioLength(7 * durationMulti);
    } else if (index === 3) {
      tempStartingTime = 4 * durationMulti;
      setAudioLength(11 * durationMulti);
    } else if (index === 4) {
      tempStartingTime = 7 * durationMulti;
      setAudioLength(16 * durationMulti);
    } else {
      tempStartingTime = 0;
      setAudioLength(9999);
    }

    setStartingTime(tempStartingTime);

    audioRef.current!.currentTime = tempStartingTime;

    setPlaying(true);
    audioRef.current!.play();
  }

  const submitGuess = () => {
    if (songSearchValue === "") {
      return;
    }

    // also if the value isn't a valid song
    if (!songs.map((song: { en: string, jp: string, romaji: string, producer: string }) => [song.en, song.jp, song.romaji, song.producer].filter(Boolean).join(' - ')).includes(songSearchValue)) {
      return;
    }

    setPlaying(false);
    audioRef.current!.pause();

    const card = cards[index];
    card.label = songSearchValue;
    card.shown = true;

    if (songSearchValue === correctSong) {
      card.colour = "cyan";
      setAudioLength(9999);
      setWon(true);
      setEndingOpen(true);
      return;
    } else {
      card.colour = "rose";
    }

    if (index >= 5) {
      setAudioLength(9999);
      setWon(false);
      setEndingOpen(true);
      return;
    }

    nextSong();
  }

  const skipGuess = () => {
    setPlaying(false);
    audioRef.current!.pause();

    if (index >= 5) {
      setAudioLength(9999);
      setWon(false);
      setEndingOpen(true);
      return;
    }

    const card = cards[index];
    card.label = "Skipped";
    card.shown = true;
    card.colour = "slate";

    nextSong();
  }

  const onTimeUpdate = () => {
    if (audioRef.current) {
      if (audioRef.current.currentTime >= audioLength) {
          setPlaying(false);
          audioRef.current.pause();
          audioRef.current.currentTime = startingTime;
      }
    }
}

  const handleSongSearchChange = (newValue: string) => {
    setSongSearchValue(newValue);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div ref={overlayRef} className="flex flex-col items-center space-y-4 text-center justify-center fixed w-full h-screen top-0 left-0 right-0 bottom-0 bg-transparent/30 backdrop-blur-lg z-20 duration-500">
        <h1 className="font-extrabold text-[50px] text-cyan-50">Loading...</h1>
        <p className="font-medium text-[20px] text-cyan-300">May take up to 1 minute as the server coldstarts</p>
      </div>

      <EndingDialog src={src} open={endingOpen} setOpen={setEndingOpen} won={won} imgSrc={imgSrc} en={en} jp={jp} romaji={romaji} producer={producer} spotifyLink={spotifyLink} youtubeLink={youtubeLink} appleMusicLink={appleMusicLink} />

      <header className="border-b flex border-cyan-600 justify-center align-middle p-2 max-h-20 bg-cyan-800 shadow">
        <img src={vocaloidle} className="max-h-20 select-none" alt="Vocaloidle logo" />
      </header>
      <div className="container flex flex-col" style={{height: "calc(100vh - 5rem)"}}>
        <div className="container flex flex-col w-full h-full bg-cyan-900/20 border rounded-b-lg shadow space-y-4 p-4 items-center">
          { cards.map((card) => (
            <Card label={card.label} shown={card.shown} colour={card.colour} />
          )) }

          <div className="h-5" />

          <div className="container flex flex-col space-y-2 sm:flex-row sm:space-x-2 justify-center items-center sm:items-start px-0 w-full h-fit">
            <SongSearch songs={songs} songSearchValue={songSearchValue} setSongSearchValue={setSongSearchValue} onValueChange={handleSongSearchChange} />
            <div className="container w-fit space-x-2 flex flex-row-reverse justify-center items-center p-0 m-0 sm:flex-row">
              <Button className="bg-cyan-700 select-none text-white hover:bg-cyan-800 w-32 h-12 justify-center text-md m-2" onClick={submitGuess}>Guess</Button>
              <Button className="bg-rose-700/50 select-none text-white hover:bg-rose-800/50 w-32 h-12 justify-center text-md m-2" onClick={skipGuess}>Skip</Button>
            </div>
          </div>

          <div className="h-full"/>

          <div className="container flex flex-col space-y-0 m-0 p-0">
            <div ref={audioVisualizerRef} className="w-full h-fit min-h-[50px] max-h-[300px]" />

            <div className="h-4 min-h-4 max-h-4 w-full flex flex-row">
              { audioSections.map((audioSection) => (
                <AudioSection width={audioSection.width} state={audioSection.state} />
              )) }
            </div>
          </div>

          <AudioControlButton playing={playing} setPlaying={setPlaying} src={src} audioRef={audioRef} onTimeUpdate={onTimeUpdate} />
        </div>

        <div className="h-12 my-2 flex flex-row justify-center space-x-4">
          <a href="https://matthewyang.tech/" className='text-cyan-100'>By Matthew Yang</a>
          <Separator orientation='vertical' className='h-8'/>
          <a href="https://github.com/YellowLime77/vocaloidle" className="text-cyan-100">GitHub</a>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
