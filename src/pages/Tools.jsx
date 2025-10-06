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
  Heart,
  Link as LinkIcon
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
      description: 'Resize and optimize images while maintaining quality',
      features: [
        'Batch image processing',
        'Multiple format support',
        'Quality preservation',
        'Instant preview',
        'Social media presets'
      ],
      icon: Image,
      path: '/image-resizer',
      color: 'green',
      status: 'Popular'
    },
    {
      name: 'YouTube Downloader',
      description: 'Download YouTube videos in various formats and qualities',
      features: [
        'Multiple quality options',
        'Audio-only downloads',
        'Fast processing',
        'No registration required',
        'Safe and secure'
      ],
      icon: Download,
      path: '/youtube-downloader',
      color: 'red',
      status: 'Popular'
    },
    {
      name: 'Coin Flip',
      description: 'Make random decisions with a virtual coin flip',
      features: [
        'True randomness',
        'Flip history tracking',
        'Statistics display',
        'Smooth animations',
        'Perfect for decisions'
      ],
      icon: Coins,
      path: '/coin-flip',
      color: 'yellow',
      status: 'Fun'
    },
    {
      name: 'PDF Tools',
      description: 'Merge, split, and manipulate PDF files with ease',
      features: [
        'Merge multiple PDFs',
        'Split PDF pages',
        'Password protection',
        'Compress files',
        'Extract pages'
      ],
      icon: FileText,
      path: '/pdf-tools',
      color: 'purple',
      status: 'New'
    },
    {
      name: 'Text Tools',
      description: 'Comprehensive text manipulation and analysis tools',
      features: [
        'Case conversion (upper/lower)',
        'Text formatting',
        'Find and replace',
        'Text analysis',
        'Word count statistics'
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
    },
    {
      name: 'Domain Authority Checker',
      description: 'Check domain authority and SEO metrics for any website',
      features: [
        'Domain authority score',
        'Page authority metrics',
        'Backlink analysis',
        'SEO insights',
        'Competitor comparison'
      ],
      icon: Shield,
      path: '/domain-authority',
      color: 'blue',
      status: 'Popular'
    },
    {
      name: 'Backlink Checker',
      description: 'Analyze backlink profiles and discover link opportunities',
      features: [
        'Backlink discovery',
        'Authority analysis',
        'Anchor text review',
        'Competitor research',
        'Link quality assessment'
      ],
      icon: LinkIcon,
      path: '/backlink-checker',
      color: 'green',
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
    <div className="min-h-screen">
      {/* Minimal Header */}
      <div className="minimal-hero">
        <div className="minimal-container">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h1 className="minimal-h1 mb-0">
                All Tools
              </h1>
            </div>
            
            <p className="minimal-text text-lg mb-8">
              Complete collection of free utilities for daily use. Everything you need in one place.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{tools.length}</div>
                <div className="minimal-text">Total Tools</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <div className="minimal-text">Free to Use</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="minimal-text">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="py-16">
        <div className="minimal-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => {
              const Icon = tool.icon
              const colorClasses = getColorClasses(tool.color)
              
              return (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 rounded-xl border-2 ${colorClasses.border} p-6 hover:shadow-lg transition-all duration-200 group`}
                >
                  {/* Tool Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${colorClasses.iconBg} rounded-lg flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${colorClasses.iconText}`} />
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tool.status)}`}>
                      {tool.status}
                    </span>
                  </div>

                  {/* Tool Info */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {tool.name}
                    </h3>
                    <p className="minimal-text text-sm mb-3">
                      {tool.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <ul className="space-y-1">
                      {tool.features.slice(0, 3).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm minimal-text">
                          <div className={`w-1.5 h-1.5 ${colorClasses.dot} rounded-full mr-2 flex-shrink-0`}></div>
                          {feature}
                        </li>
                      ))}
                      {tool.features.length > 3 && (
                        <li className="text-xs minimal-text ml-3.5">
                          +{tool.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={tool.path}
                    className={`w-full ${colorClasses.button} text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 group-hover:shadow-md`}
                  >
                    <span>Use Tool</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="minimal-card max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-red-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Love Our Tools?
                </h2>
              </div>
              <p className="minimal-text mb-6">
                All tools are completely free to use. Bookmark this page and share with others who might find these tools helpful!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/contact"
                  className="minimal-button minimal-button-primary"
                >
                  Contact Us
                </Link>
                <Link
                  to="/about"
                  className="minimal-button minimal-button-secondary"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tools
