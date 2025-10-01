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
      status: 'Coming Soon'
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
      status: 'Coming Soon'
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
      status: 'Coming Soon'
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
      status: 'Coming Soon'
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
      blue: 'border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600',
      green: 'border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-600',
      red: 'border-red-200 dark:border-red-700 hover:border-red-300 dark:hover:border-red-600',
      yellow: 'border-yellow-200 dark:border-yellow-700 hover:border-yellow-300 dark:hover:border-yellow-600',
      purple: 'border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600',
      indigo: 'border-indigo-200 dark:border-indigo-700 hover:border-indigo-300 dark:hover:border-indigo-600',
      pink: 'border-pink-200 dark:border-pink-700 hover:border-pink-300 dark:hover:border-pink-600',
      teal: 'border-teal-200 dark:border-teal-700 hover:border-teal-300 dark:hover:border-teal-600'
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          All Tools
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover our complete collection of free, easy-to-use utilities designed to make your daily tasks simpler and more efficient.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg mx-auto mb-4">
            <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{tools.length}</h3>
          <p className="text-gray-600 dark:text-gray-300">Total Tools</p>
        </div>
        
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg mx-auto mb-4">
            <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">100%</h3>
          <p className="text-gray-600 dark:text-gray-300">Privacy Safe</p>
        </div>
        
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg mx-auto mb-4">
            <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Free</h3>
          <p className="text-gray-600 dark:text-gray-300">Always Free</p>
        </div>
      </div>

      {/* Tools List */}
      <div className="space-y-6">
        {tools.map((tool, index) => {
          const IconComponent = tool.icon
          const isComingSoon = tool.status === 'Coming Soon'
          
          return (
            <div 
              key={index} 
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 transition-all duration-200 ${getColorClasses(tool.color)} ${!isComingSoon ? 'hover:shadow-md' : 'opacity-75'}`}
            >
              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Left Side - Icon and Basic Info */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 bg-${tool.color}-100 dark:bg-${tool.color}-900/30`}>
                      <IconComponent className={`h-8 w-8 text-${tool.color}-600 dark:text-${tool.color}-400`} />
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(tool.status)}`}>
                      {tool.status}
                    </span>
                  </div>

                  {/* Middle - Description and Features */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
                      {tool.description}
                    </p>
                    
                    {/* Features List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {tool.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <div className={`w-1.5 h-1.5 rounded-full bg-${tool.color}-500 mr-2 flex-shrink-0`}></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Side - Action Button */}
                  <div className="flex-shrink-0 lg:ml-6">
                    {isComingSoon ? (
                      <div className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-xl font-medium cursor-not-allowed">
                        Coming Soon
                      </div>
                    ) : (
                      <Link
                        to={tool.path}
                        className={`inline-flex items-center space-x-2 px-6 py-3 bg-${tool.color}-500 hover:bg-${tool.color}-600 text-white font-medium rounded-xl transition-colors duration-200 group`}
                      >
                        <span>Use Tool</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
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
