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
      case 'Popular': return 'bg-yellow-400 text-black'
      case 'New': return 'bg-black text-white'
      case 'Fun': return 'bg-yellow-200 text-black'
      case 'Coming Soon': return 'bg-gray-400 text-white'
      default: return 'bg-gray-700 text-white'
    }
  }

  const getColorClasses = (color) => {
    return {
      border: 'border-gray-200 hover:border-gray-400',
      iconBg: 'bg-black',
      iconText: 'text-white',
      button: 'bg-black hover:bg-gray-800',
      dot: 'bg-black'
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="clean-hero">
        <div className="clean-container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="clean-icon w-10 h-10 mr-3">
                <Zap className="h-5 w-5" />
              </div>
              <h1 className="clean-h1 mb-0">
                All Tools
              </h1>
            </div>
            
            <p className="text-base text-gray-600 mb-8">
              Complete collection of free utilities.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-black mb-1">{tools.length}</div>
                <div className="text-gray-600 text-sm">Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-black mb-1">100%</div>
                <div className="text-gray-600 text-sm">Free</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-black mb-1">24/7</div>
                <div className="text-gray-600 text-sm">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="py-16 bg-black">
        <div className="clean-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => {
              const Icon = tool.icon
              const colorClasses = getColorClasses(tool.color)
              
              return (
                <div
                  key={index}
                  className="clean-card p-6 group"
                >
                  {/* Tool Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`clean-icon w-10 h-10`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium ${getStatusColor(tool.status)}`}>
                      {tool.status}
                    </span>
                  </div>

                  {/* Tool Info */}
                  <div className="mb-4">
                    <h3 className="clean-h3 mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {tool.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <ul className="space-y-1">
                      {tool.features.slice(0, 3).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm text-gray-600">
                          <span className="mr-2 flex-shrink-0">•</span>
                          {feature}
                        </li>
                      ))}
                      {tool.features.length > 3 && (
                        <li className="text-xs text-gray-500 ml-4">
                          +{tool.features.length - 3} more
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={tool.path}
                    className="clean-btn clean-btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <span>Use Tool</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="clean-card max-w-xl mx-auto p-8">
              <div className="flex items-center justify-center mb-3">
                <div className="w-8 h-8 bg-yellow-400 flex items-center justify-center mr-2">
                  <Heart className="h-4 w-4 text-black" />
                </div>
                <h2 className="clean-h3 mb-0">
                  Love Our Tools?
                </h2>
              </div>
              <p className="text-gray-400 mb-6 text-sm">
                All tools are completely free. Bookmark and share!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/contact"
                  className="clean-btn clean-btn-primary"
                >
                  Contact Us
                </Link>
                <Link
                  to="/about"
                  className="clean-btn clean-btn-secondary"
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
