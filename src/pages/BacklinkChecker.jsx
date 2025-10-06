import React, { useState } from 'react'
import { Link, Search, ExternalLink, BarChart3, Globe, RotateCcw, Download } from 'lucide-react'

const BacklinkChecker = () => {
  const [domain, setDomain] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const checkBacklinks = async () => {
    if (!domain.trim()) {
      setError('Please enter a domain name')
      return
    }

    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]
    
    if (!domainRegex.test(cleanDomain)) {
      setError('Please enter a valid domain name (e.g., example.com)')
      return
    }

    setLoading(true)
    setError('')

    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Generate mock backlink data
      const mockBacklinks = []
      const domains = ['techcrunch.com', 'forbes.com', 'medium.com', 'reddit.com', 'stackoverflow.com', 'github.com', 'wikipedia.org', 'news.ycombinator.com']
      
      for (let i = 0; i < 15; i++) {
        mockBacklinks.push({
          id: i + 1,
          sourceDomain: domains[Math.floor(Math.random() * domains.length)],
          sourceUrl: `https://${domains[Math.floor(Math.random() * domains.length)]}/article-${i + 1}`,
          anchorText: ['Click here', 'Read more', cleanDomain, 'Visit website', 'Learn more', 'Check this out'][Math.floor(Math.random() * 6)],
          domainAuthority: Math.floor(Math.random() * 100) + 1,
          linkType: ['dofollow', 'nofollow'][Math.floor(Math.random() * 2)],
          firstSeen: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString()
        })
      }

      setResult({
        domain: cleanDomain,
        totalBacklinks: Math.floor(Math.random() * 5000) + 100,
        referringDomains: Math.floor(Math.random() * 500) + 50,
        dofollowLinks: Math.floor(Math.random() * 3000) + 50,
        nofollowLinks: Math.floor(Math.random() * 2000) + 50,
        backlinks: mockBacklinks,
        lastUpdated: new Date().toLocaleDateString()
      })
    } catch (err) {
      setError('Failed to check backlinks. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const clearAll = () => {
    setDomain('')
    setResult(null)
    setError('')
  }

  const exportBacklinks = () => {
    if (!result) return
    
    const csvContent = [
      ['Source Domain', 'Source URL', 'Anchor Text', 'Domain Authority', 'Link Type', 'First Seen'],
      ...result.backlinks.map(link => [
        link.sourceDomain,
        link.sourceUrl,
        link.anchorText,
        link.domainAuthority,
        link.linkType,
        link.firstSeen
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${result.domain}-backlinks.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Backlink Checker
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Analyze your website's backlink profile and link building opportunities
        </p>
      </div>

      {/* Retro Window Header */}
      <div className="retro-window mb-8">
        <div className="retro-window-header">
          <div className="flex items-center space-x-3">
            <Link className="h-6 w-6" />
            <span className="text-lg font-bold">BACKLINK ANALYZER v1.0</span>
          </div>
          <div className="retro-window-controls">
            <div className="retro-window-control control-minimize"></div>
            <div className="retro-window-control control-maximize"></div>
            <div className="retro-window-control control-close"></div>
          </div>
        </div>
        <div className="p-6 bg-gray-100 dark:bg-gray-700">
          <div className="text-center mb-6">
            <p className="text-lg font-bold text-black dark:text-white font-mono">
              {'>> DISCOVER WHO LINKS TO YOUR WEBSITE & ANALYZE LINK QUALITY <<'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="card p-6">
          <div className="bg-blue-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
            <h2 className="text-xl font-mono">
              [INPUT] DOMAIN
            </h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-black dark:text-white mb-2 font-mono">
                DOMAIN NAME:
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="ENTER DOMAIN (e.g., example.com)"
                className="input-field font-mono"
                onKeyPress={(e) => e.key === 'Enter' && checkBacklinks()}
              />
            </div>

            {error && (
              <div className="retro-alert retro-alert-error font-mono font-bold">
                ERROR: {error}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <button
                onClick={checkBacklinks}
                disabled={loading || !domain.trim()}
                className="btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
              >
                {loading ? (
                  <>
                    <div className="retro-spinner"></div>
                    <span>ANALYZING...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span>CHECK BACKLINKS</span>
                  </>
                )}
              </button>

              <button
                onClick={clearAll}
                className="btn-secondary flex items-center justify-center space-x-2 font-mono"
              >
                <RotateCcw className="h-4 w-4" />
                <span>CLEAR</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          {result ? (
            <div className="space-y-6">
              {/* Summary Stats */}
              <div className="card p-6">
                <div className="bg-green-500 text-black font-bold py-2 px-4 mb-4 border-b-4 border-black">
                  <h2 className="text-xl font-mono">
                    [SUMMARY] {result.domain.toUpperCase()}
                  </h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 border-4 border-black text-center">
                    <div className="text-2xl font-bold font-mono text-blue-600 mb-1">
                      {result.totalBacklinks.toLocaleString()}
                    </div>
                    <div className="text-xs font-mono font-bold text-black">TOTAL BACKLINKS</div>
                  </div>
                  
                  <div className="bg-white p-4 border-4 border-black text-center">
                    <div className="text-2xl font-bold font-mono text-green-600 mb-1">
                      {result.referringDomains.toLocaleString()}
                    </div>
                    <div className="text-xs font-mono font-bold text-black">REFERRING DOMAINS</div>
                  </div>
                  
                  <div className="bg-white p-4 border-4 border-black text-center">
                    <div className="text-2xl font-bold font-mono text-purple-600 mb-1">
                      {result.dofollowLinks.toLocaleString()}
                    </div>
                    <div className="text-xs font-mono font-bold text-black">DOFOLLOW LINKS</div>
                  </div>
                  
                  <div className="bg-white p-4 border-4 border-black text-center">
                    <div className="text-2xl font-bold font-mono text-orange-600 mb-1">
                      {result.nofollowLinks.toLocaleString()}
                    </div>
                    <div className="text-xs font-mono font-bold text-black">NOFOLLOW LINKS</div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="text-xs font-mono text-black dark:text-white">
                    Last Updated: {result.lastUpdated}
                  </div>
                  <button
                    onClick={exportBacklinks}
                    className="btn-secondary flex items-center space-x-2 font-mono text-sm px-3 py-1"
                  >
                    <Download className="h-3 w-3" />
                    <span>EXPORT CSV</span>
                  </button>
                </div>
              </div>

              {/* Backlinks List */}
              <div className="card p-6">
                <div className="bg-yellow-500 text-black font-bold py-2 px-4 mb-4 border-b-4 border-black">
                  <h2 className="text-xl font-mono">
                    [BACKLINKS] TOP REFERRING SITES
                  </h2>
                </div>
                
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {result.backlinks.map((link, index) => (
                    <div key={link.id} className="bg-gray-100 p-3 border-2 border-black">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-mono font-bold text-black text-sm">
                              #{index + 1}
                            </span>
                            <Globe className="h-4 w-4 text-black" />
                            <span className="font-mono font-bold text-black">
                              {link.sourceDomain}
                            </span>
                            <span className={`text-xs font-mono px-2 py-1 border border-black ${
                              link.linkType === 'dofollow' ? 'bg-green-200' : 'bg-yellow-200'
                            }`}>
                              {link.linkType.toUpperCase()}
                            </span>
                          </div>
                          
                          <div className="text-xs font-mono text-gray-600 mb-1">
                            Anchor: "{link.anchorText}"
                          </div>
                          
                          <div className="flex items-center space-x-4 text-xs font-mono">
                            <span>DA: {link.domainAuthority}</span>
                            <span>First Seen: {link.firstSeen}</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => window.open(link.sourceUrl, '_blank')}
                          className="btn-secondary flex items-center space-x-1 font-mono text-xs px-2 py-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>VIEW</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="card p-6">
              <div className="bg-green-500 text-black font-bold py-2 px-4 mb-4 border-b-4 border-black">
                <h2 className="text-xl font-mono">
                  [OUTPUT] BACKLINK ANALYSIS
                </h2>
              </div>
              
              <div className="flex flex-col items-center justify-center h-64 bg-gray-200 dark:bg-gray-600 border-4 border-black">
                <BarChart3 className="h-16 w-16 mb-4 text-black dark:text-white" />
                <p className="text-center font-mono font-bold text-black dark:text-white">
                  ENTER A DOMAIN AND CLICK "CHECK BACKLINKS" TO ANALYZE LINK PROFILE
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 card p-6">
        <div className="bg-purple-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
          <h3 className="text-lg font-mono">
            [TIPS] BACKLINK ANALYSIS
          </h3>
        </div>
        <div className="retro-alert retro-alert-warning">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-black font-mono font-bold">
            <div>
              {'>> QUALITY > QUANTITY: FOCUS ON HIGH DA SITES'}
            </div>
            <div>
              {'>> DOFOLLOW LINKS PASS MORE SEO VALUE'}
            </div>
            <div>
              {'>> DIVERSE ANCHOR TEXT IS NATURAL'}
            </div>
            <div>
              {'>> MONITOR COMPETITOR BACKLINKS'}
            </div>
            <div>
              {'>> DISAVOW TOXIC/SPAM LINKS'}
            </div>
            <div>
              {'>> BUILD RELATIONSHIPS FOR NATURAL LINKS'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BacklinkChecker
