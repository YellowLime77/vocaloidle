import { useEffect, useState, useRef } from 'react'

import './App.css'

import { Button } from '@/components/ui/button' 
import { Separator } from '@/components/ui/separator'

import { ThemeProvider } from './components/theme-provider'

import vocaloidle from '/Vocaloidle.svg'

import Card from './components/card'
import SongSearch from './components/songsearch'
import AudioSection from './components/audiosection'
import AudioControlButton from './components/audiocontrolsbutton'
import EndingDialog from './components/endingdialog'

import axios from 'axios'

function App() {
  const [songs, setSongs] = useState([]);
  const [songSearchValue, setSongSearchValue] = useState("");
  const [correctSong, setCorrectSong] = useState("");

  const [index, setIndex] = useState(0);

  const [src, setSrc] = useState("")

  const [durationMulti] = useState(2);
  const [playing, setPlaying] = useState(false);
  const [audioLength, setAudioLength] = useState(1 * durationMulti);

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

  const [cards] = useState([
    {label: "", shown: false, correct: false},
    {label: "", shown: false, correct: false},
    {label: "", shown: false, correct: false},
    {label: "", shown: false, correct: false},
    {label: "", shown: false, correct: false},
    {label: "", shown: false, correct: false}
  ])

  const [audioSections] = useState([
    {width: "1", done: true},
    {width: "1", done: false},
    {width: "2", done: false},
    {width: "3", done: false},
    {width: "4", done: false},
    {width: "5", done: false}
  ])

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);


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
        setCorrectSong(response.en + " - " + response.jp + " - " + response.romaji + " - " + response.producer);
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
      audioRef.current.volume = 0.5;
    }

  }, [])

  const submitGuess = () => {
    if (songSearchValue === "") {
      return;
    }

    setPlaying(false);
    audioRef.current!.pause();
    
    if (index >= 5) {
      setAudioLength(9999);
      setWon(false);
      setEndingOpen(true);
      return;
    }

    const card = cards[index];
    card.label = songSearchValue;
    card.shown = true;

    if (songSearchValue === correctSong) {
      card.correct = true;
      setAudioLength(9999);
      setWon(true);
      setEndingOpen(true);
      return;
    } else {
      card.correct = false;
    }

    setSongSearchValue("");

    setIndex(index + 1);

    audioSections[index + 1].done = true;

    if (index + 1 === 1) setAudioLength(2 * durationMulti);
    else if (index + 1 === 2) setAudioLength(4 * durationMulti);
    else if (index + 1 === 3) setAudioLength(7 * durationMulti);
    else if (index + 1 === 4) setAudioLength(11 * durationMulti);
    else if (index + 1 === 5) setAudioLength(16 * durationMulti);
    else setAudioLength(9999);

    audioRef.current!.currentTime = 0;
  }

  const onTimeUpdate = () => {
    if (audioRef.current) {
      if (audioRef.current.currentTime >= audioLength) {
          setPlaying(false);
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
      }
    }
}

  const handleSongSearchChange = (newValue: string) => {
    setSongSearchValue(newValue);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div ref={overlayRef} className="flex items-center text-4xl text-center justify-center fixed w-full h-screen top-0 left-0 right-0 bottom-0 bg-transparent/30 backdrop-blur-lg z-20 duration-500">
        Loading...
      </div>

      <EndingDialog src={src} open={endingOpen} setOpen={setEndingOpen} won={won} imgSrc={imgSrc} en={en} jp={jp} romaji={romaji} producer={producer} spotifyLink={spotifyLink} youtubeLink={youtubeLink} appleMusicLink={appleMusicLink} />

      <header className="border-b flex border-cyan-600 justify-center align-middle p-2 max-h-20 bg-cyan-800 shadow">
        <img src={vocaloidle} className="max-h-20" alt="Vocaloidle logo" />
      </header>
      <div className="container flex flex-col" style={{height: "calc(100vh - 5rem)"}}>
        <div className="container flex flex-col w-full h-full bg-cyan-900/20 border rounded-b-lg shadow space-y-4 p-4 items-center">
          { cards.map((card) => (
            <Card label={card.label} shown={card.shown} correct={card.correct} />
          )) }

          <div className="h-5" />


          <div className="container flex flex-row space-x-2 px-0 w-full h-full">
            <SongSearch songs={songs} songSearchValue={songSearchValue} setSongSearchValue={setSongSearchValue} onValueChange={handleSongSearchChange} />
            <Button className="bg-cyan-700 text-white hover:bg-cyan-800 w-32 h-12 justify-center text-md" onClick={submitGuess}>Guess</Button>
          </div>

          <div className="h-4 w-full flex flex-row">
            { audioSections.map((audioSection) => (
              <AudioSection width={audioSection.width} done={audioSection.done} />
            )) }
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
