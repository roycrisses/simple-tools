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
    if (da >= 80) return 'text-black'
    if (da >= 60) return 'text-gray-800'
    if (da >= 40) return 'text-gray-700'
    if (da >= 20) return 'text-gray-600'
    return 'text-gray-900'
  }

  const getDALabel = (da) => {
    if (da >= 80) return 'EXCELLENT'
    if (da >= 60) return 'VERY GOOD'
    if (da >= 40) return 'GOOD'
    if (da >= 20) return 'FAIR'
    return 'POOR'
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="award-heading-1 mb-4">
          Domain Authority Checker
        </h1>
        <p className="text-xl text-gray-600">
          Check your website's domain authority and SEO metrics to improve search rankings
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="award-card p-6">
          <h2 className="award-heading-3 mb-4 pb-3 border-b border-gray-200">
            Enter Domain
          </h2>
          
              <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Domain Name
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Enter domain (e.g., example.com)"
                className="award-input"
                onKeyPress={(e) => e.key === 'Enter' && checkDomainAuthority()}
              />
              <div className="text-xs text-gray-500 mt-1">
                Enter without http:// or www
              </div>
            </div>

            {error && (
              <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 text-sm text-gray-700">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={checkDomainAuthority}
                disabled={loading || !domain.trim()}
                className="award-btn award-btn-primary flex-1 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="award-spinner"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span>Check Authority</span>
                  </>
                )}
              </button>

              <button
                onClick={clearAll}
                className="award-btn award-btn-secondary flex items-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div className="award-card p-6">
          <h2 className="award-heading-3 mb-4 pb-3 border-b border-gray-200">
            Authority Metrics
          </h2>
          
          {result ? (
            <div className="space-y-6">
              {/* Domain Info */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <Globe className="h-4 w-4 text-black mr-2" />
                  <span className="font-semibold text-gray-900">
                    {result.domain}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Last analyzed: {result.lastUpdated}
                </div>
              </div>

              {/* Main Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-3xl font-bold mb-1">
                    <span className={getDAColor(result.domainAuthority)}>
                      {result.domainAuthority}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">
                    Domain Authority
                  </div>
                  <div className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-700">
                    {getDALabel(result.domainAuthority)}
                  </div>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-3xl font-bold mb-1">
                    <span className={getDAColor(result.pageAuthority)}>
                      {result.pageAuthority}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">
                    Page Authority
                  </div>
                  <div className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-700">
                    {getDALabel(result.pageAuthority)}
                  </div>
                </div>
              </div>

              {/* Additional Metrics */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Detailed Metrics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Backlinks</span>
                    <span className="font-semibold text-gray-900">{result.backlinks.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Referring Domains</span>
                    <span className="font-semibold text-gray-900">{result.referringDomains.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Spam Score</span>
                    <span className="font-semibold text-gray-900">
                      {result.spamScore}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => window.open(`https://${result.domain}`, '_blank')}
                  className="award-btn award-btn-primary flex-1 flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Visit Website</span>
                </button>
                <button
                  onClick={checkDomainAuthority}
                  className="award-btn award-btn-secondary flex items-center space-x-2"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Recheck</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-50 border border-gray-200 rounded-lg">
              <BarChart3 className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Ready to Analyze
              </h3>
              <p className="text-gray-600 text-sm">
                Enter a domain name to see SEO metrics
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Info Section */}
      <div className="mt-8 award-card p-6">
        <h3 className="award-heading-3 mb-4 pb-3 border-b border-gray-200">
          Understanding Domain Authority
        </h3>
        
        <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="space-y-2">
              <div>• 80-100: Excellent</div>
              <div>• 60-79: Very Good</div>
              <div>• 40-59: Good</div>
            </div>
            <div className="space-y-2">
              <div>• 20-39: Fair</div>
              <div>• 1-19: Poor</div>
              <div className="font-semibold text-gray-900">
                Scale: 1-100 (Higher = Better)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DomainAuthorityChecker
