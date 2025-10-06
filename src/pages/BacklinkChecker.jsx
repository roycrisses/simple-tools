import React, { useState } from 'react'
import { Link as LinkIcon, Search, ExternalLink, RotateCcw, TrendingUp } from 'lucide-react'

const BacklinkChecker = () => {
  const [domain, setDomain] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const checkBacklinks = async () => {
    if (!domain.trim()) {
      setError('Please enter a domain name')
      return
    }

    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/
    if (!domainRegex.test(domain.replace(/^https?:\/\//, '').replace(/^www\./, ''))) {
      setError('Please enter a valid domain name')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Simulate API call
      setTimeout(() => {
        const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '')
        setResult({
          domain: cleanDomain,
          totalBacklinks: Math.floor(Math.random() * 10000) + 1000,
          referringDomains: Math.floor(Math.random() * 1000) + 100,
          domainAuthority: Math.floor(Math.random() * 40) + 30,
          lastUpdated: new Date().toLocaleDateString(),
          topBacklinks: [
            {
              url: 'https://example1.com/article',
              domain: 'example1.com',
              authority: 85,
              anchorText: 'quality content',
              type: 'dofollow'
            },
            {
              url: 'https://news-site.com/story',
              domain: 'news-site.com',
              authority: 78,
              anchorText: cleanDomain,
              type: 'dofollow'
            },
            {
              url: 'https://blog.example.com/post',
              domain: 'blog.example.com',
              authority: 65,
              anchorText: 'click here',
              type: 'nofollow'
            },
            {
              url: 'https://forum.test.com/thread',
              domain: 'forum.test.com',
              authority: 45,
              anchorText: 'useful resource',
              type: 'dofollow'
            },
            {
              url: 'https://directory.web.com/listing',
              domain: 'directory.web.com',
              authority: 38,
              anchorText: cleanDomain,
              type: 'nofollow'
            }
          ]
        })
        setLoading(false)
      }, 2000)
    } catch (err) {
      setError('Failed to check backlinks. Please try again.')
      setLoading(false)
    }
  }

  const clearAll = () => {
    setDomain('')
    setResult(null)
    setError('')
  }

  const getAuthorityColor = (authority) => {
    if (authority >= 70) return 'text-green-600'
    if (authority >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getAuthorityLabel = (authority) => {
    if (authority >= 70) return 'High'
    if (authority >= 40) return 'Medium'
    return 'Low'
  }

  return (
    <div className="min-h-screen">
      {/* Minimal Header */}
      <div className="minimal-hero">
        <div className="minimal-container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <LinkIcon className="h-6 w-6 text-white" />
              </div>
              <h1 className="minimal-h1 mb-0">
                Backlink Checker
              </h1>
            </div>
            
            <p className="minimal-text text-lg">
              Analyze your website's backlink profile and discover link building opportunities.
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Domain Name
                  </label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="Enter domain (e.g., example.com)"
                    className="minimal-input"
                    onKeyPress={(e) => e.key === 'Enter' && checkBacklinks()}
                  />
                  <div className="minimal-text text-sm mt-1">
                    💡 Enter without http:// or www
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <span className="text-red-700 dark:text-red-300 text-sm">{error}</span>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={checkBacklinks}
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
                        Check Backlinks
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
                Backlink Analysis
              </h2>

              {result ? (
                <div className="space-y-6">
                  {/* Domain Info */}
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center mb-2">
                      <LinkIcon className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {result.domain}
                      </span>
                    </div>
                    <div className="minimal-text text-sm">
                      Last analyzed: {result.lastUpdated}
                    </div>
                  </div>

                  {/* Main Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {result.totalBacklinks.toLocaleString()}
                      </div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Total Backlinks
                      </div>
                    </div>

                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {result.referringDomains.toLocaleString()}
                      </div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Referring Domains
                      </div>
                    </div>

                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className={`text-2xl font-bold mb-1 ${getAuthorityColor(result.domainAuthority)}`}>
                        {result.domainAuthority}
                      </div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Domain Authority
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="text-center">
                    <button
                      onClick={() => window.open(`https://${result.domain}`, '_blank')}
                      className="minimal-button minimal-button-primary"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit Website
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                    <LinkIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Ready to Analyze
                  </h3>
                  <p className="minimal-text text-sm">
                    Enter a domain name to check its backlink profile
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Top Backlinks Section */}
          {result && (
            <div className="mt-8 minimal-card">
              <h2 className="minimal-h2 mb-6">
                Top Backlinks
              </h2>
              
              <div className="space-y-4">
                {result.topBacklinks.map((backlink, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white mb-1">
                          {backlink.domain}
                        </div>
                        <div className="text-sm minimal-text mb-2">
                          {backlink.url}
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="minimal-text">
                            Anchor: <span className="font-medium">"{backlink.anchorText}"</span>
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            backlink.type === 'dofollow' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {backlink.type}
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className={`text-lg font-bold ${getAuthorityColor(backlink.authority)}`}>
                          {backlink.authority}
                        </div>
                        <div className="text-xs minimal-text">
                          {getAuthorityLabel(backlink.authority)} Authority
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BacklinkChecker
