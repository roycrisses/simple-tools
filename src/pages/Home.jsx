import React from 'react'
import { Link } from 'react-router-dom'
import { QrCode, Image, Download, Coins, FileText, Type, Palette, Calculator, ArrowRight, Globe, Link as LinkIcon, Search, BookOpen, Target, Minimize2 } from 'lucide-react'

const Home = () => {
  const tools = [
    { name: 'QR Generator', description: 'Create QR codes instantly', path: '/qr-generator', icon: QrCode },
    { name: 'Image Resizer', description: 'Resize images quickly', path: '/image-resizer', icon: Image },
    { name: 'Image Compressor', description: 'Reduce image file sizes', path: '/image-compressor', icon: Minimize2 },
    { name: 'PDF Tools', description: 'Merge, split, convert PDFs', path: '/pdf-tools', icon: FileText },
    { name: 'Text Tools', description: 'Text manipulation utilities', path: '/text-tools', icon: Type },
    { name: 'Color Tools', description: 'Color picker and palette', path: '/color-tools', icon: Palette },
    { name: 'Unit Converter', description: 'Convert units easily', path: '/unit-converter', icon: Calculator },
    { name: 'Domain Authority', description: 'Check SEO metrics', path: '/domain-authority-checker', icon: Globe },
    { name: 'Backlink Checker', description: 'Analyze backlinks', path: '/backlink-checker', icon: LinkIcon },
    { name: 'Website SEO Checker', description: 'Complete SEO analysis', path: '/website-seo-checker', icon: Search },
    { name: 'Plagiarism Checker', description: 'Check content originality', path: '/plagiarism-checker', icon: FileText },
    { name: 'Grammar Checker', description: 'Fix grammar and spelling', path: '/grammar-checker', icon: BookOpen },
    { name: 'Keyword Research', description: 'Find profitable keywords', path: '/keyword-research', icon: Target },
    { name: 'Coin Flip', description: 'Random coin flip', path: '/coin-flip', icon: Coins },
  ]

  return (
    <div className="min-h-screen">
      {/* Minimal Hero Section */}
      <section className="minimal-hero">
        <div className="minimal-container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="minimal-h1 mb-6">
              Simple Tools for Everyone
            </h1>
            
            <p className="minimal-text text-lg mb-8">
              Free, fast, and easy-to-use tools for your daily tasks. No sign-up required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="#tools"
                className="minimal-button minimal-button-primary px-6 py-3"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Browse Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
              
              <Link
                to="/about"
                className="minimal-button minimal-button-secondary px-6 py-3"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="tools" className="py-16">
        <div className="minimal-container">
          <div className="text-center mb-12">
            <h2 className="minimal-h2 mb-4">
              Available Tools
            </h2>
            <p className="minimal-text">
              Choose from our collection of useful utilities
            </p>
          </div>
          
          <div className="minimal-grid minimal-grid-3">
            {tools.map((tool, index) => {
              const IconComponent = tool.icon
              return (
                <Link
                  key={index}
                  to={tool.path}
                  className="minimal-card hover:minimal-shadow-lg transition-all duration-200 group"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="minimal-h2 mb-0">
                      {tool.name}
                    </h3>
                  </div>
                  
                  <p className="minimal-text mb-4">
                    {tool.description}
                  </p>
                  
                  <div className="flex items-center minimal-text group-hover:text-blue-500 transition-colors">
                    <span>Try it now</span>
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="minimal-container">
          <div className="text-center mb-12">
            <h2 className="minimal-h2 mb-4">
              Why Choose Simple Tools?
            </h2>
          </div>
          
          <div className="minimal-grid minimal-grid-3">
            <div className="minimal-card text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">⚡</span>
              </div>
              <h3 className="minimal-h2 mb-2">
                Fast & Simple
              </h3>
              <p className="minimal-text">
                No registration required. Just upload, process, and download.
              </p>
            </div>
            
            <div className="minimal-card text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🔒</span>
              </div>
              <h3 className="minimal-h2 mb-2">
                Privacy First
              </h3>
              <p className="minimal-text">
                Your files are processed locally. We never store your data.
              </p>
            </div>
            
            <div className="minimal-card text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">💯</span>
              </div>
              <h3 className="minimal-h2 mb-2">
                Completely Free
              </h3>
              <p className="minimal-text">
                All tools are free to use with no hidden costs or limits.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
