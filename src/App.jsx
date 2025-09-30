import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import QRGenerator from './pages/QRGenerator'
import ImageResizer from './pages/ImageResizer'
import YouTubeDownloader from './pages/YouTubeDownloader'
import CoinFlip from './pages/CoinFlip'
import PDFTools from './pages/PDFTools'
import TextTools from './pages/TextTools'
import ColorTools from './pages/ColorTools'
import UnitConverter from './pages/UnitConverter'
import About from './pages/About'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-beige-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/qr-generator" element={<QRGenerator />} />
            <Route path="/image-resizer" element={<ImageResizer />} />
            <Route path="/youtube-downloader" element={<YouTubeDownloader />} />
            <Route path="/coin-flip" element={<CoinFlip />} />
            <Route path="/pdf-tools" element={<PDFTools />} />
            <Route path="/text-tools" element={<TextTools />} />
            <Route path="/color-tools" element={<ColorTools />} />
            <Route path="/unit-converter" element={<UnitConverter />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
