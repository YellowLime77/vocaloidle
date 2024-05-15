
import './App.css'

import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"

import { ThemeProvider } from './components/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-500 h-screen bg-cyan-500 rounded-lg border shadow-lg m-8">
      </div>
    </ThemeProvider>
  )
}

export default App
