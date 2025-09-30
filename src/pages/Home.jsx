import React from 'react'
import { Link } from 'react-router-dom'
import { QrCode, Image, Download, Coins, ArrowRight } from 'lucide-react'

const Home = () => {
  const tools = [
    {
      name: 'QR Code Generator',
      description: 'Convert text, links, or images into QR codes',
      button: 'Generate QR',
      icon: QrCode,
      path: '/qr-generator',
      color: 'primary'
    },
    {
      name: 'Image Resizer',
      description: 'Resize images to custom dimensions',
      button: 'Resize',
      icon: Image,
      path: '/image-resizer',
      color: 'secondary'
    },
    {
      name: 'YouTube Downloader',
      description: 'Download YouTube videos or audio easily',
      button: 'Download',
      icon: Download,
      path: '/youtube-downloader',
      color: 'primary'
    },
    {
      name: 'Coin Flip',
      description: 'Flip a virtual coin for quick decisions',
      button: 'Flip Coin',
      icon: Coins,
      path: '/coin-flip',
      color: 'secondary'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Retro Hero Section */}
      <div className="retro-window mb-12">
        <div className="retro-window-header">
          <div className="flex items-center space-x-3">
            <span className="text-lg font-bold">SIMPLE TOOLS v1.0</span>
          </div>
          <div className="retro-window-controls">
            <div className="retro-window-control control-minimize"></div>
            <div className="retro-window-control control-maximize"></div>
            <div className="retro-window-control control-close"></div>
          </div>
        </div>
        <div className="p-8 bg-gray-100 dark:bg-gray-700 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6 font-mono">
            SIMPLE TOOLS FOR{' '}
            <span className="text-blue-600 dark:text-blue-400">DAILY USE</span>
          </h1>
          <p className="text-xl md:text-2xl text-black dark:text-white mb-8 max-w-3xl mx-auto font-mono font-bold">
            {'>> QUICK, FREE, AND EASY-TO-USE UTILITIES FOR EVERYONE <<'}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#tools"
              className="btn-primary inline-flex items-center justify-center space-x-2 text-lg px-8 py-4 font-mono"
            >
              <span>EXPLORE TOOLS</span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link
              to="/about"
              className="btn-secondary inline-flex items-center justify-center space-x-2 text-lg px-8 py-4 font-mono"
            >
              <span>LEARN MORE</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <section id="tools" className="mb-16">
        <div className="card p-6 mb-8">
          <div className="bg-green-500 text-black font-bold py-2 px-4 mb-4 border-b-4 border-black">
            <h2 className="text-3xl md:text-4xl font-mono text-center">
              [TOOLS] AVAILABLE UTILITIES
            </h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon
            return (
              <div key={index} className="card p-8 group">
                <div className="flex items-start space-x-4">
                  <div className={`p-4 border-3 border-black ${
                    tool.color === 'primary' 
                      ? 'bg-blue-400' 
                      : 'bg-yellow-400'
                  }`}>
                    <IconComponent className="h-8 w-8 text-black" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-mono">
                      {tool.name.toUpperCase()}
                    </h3>
                    <p className="text-black dark:text-white mb-4 font-mono">
                      {tool.description}
                    </p>
                    
                    <Link
                      to={tool.path}
                      className={`btn-${tool.color} inline-flex items-center space-x-2 font-mono`}
                    >
                      <span>{tool.button.toUpperCase()}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="text-center">
        <div className="card p-6 mb-8">
          <div className="bg-purple-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
            <h2 className="text-3xl font-mono">
              [FEATURES] WHY CHOOSE OUR TOOLS?
            </h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-6">
            <div className="w-20 h-20 bg-blue-400 border-4 border-black flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🚀</span>
            </div>
            <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-mono">
              FAST & SIMPLE
            </h3>
            <p className="text-black dark:text-white font-mono">
              NO COMPLEX SETUP OR REGISTRATION. JUST UPLOAD, PROCESS, AND DOWNLOAD.
            </p>
          </div>
          
          <div className="card p-6">
            <div className="w-20 h-20 bg-yellow-400 border-4 border-black flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-mono">
              PRIVACY FIRST
            </h3>
            <p className="text-black dark:text-white font-mono">
              YOUR FILES ARE PROCESSED LOCALLY AND NEVER STORED ON OUR SERVERS.
            </p>
          </div>
          
          <div className="card p-6">
            <div className="w-20 h-20 bg-green-400 border-4 border-black flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💯</span>
            </div>
            <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-mono">
              COMPLETELY FREE
            </h3>
            <p className="text-black dark:text-white font-mono">
              ALL TOOLS ARE FREE TO USE WITH NO HIDDEN COSTS OR PREMIUM FEATURES.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
