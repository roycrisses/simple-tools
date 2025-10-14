import React, { useState } from 'react'
import { Globe, Search, TrendingUp, BarChart3, ExternalLink, RotateCcw } from 'lucide-react'

const DomainAuthorityChecker = () => {
  const [domain, setDomain] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const checkDomainAuthority = async () => {
    if (!domain.trim()) {
      setError('Please enter a domain name')
      return
    }

    // Basic domain validation
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]
    
    if (!domainRegex.test(cleanDomain)) {
      setError('Please enter a valid domain name (e.g., example.com)')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Simulate API call - in real implementation, you'd call a service like Moz API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate realistic mock data
      const mockDA = Math.floor(Math.random() * 100) + 1
      const mockPA = Math.floor(Math.random() * 100) + 1
      const mockBacklinks = Math.floor(Math.random() * 10000) + 100
      const mockReferringDomains = Math.floor(Math.random() * 1000) + 50

      setResult({
        domain: cleanDomain,
        domainAuthority: mockDA,
        pageAuthority: mockPA,
        backlinks: mockBacklinks,
        referringDomains: mockReferringDomains,
        spamScore: Math.floor(Math.random() * 30),
        lastUpdated: new Date().toLocaleDateString()
      })
    } catch (err) {
      setError('Failed to check domain authority. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const clearAll = () => {
    setDomain('')
    setResult(null)
    setError('')
  }

  const getDAColor = (da) => {
    if (da >= 80) return 'text-green-600'
    if (da >= 60) return 'text-blue-600'
    if (da >= 40) return 'text-yellow-600'
    if (da >= 20) return 'text-orange-600'
    return 'text-red-600'
  }

  const getDALabel = (da) => {
    if (da >= 80) return 'EXCELLENT'
    if (da >= 60) return 'VERY GOOD'
    if (da >= 40) return 'GOOD'
    if (da >= 20) return 'FAIR'
    return 'POOR'
  }

  return (
    <div className="min-h-screen">
      {/* Minimal Header */}
      <div className="minimal-hero">
        <div className="minimal-container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h1 className="minimal-h1 mb-0">
                Domain Authority Checker
              </h1>
            </div>
            
            <p className="minimal-text text-lg">
              Check your website's domain authority and SEO metrics to improve search rankings.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="minimal-container">
          <div className="minimal-grid minimal-grid-2">
            {/* Input Section */}
            <div className="minimal-card">
              <h2 className="minimal-h2 mb-6">
                Enter Domain
              </h2>
          
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Domain Name
                  </label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="Enter domain (e.g., example.com)"
                    className="minimal-input"
                    onKeyPress={(e) => e.key === 'Enter' && checkDomainAuthority()}
                  />
                  <div className="minimal-text text-sm mt-1">
                    💡 Enter without http:// or www
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={checkDomainAuthority}
                    disabled={loading || !domain.trim()}
                    className="minimal-button minimal-button-primary flex-1 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4" />
                        Check Authority
                      </>
                    )}
                  </button>

                  <button
                    onClick={clearAll}
                    className="minimal-button minimal-button-secondary"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Clear
                  </button>
                </div>
              </div>
          </div>

            {/* Result Section */}
            <div className="minimal-card">
              <h2 className="minimal-h2 mb-6">
                Authority Metrics
              </h2>
          
              {result ? (
                <div className="space-y-6">
                  {/* Domain Info */}
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center mb-2">
                      <Globe className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="font-semibold text-gray-900">
                        {result.domain}
                      </span>
                    </div>
                    <div className="minimal-text text-sm">
                      Last analyzed: {result.lastUpdated}
                    </div>
                  </div>

                  {/* Main Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-3xl font-bold mb-1">
                        <span className={getDAColor(result.domainAuthority)}>
                          {result.domainAuthority}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-gray-600 mb-1">
                        Domain Authority
                      </div>
                      <div className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">
                        {getDALabel(result.domainAuthority)}
                      </div>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-3xl font-bold mb-1">
                        <span className={getDAColor(result.pageAuthority)}>
                          {result.pageAuthority}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-gray-600 mb-1">
                        Page Authority
                      </div>
                      <div className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">
                        {getDALabel(result.pageAuthority)}
                      </div>
                    </div>
                  </div>

                  {/* Additional Metrics */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">Detailed Metrics</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="minimal-text">Backlinks</span>
                        <span className="font-medium">{result.backlinks.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="minimal-text">Referring Domains</span>
                        <span className="font-medium">{result.referringDomains.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="minimal-text">Spam Score</span>
                        <span className={`font-medium ${result.spamScore > 15 ? 'text-red-600' : result.spamScore > 5 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {result.spamScore}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => window.open(`https://${result.domain}`, '_blank')}
                      className="minimal-button minimal-button-primary flex-1"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit Website
                    </button>
                    <button
                      onClick={checkDomainAuthority}
                      className="minimal-button minimal-button-secondary"
                    >
                      <TrendingUp className="h-4 w-4" />
                      Recheck
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Ready to Analyze
                  </h3>
                  <p className="minimal-text text-sm">
                    Enter a domain name to see SEO metrics
                  </p>
                </div>
              )}
          </div>

          </div>
        </div>
        
        {/* Info Section */}
        <div className="mt-12 minimal-card">
          <h3 className="minimal-h2 mb-4">
            Understanding Domain Authority
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">80-100: Excellent</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm">60-79: Very Good</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">40-59: Good</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm">20-39: Fair</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">1-19: Poor</span>
              </div>
              <div className="minimal-text text-sm">
                <strong>Scale:</strong> 1-100 (Higher = Better)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DomainAuthorityChecker
