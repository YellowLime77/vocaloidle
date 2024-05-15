import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Button } from '@/components/ui/button'

function App() {
  return (
    <div className="bg-background border rounded-md shadow h-screen w-full flex items-center justify-center">
      <Button>
        Click me
      </Button>
    </div>
  )
}

export default App
