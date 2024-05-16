
import './App.css'

import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"

import { ThemeProvider } from './components/theme-provider'

import vocaloidle from '/Vocaloidle.svg'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <header className="border-b flex border-cyan-600 justify-center align-middle p-2 max-h-20 bg-cyan-800 shadow">
        <img src={vocaloidle} className="max-h-20" alt="Vocaloidle logo" />
      </header>
      <div className="container w-full h-screen bg-cyan-900/20 border shadow flex flex-row space-y-4 p-4 items-center justify-center">
        <Button>Click me</Button>
      </div>
    </ThemeProvider>
  )
}

export default App
