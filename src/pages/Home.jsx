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
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Simple Tools for{' '}
          <span className="text-primary-600 dark:text-primary-400">Daily Use</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Quick, free, and easy-to-use utilities for everyone. No registration required, completely free forever.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#tools"
            className="btn-primary inline-flex items-center justify-center space-x-2 text-lg px-8 py-4"
          >
            <span>Explore Tools</span>
            <ArrowRight className="h-5 w-5" />
          </a>
          <Link
            to="/about"
            className="inline-flex items-center justify-center space-x-2 text-lg px-8 py-4 border-2 border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl font-medium transition-colors duration-200"
          >
            <span>Learn More</span>
          </Link>
        </div>
      </div>

      {/* Tools Section */}
      <section id="tools" className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Available Tools
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon
            return (
              <div key={index} className="card p-8 group hover:scale-105 transition-transform duration-300">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl ${
                    tool.color === 'primary' 
                      ? 'bg-primary-100 dark:bg-primary-900/30' 
                      : 'bg-secondary-100 dark:bg-secondary-900/30'
                  }`}>
                    <IconComponent className={`h-8 w-8 ${
                      tool.color === 'primary'
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-secondary-600 dark:text-secondary-400'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {tool.description}
                    </p>
                    
                    <Link
                      to={tool.path}
                      className={`inline-flex items-center space-x-2 font-medium transition-colors duration-200 ${
                        tool.color === 'primary'
                          ? 'text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300'
                          : 'text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300'
                      }`}
                    >
                      <span>{tool.button}</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
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
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Why Choose Our Tools?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Fast & Simple
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              No complex setup or registration. Just upload, process, and download.
            </p>
          </div>
          
          <div className="p-6">
            <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Privacy First
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your files are processed locally and never stored on our servers.
            </p>
          </div>
          
          <div className="p-6">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💯</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Completely Free
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              All tools are free to use with no hidden costs or premium features.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
