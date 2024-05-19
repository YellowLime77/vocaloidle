
import './App.css'

import { Button } from '@/components/ui/button' 

import { ThemeProvider } from './components/theme-provider'

import vocaloidle from '/Vocaloidle.svg'

import Card from './components/card'
import SongSearch from './components/songsearch'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="container flex flex-col h-screen">
        <header className="border-b flex border-cyan-600 justify-center align-middle p-2 max-h-20 bg-cyan-800 shadow">
          <img src={vocaloidle} className="max-h-20" alt="Vocaloidle logo" />
        </header>

        <div className="container w-full h-full bg-cyan-900/20 border rounded-b-lg shadow flex-row space-y-4 p-4 items-center justify-center">
          <Card song="Ghost Rule" author="DECO*27" shown={true} correct={false}  />
          <Card song="Miku" author="Anamanaguchi" shown={true} correct={true} />
          <Card song="" author="" shown={false} />
          <Card song="" author="" shown={false} />
          <Card song="" author="" shown={false} />
          <Card song="" author="" shown={false} />

          <div className="h-5" />

          <div className="container flex flex-row space-x-2 px-0 w-full h-fit">
            <SongSearch songs={["Ghost Rule", "Miku", "World is Mine", "Senbonzakura", "Rolling Girl", "Tell Your World"]} />
            <Button className="bg-cyan-700 text-white hover:bg-cyan-800 w-20 h-12 justify-center">Guess</Button>
          </div>
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
