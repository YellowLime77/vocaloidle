import React, { useEffect, useState } from 'react'

import './App.css'

import { Button } from '@/components/ui/button' 

import { ThemeProvider } from './components/theme-provider'

import vocaloidle from '/Vocaloidle.svg'

import Card from './components/card'
import SongSearch from './components/songsearch'
import AudioSection from './components/audiosection'
import AudioControlButton from './components/audiocontrolsbutton'

import axios from 'axios'

function App() {
  const [songs, setSongs] = useState([]);
  const [songSearchValue, setSongSearchValue] = useState("");
  const [correctSong, setCorrectSong] = useState("");
  const [index, setIndex] = useState(0);
  const [src, setSrc] = useState("https://vocaloidle-server.onrender.com/songs/audio/")

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
    {width: "5", done: false},
    {width: "6", done: false}
  ])

  useEffect(() => {
    axios.get('https://vocaloidle-server.onrender.com/songs/list')
      .then(res => {
        setSongs(res.data)
      })

    axios.get('https://vocaloidle-server.onrender.com/songs/random')
      .then(res => {
        const response = res.data;
        setCorrectSong(response.en + " - " + response.jp + " - " + response.romaji + " - " + response.producer);
      })
  }, [])

  const submitGuess = () => {
    if (songSearchValue === "") {
      return;
    }
    
    if (index >= 6) {
      console.log("Game Over")
      return;
    }

    const card = cards[index];
    card.label = songSearchValue;
    card.correct = songSearchValue === correctSong;
    card.shown = true;

    setIndex(index + 1);

    audioSections[index + 1].done = true;
  }

  const handleSongSearchChange = (newValue: string) => {
    setSongSearchValue(newValue);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <audio preload="auto" src={src}/>

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
            <SongSearch songs={songs} value={""} onValueChange={handleSongSearchChange} />
            <Button className="bg-cyan-700 text-white hover:bg-cyan-800 w-24 h-12 justify-center text-md" onClick={submitGuess}>Guess</Button>
          </div>

          <div className="h-4 w-full flex flex-row">
            { audioSections.map((audioSection) => (
              <AudioSection width={audioSection.width} done={audioSection.done} />
            )) }
          </div>

          <AudioControlButton playing={false} />
        </div>

        <div className="h-12 my-2 flex flex-row justify-center space-x-4">
          <a href="https://matthewyang.tech/" className='text-cyan-100'>By Matthew Yang</a>
          <p className="text-cyan-100">&bull;</p>
          <a href="https://github.com/YellowLime77/vocaloidle" className="text-cyan-100">GitHub</a>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
