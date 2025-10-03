import React, { useState } from 'react'
import { Heart, Shield, Zap, Users, Github, Mail } from 'lucide-react'
import EmailModal from '../components/EmailModal'

const About = () => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'All tools are optimized for speed and efficiency. No waiting around for results.'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your files are processed locally and never stored on our servers. Complete privacy guaranteed.'
    },
    {
      icon: Heart,
      title: 'Completely Free',
      description: 'All tools are free to use with no hidden costs, premium features, or subscription fees.'
    },
    {
      icon: Users,
      title: 'User Friendly',
      description: 'Simple, intuitive interfaces designed for everyone. No technical knowledge required.'
    }
  ]

  const tools = [
    {
      name: 'QR Code Generator',
      description: 'Create QR codes from any text, URL, or message with customizable size and border options.'
    },
    {
      name: 'Image Resizer',
      description: 'Resize images to any dimensions while maintaining quality. Perfect for social media and web use.'
    },
    {
      name: 'YouTube Downloader',
      description: 'Download YouTube videos and audio in various formats and qualities for offline viewing.'
    },
    {
      name: 'Coin Flip',
      description: 'Make quick, unbiased decisions with our virtual coin flip tool. Includes statistics tracking.'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          About Simple Tools
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We believe that useful tools should be simple, fast, and accessible to everyone. 
          That's why we created this collection of everyday utilities that just work.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="card p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Our Mission
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center leading-relaxed">
          To provide high-quality, free tools that solve everyday problems without the complexity, 
          ads, or privacy concerns found in other solutions. We focus on simplicity, speed, and user experience.
        </p>
      </div>

      {/* Features */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Why Choose Our Tools?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div key={index} className="card p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                    <IconComponent className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Available Tools */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Available Tools
        </h2>
        
        <div className="space-y-4">
          {tools.map((tool, index) => (
            <div key={index} className="card p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {tool.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="card p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Built With Modern Technology
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Frontend
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• React 18 - Modern UI framework</li>
              <li>• Tailwind CSS - Utility-first styling</li>
              <li>• Vite - Lightning-fast build tool</li>
              <li>• Lucide React - Beautiful icons</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Backend
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• FastAPI - High-performance Python API</li>
              <li>• Pillow - Advanced image processing</li>
              <li>• yt-dlp - YouTube download capabilities</li>
              <li>• QRCode - QR code generation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="card p-8 mb-12 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700">
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-4 text-center">
          Privacy & Security
        </h2>
        
        <div className="space-y-4 text-green-700 dark:text-green-300">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <p>
              <strong>No Data Collection:</strong> We don't collect, store, or track any personal information or usage data.
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <p>
              <strong>Local Processing:</strong> Most operations happen in your browser or are processed temporarily on our servers.
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <p>
              <strong>Automatic Cleanup:</strong> Any temporary files are automatically deleted after processing.
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <p>
              <strong>Open Source:</strong> Our code is transparent and available for review to ensure security.
            </p>
          </div>
        </div>
      </div>

      {/* Future Plans */}
      <div className="card p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Coming Soon
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          We're constantly working to add more useful tools. Here's what's planned:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">PDF Tools</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Merge, split, and convert PDF files</p>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Text Tools</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Word count, case converter, and more</p>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Color Tools</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Color picker, palette generator</p>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Unit Converter</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Length, weight, temperature, and more</p>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="card p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Get in Touch
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Have suggestions for new tools or found a bug? We'd love to hear from you!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-colors duration-200"
          >
            <Mail className="h-4 w-4" />
            <span>Send Email</span>
          </button>
          
          <a
            href="https://github.com/roycrisses"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-xl transition-colors duration-200"
          >
            <Github className="h-4 w-4" />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
      
      {/* Email Modal */}
      <EmailModal 
        isOpen={isEmailModalOpen} 
        onClose={() => setIsEmailModalOpen(false)} 
      />
    </div>
  )
}

export default About
