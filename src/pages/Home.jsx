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
      <section className="clean-hero">
        <div className="clean-container">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-300 px-5 py-2 mb-8">
              <span className="text-gray-700 text-sm font-medium">120+ Free Tools</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-black mb-6 leading-tight">
              Simple Tools
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Professional online utilities. No sign-up. No limits. <span className="text-black font-semibold">{toolsCount} tools</span> ready to use.
            </p>
            
            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
              <div className="bg-white border-2 border-gray-200 p-6">
                <Zap className="h-7 w-7 text-black mx-auto mb-3" />
                <h3 className="text-black font-semibold mb-1">Fast</h3>
                <p className="text-gray-600 text-sm">Instant results</p>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6">
                <Shield className="h-7 w-7 text-black mx-auto mb-3" />
                <h3 className="text-black font-semibold mb-1">Secure</h3>
                <p className="text-gray-600 text-sm">Privacy first</p>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6">
                <Users className="h-7 w-7 text-black mx-auto mb-3" />
                <h3 className="text-black font-semibold mb-1">Free</h3>
                <p className="text-gray-600 text-sm">Always free</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="#tools"
                className="clean-btn clean-btn-primary px-8 py-3 text-base"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Browse Tools
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link
                to="/about"
                className="clean-btn clean-btn-secondary px-8 py-3 text-base"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Tools Section */}
      <section id="tools" className="py-20 bg-gray-50">
        <div className="clean-container">
          <div className="text-center mb-12">
            <h2 className="clean-h2 mb-4">
              All Tools
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Professional utilities for everyday tasks.
            </p>
          </div>
          
          <div className="clean-grid clean-grid-3 mb-12">
            {tools.map((tool, index) => {
              const IconComponent = tool.icon
              return (
                <Link
                  key={index}
                  to={tool.path}
                  className="clean-card p-6 group block"
                >
                  <div className="flex items-start mb-4">
                    <div className="clean-icon w-12 h-12 mr-3 flex-shrink-0">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="clean-h3 mb-1">
                        {tool.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-black font-medium text-sm">
                    <span>Use tool</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </Link>
              )
            })}
          </div>
          
          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-white border-2 border-gray-200 p-8 max-w-xl mx-auto">
              <h3 className="clean-h3 mb-3">Need More Tools?</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Browse our complete collection.
              </p>
              <Link
                to="/tools"
                className="clean-btn clean-btn-primary px-6 py-3"
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
        <div className="clean-container">
          <div className="text-center mb-10">
            <h2 className="clean-h2 mb-3">
              Why Choose Simple Tools?
            </h2>
          </div>
          
          <div className="clean-grid clean-grid-3">
            <div className="clean-card text-center">
              <div className="w-10 h-10 bg-black flex items-center justify-center mx-auto mb-3">
                <span className="text-lg text-white">⚡</span>
              </div>
              <h3 className="clean-h3 mb-2">
                Fast & Simple
              </h3>
              <p className="text-gray-600 text-sm">
                No registration. Just use.
              </p>
            </div>
            
            <div className="clean-card text-center">
              <div className="w-10 h-10 bg-black flex items-center justify-center mx-auto mb-3">
                <span className="text-lg text-white">🔒</span>
              </div>
              <h3 className="clean-h3 mb-2">
                Privacy First
              </h3>
              <p className="text-gray-600 text-sm">
                Local processing. No data storage.
              </p>
            </div>
            
            <div className="clean-card text-center">
              <div className="w-10 h-10 bg-black flex items-center justify-center mx-auto mb-3">
                <span className="text-lg text-white">💯</span>
              </div>
              <h3 className="clean-h3 mb-2">
                Free
              </h3>
              <p className="text-gray-600 text-sm">
                No limits. No costs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-black">
        <div className="clean-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-1">120+</div>
              <div className="text-gray-400 text-sm">Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">10M+</div>
              <div className="text-gray-400 text-sm">Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">99.9%</div>
              <div className="text-gray-400 text-sm">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-gray-400 text-sm">Available</div>
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
              
              <div className="bg-gray-50 p-6 border-2 border-gray-200">
                <h4 className="font-bold text-black mb-3">Ready to Boost Your Productivity?</h4>
                <p className="text-gray-700">
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
