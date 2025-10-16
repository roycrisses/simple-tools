import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Github, Heart, Shield, FileText, Phone } from 'lucide-react'
import EmailModal from './EmailModal'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)

  return (
    <footer className="bg-white border-t border-gray-200 mt-0">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Simple Tools
            </h3>
            <p className="text-gray-600 text-sm">
              Free, fast, and privacy-focused online tools for everyone. No registration required.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://github.com/roycrisses"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-black transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <button
                onClick={() => setIsEmailModalOpen(true)}
                className="text-gray-400 hover:text-black transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tools Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Popular Tools
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/qr-generator"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  QR Code Generator
                </Link>
              </li>
              <li>
                <Link
                  to="/image-resizer"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Image Resizer
                </Link>
              </li>
              <li>
                <Link
                  to="/youtube-downloader"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  YouTube Downloader
                </Link>
              </li>
              <li>
                <Link
                  to="/pdf-tools"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  PDF Tools
                </Link>
              </li>
              <li>
                <Link
                  to="/tools"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  View All Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Legal & Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-600 hover:text-black transition-colors flex items-center space-x-1"
                >
                  <Shield className="w-4 h-4" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-gray-600 hover:text-black transition-colors flex items-center space-x-1"
                >
                  <FileText className="w-4 h-4" />
                  <span>Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-black transition-colors flex items-center space-x-1"
                >
                  <Phone className="w-4 h-4" />
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Developer
            </h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                <strong>Krishna Karki</strong>
              </p>
              <p>IT Student, Kathmandu</p>
              <p>Leapfrog PVT LTD</p>
              <button
                onClick={() => setIsEmailModalOpen(true)}
                className="text-black hover:underline text-left"
              >
                krishna21karki@gmail.com
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600">
              <p className="flex items-center space-x-1">
                <span>© {currentYear} Simple Tools. Made with</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>by Krishna Karki. All rights reserved.</span>
              </p>
            </div>
            <div className="text-sm text-gray-500">
              <p>Free tools for everyone • No registration required • Privacy first</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-xs text-gray-500 text-center">
          <p>
            This website uses cookies to enhance user experience.
            By using this site, you agree to our{' '}
            <Link to="/privacy-policy" className="underline hover:text-black">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link to="/terms-of-service" className="underline hover:text-black">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </div>
      
      {/* EmailJS Modal */}
      <EmailModal 
        isOpen={isEmailModalOpen} 
        onClose={() => setIsEmailModalOpen(false)} 
      />
    </footer>
  )
}

export default Footer
