import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon, Menu, X, Sparkles, Zap } from 'lucide-react'

const Navbar = ({ darkMode, toggleDarkMode }) => {
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
        ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl border-b border-neutral-200/50 dark:border-dark-border/50 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="award-container">
        <div className="flex justify-between items-center h-20">
          {/* Premium Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="award-icon w-12 h-12 group-hover:scale-110 transition-transform">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black gradient-text">
                Simple Tools
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium -mt-1">
                Premium Suite
              </span>
            </div>
          </Link>

          {/* Premium Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 group ${
                  isActive(item.href)
                    ? 'text-white bg-gradient-to-r from-primary-600 to-secondary-600 shadow-lg'
                    : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-dark-surface'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {!isActive(item.href) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                )}
              </Link>
            ))}

            {/* Premium Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="award-btn award-btn-secondary p-3 ml-4"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            {/* Premium CTA */}
            <Link
              to="/tools"
              className="award-btn award-btn-primary ml-4 px-6 py-3"
            >
              <Zap className="h-4 w-4" />
              <span>Get Started</span>
            </Link>
          </div>

          {/* Premium Mobile Controls */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="award-btn award-btn-secondary p-3"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="award-btn award-btn-secondary p-3"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Premium Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-dark-bg/95 backdrop-blur-xl border-b border-neutral-200/50 dark:border-dark-border/50 shadow-2xl">
            <div className="award-container py-6">
              <div className="space-y-3">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-6 py-4 rounded-2xl font-semibold transition-all duration-300 award-animate-fade-in-up ${
                      isActive(item.href)
                        ? 'text-white bg-gradient-to-r from-primary-600 to-secondary-600 shadow-lg'
                        : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-dark-surface'
                    }`}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-4 border-t border-neutral-200 dark:border-dark-border">
                  <Link
                    to="/tools"
                    onClick={() => setIsMenuOpen(false)}
                    className="award-btn award-btn-primary w-full justify-center py-4 text-lg"
                  >
                    <Zap className="h-5 w-5" />
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
