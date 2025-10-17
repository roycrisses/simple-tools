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
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6">
          About Simple Tools
        </h1>
        <p className="text-xl text-white max-w-3xl mx-auto">
          We believe that useful tools should be simple, fast, and accessible to everyone. 
          That's why we created this collection of everyday utilities that just work.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="clean-card p-8 mb-12">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
          Our Mission
        </h2>
        <p className="text-lg text-white text-center leading-relaxed">
          To provide high-quality, free tools that solve everyday problems without the complexity, 
          ads, or privacy concerns found in other solutions. We focus on simplicity, speed, and user experience.
        </p>
      </div>

      {/* Features */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
          Why Choose Our Tools?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div key={index} className="clean-card p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-yellow-400">
                    <IconComponent className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white">
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
        <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
          Available Tools
        </h2>
        
        <div className="space-y-4">
          {tools.map((tool, index) => (
            <div key={index} className="clean-card p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-white">
                    {tool.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="clean-card p-8 mb-12">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
          Built With Modern Technology
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">
              Frontend
            </h3>
            <ul className="space-y-2 text-white">
              <li>• React 18 - Modern UI framework</li>
              <li>• Tailwind CSS - Utility-first styling</li>
              <li>• Vite - Lightning-fast build tool</li>
              <li>• Lucide React - Beautiful icons</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">
              Backend
            </h3>
            <ul className="space-y-2 text-white">
              <li>• FastAPI - High-performance Python API</li>
              <li>• Pillow - Advanced image processing</li>
              <li>• yt-dlp - YouTube download capabilities</li>
              <li>• QRCode - QR code generation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="clean-card p-8 mb-12 border-2 border-yellow-400">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
          Privacy & Security
        </h2>
        
        <div className="space-y-4 text-white">
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
      <div className="clean-card p-8 mb-12">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
          Coming Soon
        </h2>
        
        <p className="text-white text-center mb-6">
          We're constantly working to add more useful tools. Here's what's planned:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-900 border border-gray-800">
            <h4 className="font-medium text-yellow-400 mb-2">PDF Tools</h4>
            <p className="text-sm text-white">Merge, split, and convert PDF files</p>
          </div>
          
          <div className="p-4 bg-gray-900 border border-gray-800">
            <h4 className="font-medium text-yellow-400 mb-2">Text Tools</h4>
            <p className="text-sm text-white">Word count, case converter, and more</p>
          </div>
          
          <div className="p-4 bg-gray-900 border border-gray-800">
            <h4 className="font-medium text-yellow-400 mb-2">Color Tools</h4>
            <p className="text-sm text-white">Color picker, palette generator</p>
          </div>
          
          <div className="p-4 bg-gray-900 border border-gray-800">
            <h4 className="font-medium text-yellow-400 mb-2">Unit Converter</h4>
            <p className="text-sm text-white">Length, weight, temperature, and more</p>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="clean-card p-8 text-center">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">
          Get in Touch
        </h2>
        
        <p className="text-white mb-6">
          Have suggestions for new tools or found a bug? We'd love to hear from you!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="clean-btn clean-btn-primary"
          >
            <Mail className="h-4 w-4" />
            <span>Send Email</span>
          </button>
          
          <a
            href="https://github.com/roycrisses"
            target="_blank"
            rel="noopener noreferrer"
            className="clean-btn clean-btn-secondary"
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
    </div>
  )
}

export default About
