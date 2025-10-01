import React from 'react'
import { Link } from 'react-router-dom'
import { 
  QrCode, 
  Image, 
  Download, 
  Coins, 
  FileText, 
  Type, 
  Palette, 
  Calculator,
  ArrowRight,
  Zap,
  Shield,
  Heart
} from 'lucide-react'

const Tools = () => {
  const tools = [
    {
      name: 'QR Code Generator',
      description: 'Convert any text, URL, or image into a scannable QR code instantly',
      features: [
        'Text to QR conversion',
        'Image to QR with hosting',
        'Customizable size and border',
        'High-quality PNG download',
        'Mobile-friendly scanning'
      ],
      icon: QrCode,
      path: '/qr-generator',
      color: 'blue',
      status: 'Popular'
    },
    {
      name: 'Image Resizer',
      description: 'Resize images to custom dimensions while maintaining quality',
      features: [
        'Multiple format support (JPG, PNG, GIF)',
        'Custom width and height',
        'Aspect ratio preservation',
        'Batch processing ready',
        'No quality loss'
      ],
      icon: Image,
      path: '/image-resizer',
      color: 'green',
      status: 'New'
    },
    {
      name: 'YouTube Downloader',
      description: 'Download YouTube videos and audio in various formats and qualities',
      features: [
        'Multiple video qualities',
        'Audio-only downloads',
        'Fast processing',
        'No registration required',
        'Direct download links'
      ],
      icon: Download,
      path: '/youtube-downloader',
      color: 'red',
      status: 'Popular'
    },
    {
      name: 'Coin Flip',
      description: 'Make quick, unbiased decisions with our virtual coin flip tool',
      features: [
        'Realistic coin animation',
        'Statistics tracking',
        'Multiple flip sessions',
        'Fair randomization',
        'Quick decision making'
      ],
      icon: Coins,
      path: '/coin-flip',
      color: 'yellow',
      status: 'Fun'
    },
    {
      name: 'PDF Tools',
      description: 'Comprehensive PDF manipulation tools for all your document needs',
      features: [
        'Merge multiple PDFs',
        'Split PDF pages',
        'Compress file size',
        'Convert to/from PDF',
        'Password protection'
      ],
      icon: FileText,
      path: '/pdf-tools',
      color: 'purple',
      status: 'New'
    },
    {
      name: 'Text Tools',
      description: 'Powerful text manipulation and analysis utilities',
      features: [
        'Word and character count',
        'Case conversion (upper/lower)',
        'Text formatting',
        'Find and replace',
        'Text analysis'
      ],
      icon: Type,
      path: '/text-tools',
      color: 'indigo',
      status: 'New'
    },
    {
      name: 'Color Tools',
      description: 'Professional color picker and palette generation tools',
      features: [
        'Color picker from images',
        'Palette generation',
        'Color format conversion',
        'Gradient creator',
        'Accessibility checker'
      ],
      icon: Palette,
      path: '/color-tools',
      color: 'pink',
      status: 'New'
    },
    {
      name: 'Unit Converter',
      description: 'Convert between different units of measurement instantly',
      features: [
        'Length, weight, temperature',
        'Currency conversion',
        'Area and volume',
        'Speed and time',
        'Real-time calculations'
      ],
      icon: Calculator,
      path: '/unit-converter',
      color: 'teal',
      status: 'New'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Popular': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      case 'New': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'Fun': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'Coming Soon': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    }
  }

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        border: 'border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600',
        iconBg: 'bg-blue-100 dark:bg-blue-900/30',
        iconText: 'text-blue-600 dark:text-blue-400',
        button: 'bg-blue-500 hover:bg-blue-600',
        dot: 'bg-blue-500'
      },
      green: {
        border: 'border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-600',
        iconBg: 'bg-green-100 dark:bg-green-900/30',
        iconText: 'text-green-600 dark:text-green-400',
        button: 'bg-green-500 hover:bg-green-600',
        dot: 'bg-green-500'
      },
      red: {
        border: 'border-red-200 dark:border-red-700 hover:border-red-300 dark:hover:border-red-600',
        iconBg: 'bg-red-100 dark:bg-red-900/30',
        iconText: 'text-red-600 dark:text-red-400',
        button: 'bg-red-500 hover:bg-red-600',
        dot: 'bg-red-500'
      },
      yellow: {
        border: 'border-yellow-200 dark:border-yellow-700 hover:border-yellow-300 dark:hover:border-yellow-600',
        iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
        iconText: 'text-yellow-600 dark:text-yellow-400',
        button: 'bg-yellow-500 hover:bg-yellow-600',
        dot: 'bg-yellow-500'
      },
      purple: {
        border: 'border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600',
        iconBg: 'bg-purple-100 dark:bg-purple-900/30',
        iconText: 'text-purple-600 dark:text-purple-400',
        button: 'bg-purple-500 hover:bg-purple-600',
        dot: 'bg-purple-500'
      },
      indigo: {
        border: 'border-indigo-200 dark:border-indigo-700 hover:border-indigo-300 dark:hover:border-indigo-600',
        iconBg: 'bg-indigo-100 dark:bg-indigo-900/30',
        iconText: 'text-indigo-600 dark:text-indigo-400',
        button: 'bg-indigo-500 hover:bg-indigo-600',
        dot: 'bg-indigo-500'
      },
      pink: {
        border: 'border-pink-200 dark:border-pink-700 hover:border-pink-300 dark:hover:border-pink-600',
        iconBg: 'bg-pink-100 dark:bg-pink-900/30',
        iconText: 'text-pink-600 dark:text-pink-400',
        button: 'bg-pink-500 hover:bg-pink-600',
        dot: 'bg-pink-500'
      },
      teal: {
        border: 'border-teal-200 dark:border-teal-700 hover:border-teal-300 dark:hover:border-teal-600',
        iconBg: 'bg-teal-100 dark:bg-teal-900/30',
        iconText: 'text-teal-600 dark:text-teal-400',
        button: 'bg-teal-500 hover:bg-teal-600',
        dot: 'bg-teal-500'
      }
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Retro Window Header */}
      <div className="retro-window mb-8">
        <div className="retro-window-header">
          <div className="flex items-center space-x-3">
            <span className="text-lg font-bold">ALL TOOLS v1.0</span>
          </div>
          <div className="retro-window-controls">
            <div className="retro-window-control control-minimize"></div>
            <div className="retro-window-control control-maximize"></div>
            <div className="retro-window-control control-close"></div>
          </div>
        </div>
        <div className="p-8 bg-gray-100 dark:bg-gray-700 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6 font-mono">
            ALL TOOLS FOR{' '}
            <span className="text-blue-600 dark:text-blue-400">DAILY USE</span>
          </h1>
          <p className="text-xl md:text-2xl text-black dark:text-white mb-8 max-w-3xl mx-auto font-mono font-bold">
            {'>> COMPLETE COLLECTION OF FREE UTILITIES FOR EVERYONE <<'}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="card p-6 text-center">
          <div className="w-16 h-16 bg-blue-400 border-4 border-black flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-mono font-bold text-black">{tools.length}</span>
          </div>
          <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-mono">
            TOTAL TOOLS
          </h3>
          <p className="text-black dark:text-white font-mono">
            AVAILABLE NOW
          </p>
        </div>
        
        <div className="card p-6 text-center">
          <div className="w-16 h-16 bg-green-400 border-4 border-black flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-mono">
            100% PRIVATE
          </h3>
          <p className="text-black dark:text-white font-mono">
            NO DATA STORED
          </p>
        </div>
        
        <div className="card p-6 text-center">
          <div className="w-16 h-16 bg-yellow-400 border-4 border-black flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💯</span>
          </div>
          <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-mono">
            ALWAYS FREE
          </h3>
          <p className="text-black dark:text-white font-mono">
            NO HIDDEN COSTS
          </p>
        </div>
      </div>

      {/* Tools List */}
      <div className="card p-6 mb-8">
        <div className="bg-green-500 text-black font-bold py-2 px-4 mb-4 border-b-4 border-black">
          <h2 className="text-3xl md:text-4xl font-mono text-center">
            [TOOLS] COMPLETE COLLECTION
          </h2>
        </div>
      </div>
      
      <div className="space-y-6">
        {tools.map((tool, index) => {
          const IconComponent = tool.icon
          const isComingSoon = tool.status === 'Coming Soon'
          const colorClasses = getColorClasses(tool.color)
          
          return (
            <div 
              key={index} 
              className={`card transition-all duration-200 ${!isComingSoon ? 'hover:shadow-lg' : 'opacity-75'}`}
              style={{boxShadow: '4px 4px 0px #000, 8px 8px 0px rgba(0,0,0,0.3)'}}
            >
              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Left Side - Icon and Basic Info */}
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 border-4 border-black flex items-center justify-center mb-4 ${colorClasses.iconBg}`}>
                      <IconComponent className={`h-10 w-10 text-black`} />
                    </div>
                    <span className={`inline-block px-3 py-1 text-sm font-bold font-mono border-2 border-black ${getStatusColor(tool.status)}`}>
                      {tool.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Middle - Description and Features */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-black dark:text-white mb-3 font-mono">
                      {tool.name.toUpperCase()}
                    </h3>
                    <p className="text-black dark:text-white mb-4 text-lg font-mono">
                      {tool.description}
                    </p>
                    
                    {/* Features List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {tool.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-black dark:text-white font-mono font-bold">
                          <span className="mr-2 text-black">{'>> '}</span>
                          {feature.toUpperCase()}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Side - Action Button */}
                  <div className="flex-shrink-0 lg:ml-6">
                    {isComingSoon ? (
                      <div className="px-6 py-3 bg-gray-400 text-black font-bold font-mono border-4 border-black cursor-not-allowed">
                        COMING SOON
                      </div>
                    ) : (
                      <Link
                        to={tool.path}
                        className={`inline-flex items-center space-x-2 px-6 py-3 ${colorClasses.button} text-black font-bold font-mono border-4 border-black transition-all duration-200 group hover:translate-x-1 hover:translate-y-1`}
                        style={{boxShadow: '4px 4px 0px #000'}}
                      >
                        <span>USE TOOL</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Need a Specific Tool?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          We're constantly adding new tools based on user feedback. Have a suggestion for a tool that would make your life easier?
        </p>
        <Link
          to="/about"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors duration-200"
        >
          <span>Suggest a Tool</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

export default Tools
