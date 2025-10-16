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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white border-b border-gray-200' 
        : 'bg-white border-b border-gray-200'
    }`}>
      <div className="award-container">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="award-icon w-12 h-12 group-hover:scale-110 transition-transform">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-black">
                Simple Tools
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-white bg-black'
                    : 'text-gray-700 hover:text-black hover:bg-gray-100'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
              </Link>
            ))}

            {/* CTA */}
            <Link
              to="/tools"
              className="award-btn award-btn-primary ml-4 px-6 py-3"
            >
              <span>Get Started</span>
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="award-btn award-btn-secondary p-3"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200">
            <div className="award-container py-6">
              <div className="space-y-3">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-6 py-4 rounded-lg font-semibold transition-all duration-300 award-animate-fade-in-up ${
                      isActive(item.href)
                        ? 'text-white bg-black'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100'
                    }`}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    to="/tools"
                    onClick={() => setIsMenuOpen(false)}
                    className="award-btn award-btn-primary w-full justify-center py-4 text-lg"
                  >
                    <span>Get Started</span>
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
