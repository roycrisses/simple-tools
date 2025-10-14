import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
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
// New SEO Tools
import DomainAuthorityChecker from './pages/DomainAuthorityChecker'
import BacklinkChecker from './pages/BacklinkChecker'
import WebsiteSEOChecker from './pages/WebsiteSEOChecker'
// New Text Tools
import PlagiarismChecker from './pages/PlagiarismChecker'
import GrammarChecker from './pages/GrammarChecker'
// New Keyword Tools
import KeywordResearch from './pages/KeywordResearch'
// New Image Tools
import ImageCompressor from './pages/ImageCompressor'

function App() {

  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-beige-50 transition-colors duration-300">
          <Navbar />
          <main className="pt-20">
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
              {/* New SEO Tools Routes */}
              <Route path="/domain-authority-checker" element={<DomainAuthorityChecker />} />
              <Route path="/backlink-checker" element={<BacklinkChecker />} />
              <Route path="/website-seo-checker" element={<WebsiteSEOChecker />} />
              {/* New Text Tools Routes */}
              <Route path="/plagiarism-checker" element={<PlagiarismChecker />} />
              <Route path="/grammar-checker" element={<GrammarChecker />} />
              {/* New Keyword Tools Routes */}
              <Route path="/keyword-research" element={<KeywordResearch />} />
              {/* New Image Tools Routes */}
              <Route path="/image-compressor" element={<ImageCompressor />} />
              </Routes>
            </Layout>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App
