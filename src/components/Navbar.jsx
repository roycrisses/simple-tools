import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sparkles, Zap } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Tools', href: '/tools' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-gray-200">
      <div className="clean-container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="clean-icon w-10 h-10">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-black">
              Simple Tools
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-5 py-2 font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-black bg-yellow-400'
                    : 'text-gray-700 hover:text-black hover:bg-yellow-50'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* CTA */}
            <Link
              to="/tools"
              className="clean-btn clean-btn-primary ml-3 px-5 py-2"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="clean-btn clean-btn-secondary p-2"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b-2 border-gray-200">
            <div className="clean-container py-4">
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 font-medium ${
                      isActive(item.href)
                        ? 'text-black bg-yellow-400'
                        : 'text-gray-700 hover:text-black hover:bg-yellow-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-3 border-t-2 border-gray-200 mt-3">
                  <Link
                    to="/tools"
                    onClick={() => setIsMenuOpen(false)}
                    className="clean-btn clean-btn-primary w-full justify-center py-3"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
