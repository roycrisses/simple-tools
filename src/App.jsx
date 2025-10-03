import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Layout from './components/Layout'
import Footer from './components/Footer'
import Home from './pages/Home'
import Tools from './pages/Tools'
import QRGenerator from './pages/QRGenerator'
import ImageResizer from './pages/ImageResizer'
import YouTubeDownloader from './pages/YouTubeDownloader'
import CoinFlip from './pages/CoinFlip'
import PDFTools from './pages/PDFTools'
import TextTools from './pages/TextTools'
import ColorTools from './pages/ColorTools'
import UnitConverter from './pages/UnitConverter'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'

function App() {
  // Initialize with system preference to avoid flash
  const [darkMode, setDarkMode] = useState(() => {
    // Check if we're in browser environment
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      return savedTheme === 'dark' || (!savedTheme && prefersDark)
    }
    return false
  })

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    // Determine if dark mode should be active
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    
    // Update state and DOM
    setDarkMode(shouldBeDark)
    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#1f2937')
    } else {
      document.documentElement.classList.remove('dark')
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#f97316')
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches)
        if (e.matches) {
          document.documentElement.classList.add('dark')
          document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#1f2937')
        } else {
          document.documentElement.classList.remove('dark')
          document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#f97316')
        }
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    
    // Cleanup listener
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      // Update theme-color for dark mode
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#1f2937')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      // Update theme-color for light mode
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#f97316')
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-beige-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="py-8">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/qr-generator" element={<QRGenerator />} />
              <Route path="/image-resizer" element={<ImageResizer />} />
              <Route path="/youtube-downloader" element={<YouTubeDownloader />} />
              <Route path="/coin-flip" element={<CoinFlip />} />
              <Route path="/pdf-tools" element={<PDFTools />} />
              <Route path="/text-tools" element={<TextTools />} />
              <Route path="/color-tools" element={<ColorTools />} />
              <Route path="/unit-converter" element={<UnitConverter />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
            </Routes>
          </Layout>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
