import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { QrCode, Image, Download, Coins, FileText, Type, Palette, Calculator, ArrowRight, Globe, Link as LinkIcon, Search, BookOpen, Target, Minimize2, Star, Zap, Shield, Users, Sparkles } from 'lucide-react'
import FAQ from '../components/FAQ'

const Home = () => {
  const tools = [
    { name: 'QR Generator', description: 'Create QR codes instantly', path: '/qr-generator', icon: QrCode },
    { name: 'Image Resizer', description: 'Resize images quickly', path: '/image-resizer', icon: Image },
    { name: 'Image Compressor', description: 'Reduce image file sizes', path: '/image-compressor', icon: Minimize2 },
    { name: 'PDF Tools', description: 'Merge, split, convert PDFs', path: '/pdf-tools', icon: FileText },
    { name: 'Text Tools', description: 'Text manipulation utilities', path: '/text-tools', icon: Type },
    { name: 'Color Tools', description: 'Color picker and palette', path: '/color-tools', icon: Palette },
    { name: 'Unit Converter', description: 'Convert units easily', path: '/unit-converter', icon: Calculator },
    { name: 'Domain Authority', description: 'Check SEO metrics', path: '/domain-authority-checker', icon: Globe },
    { name: 'Backlink Checker', description: 'Analyze backlinks', path: '/backlink-checker', icon: LinkIcon },
    { name: 'Website SEO Checker', description: 'Complete SEO analysis', path: '/website-seo-checker', icon: Search },
    { name: 'Plagiarism Checker', description: 'Check content originality', path: '/plagiarism-checker', icon: FileText },
    { name: 'Grammar Checker', description: 'Fix grammar and spelling', path: '/grammar-checker', icon: BookOpen },
    { name: 'Keyword Research', description: 'Find profitable keywords', path: '/keyword-research', icon: Target },
    { name: 'Coin Flip', description: 'Random coin flip', path: '/coin-flip', icon: Coins },
  ]

  const [isVisible, setIsVisible] = useState(false)
  const [toolsCount, setToolsCount] = useState(0)
  
  useEffect(() => {
    setIsVisible(true)
    // Animate tools count
    const timer = setInterval(() => {
      setToolsCount(prev => {
        if (prev < tools.length) {
          return prev + 1
        }
        clearInterval(timer)
        return prev
      })
    }, 100)
    
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="award-hero relative">
        <div className="award-container relative z-10">
          <div className={`text-center max-w-5xl mx-auto ${isVisible ? 'award-animate-fade-in-up' : 'opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-6 py-2 mb-8 border border-gray-200">
              <span className="text-gray-700 text-sm font-medium">120+ Free Tools</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-black mb-6 leading-tight">
              Simple Tools
              <br />
              <span className="text-gray-700">for Everyone</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Free online tools for everyone. 
              <span className="text-black font-semibold">{toolsCount} utilities</span> from QR codes to SEO analysis.
              No sign-up required.
            </p>
            
            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="award-glass p-6 rounded-xl">
                <Zap className="h-8 w-8 text-black mx-auto mb-3" />
                <h3 className="text-black font-semibold mb-2">Fast</h3>
                <p className="text-gray-600 text-sm">Quick processing</p>
              </div>
              <div className="award-glass p-6 rounded-xl">
                <Shield className="h-8 w-8 text-black mx-auto mb-3" />
                <h3 className="text-black font-semibold mb-2">Secure</h3>
                <p className="text-gray-600 text-sm">Privacy first</p>
              </div>
              <div className="award-glass p-6 rounded-xl">
                <Users className="h-8 w-8 text-black mx-auto mb-3" />
                <h3 className="text-black font-semibold mb-2">Free</h3>
                <p className="text-gray-600 text-sm">No limits</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="#tools"
                className="award-btn award-btn-primary px-10 py-4 text-lg font-semibold"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Explore Tools
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link
                to="/about"
                className="award-btn award-btn-secondary px-8 py-4 text-lg font-semibold"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Tools Section */}
      <section id="tools" className="py-24 bg-gray-50">
        <div className="award-container">
          <div className="text-center mb-16">
            <h2 className="award-heading-2 mb-6">
              All Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, fast, and free utilities for your daily tasks.
            </p>
          </div>
          
          <div className="award-grid award-grid-3 mb-16">
            {tools.map((tool, index) => {
              const IconComponent = tool.icon
              return (
                <Link
                  key={index}
                  to={tool.path}
                  className="award-card p-8 group block award-animate-fade-in-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-center mb-6">
                    <div className="award-icon w-16 h-16 mr-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="award-heading-3 mb-1 transition-all">
                        {tool.name}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {tool.description}
                  </p>
                  
                  <div className="flex items-center text-black font-semibold transition-colors">
                    <span>Try it</span>
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
          
          {/* Call to Action */}
          <div className="text-center">
            <div className="award-glass p-8 rounded-3xl max-w-2xl mx-auto">
              <h3 className="award-heading-3 mb-4">Need More Tools?</h3>
              <p className="text-gray-600 mb-6">
                Browse our complete collection.
              </p>
              <Link
                to="/tools"
                className="award-btn award-btn-primary px-8 py-3"
              >
                View All Tools
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="award-container">
          <div className="text-center mb-12">
            <h2 className="award-heading-2 mb-4">
              Why Choose Simple Tools?
            </h2>
          </div>
          
          <div className="award-grid award-grid-3">
            <div className="award-card text-center">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-xl text-white">⚡</span>
              </div>
              <h3 className="award-heading-3 mb-2">
                Fast & Simple
              </h3>
              <p className="text-gray-600">
                No registration. Just use.
              </p>
            </div>
            
            <div className="award-card text-center">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-xl text-white">🔒</span>
              </div>
              <h3 className="award-heading-3 mb-2">
                Privacy First
              </h3>
              <p className="text-gray-600">
                Local processing. No data storage.
              </p>
            </div>
            
            <div className="award-card text-center">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-xl text-white">💯</span>
              </div>
              <h3 className="award-heading-3 mb-2">
                Free
              </h3>
              <p className="text-gray-600">
                No limits. No costs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-black">
        <div className="award-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="award-animate-fade-in-up">
              <div className="text-4xl font-black text-white mb-2">120+</div>
              <div className="text-gray-400">Tools</div>
            </div>
            <div className="award-animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="text-4xl font-black text-white mb-2">10M+</div>
              <div className="text-gray-400">Users</div>
            </div>
            <div className="award-animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="text-4xl font-black text-white mb-2">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
            <div className="award-animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="text-4xl font-black text-white mb-2">24/7</div>
              <div className="text-gray-400">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="award-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="award-heading-2 text-center mb-12">
              Simple Tools for Everyone
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                In today's fast-paced digital world, having access to reliable, efficient tools can make all the difference 
                in your productivity. Simple Tools has emerged as the leading platform for free online utilities, offering 
                a comprehensive suite of professional-grade tools that cater to every aspect of your digital workflow.
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Comprehensive Tool Categories
              </h3>
              
              <p className="text-gray-600 mb-4">
                Our platform is organized into several key categories, each designed to address specific needs:
              </p>
              
              <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                <li><strong>Image Processing Tools:</strong> QR code generator, image resizer, image compressor, and color tools for all your visual content needs</li>
                <li><strong>Document Management:</strong> PDF tools for merging, splitting, and converting documents with ease</li>
                <li><strong>SEO & Marketing Tools:</strong> Domain authority checker, backlink analyzer, website SEO checker, and keyword research tools</li>
                <li><strong>Text & Writing Tools:</strong> Grammar checker, plagiarism detector, and comprehensive text manipulation utilities</li>
                <li><strong>Media Tools:</strong> YouTube downloader for content creators and media enthusiasts</li>
                <li><strong>Utility Tools:</strong> Unit converter, coin flip, and other everyday productivity tools</li>
              </ul>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Advanced Features That Set Us Apart
              </h3>
              
              <p className="text-gray-600 mb-4">
                What makes Simple Tools the preferred choice for millions of users worldwide?
              </p>
              
              <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                <li><strong>Lightning-Fast Processing:</strong> All tools are optimized for speed, delivering results in seconds</li>
                <li><strong>Privacy-First Approach:</strong> Your data never leaves your device for most operations, ensuring complete privacy</li>
                <li><strong>No Registration Required:</strong> Start using any tool immediately without creating accounts or providing personal information</li>
                <li><strong>Professional Quality:</strong> Enterprise-grade algorithms power our tools, delivering results that meet professional standards</li>
                <li><strong>Cross-Platform Compatibility:</strong> Works seamlessly on desktop, tablet, and mobile devices</li>
                <li><strong>Regular Updates:</strong> We continuously add new tools and improve existing ones based on user feedback</li>
              </ul>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Perfect for Every User Type
              </h3>
              
              <p className="text-gray-600 mb-4">
                Whether you're a content creator, digital marketer, student, or business professional, our tools are designed to enhance your workflow:
              </p>
              
              <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                <li><strong>Content Creators:</strong> Generate QR codes, resize images, and download media content for your projects</li>
                <li><strong>Digital Marketers:</strong> Analyze website performance, research keywords, and check domain authority for SEO campaigns</li>
                <li><strong>Students & Educators:</strong> Check grammar, detect plagiarism, and convert documents for academic work</li>
                <li><strong>Business Professionals:</strong> Process documents, analyze competitors, and manage digital assets efficiently</li>
                <li><strong>Web Developers:</strong> Optimize images, generate QR codes, and analyze website performance</li>
              </ul>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Trusted by Millions Worldwide
              </h3>
              
              <p className="text-gray-600 mb-6">
                With over 10 million satisfied users and 99.9% uptime, Simple Tools has established itself as the most 
                reliable platform for free online utilities. Our commitment to quality, privacy, and user experience 
                has earned us recognition as the go-to solution for productivity tools.
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-3">Ready to Boost Your Productivity?</h4>
                <p className="text-blue-700">
                  Join millions of users who trust Simple Tools for their daily productivity needs. 
                  Start exploring our comprehensive collection of free online utilities today and experience 
                  the difference that professional-grade tools can make in your workflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
    </div>
  )
}

export default Home
