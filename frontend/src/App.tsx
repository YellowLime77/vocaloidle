
import './App.css'

import { Button } from '@/components/ui/button' 

import { ThemeProvider } from './components/theme-provider'

import vocaloidle from '/Vocaloidle.svg'

import Card from './components/card'
import SongSearch from './components/songsearch'
import AudioSection from './components/audiosection'
import AudioControlButton from './components/audiocontrolsbutton'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="container flex flex-col h-screen">
        <header className="border-b flex border-cyan-600 justify-center align-middle p-2 max-h-20 bg-cyan-800 shadow">
          <img src={vocaloidle} className="max-h-20" alt="Vocaloidle logo" />
        </header>

        <div className="container flex flex-col w-full h-full bg-cyan-900/20 border rounded-b-lg shadow space-y-4 p-4 items-center">
          <Card song="Ghost Rule" author="DECO*27" shown={true} correct={false}  />
          <Card song="Miku" author="Anamanaguchi" shown={true} correct={true} />
          <Card song="" author="" shown={false} />
          <Card song="" author="" shown={false} />
          <Card song="" author="" shown={false} />
          <Card song="" author="" shown={false} />

          <div className="h-5" />

          <div className="container flex flex-row space-x-2 px-0 w-full h-full">
            <SongSearch songs={[
              { title: "Ghost Rule", author: "DECO*27" },
              { title: "Miku", author: "Anamanaguchi" },
              { title: "World is Mine", author: "Ryo" },
              { title: "Senbonzakura", author: "Kurousa-P" },
              { title: "Tell Your World", author: "kz" },
              { title: "Melt", author: "ryo"},
              { title: "Rolling Girl", author: "wowaka" },
              { title: "Just Be Friends", author: "Dixie Flatline" },
              { title: "ODDS&ENDS", author: "ryo" },
              { title: "Hibana", author: "DECO*27" },
              { title: "Lemon", author: "Hachi" }
            ]} />
            <Button className="bg-cyan-700 text-white hover:bg-cyan-800 w-24 h-12 justify-center text-md">Guess</Button>
          </div>

          <div className="h-4 w-full flex flex-row">
            <AudioSection width="1" done/>
            <AudioSection width="1"/>
            <AudioSection width="2"/>
            <AudioSection width="3"/>
            <AudioSection width="4"/>
            <AudioSection width="5"/>
            <AudioSection width="6"/>
          </div>

          <AudioControlButton playing={false} />
        </div>

        <div className="h-12 my-2 flex flex-row justify-center space-x-4">
          <a href="https://matthewyang.tech/" className='text-cyan-100'>Made with ❤️ by Matthew Yang</a>
          <a href="https://github.com/YellowLime77/vocaloidle" className="text-cyan-100">GitHub</a>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
