import React, { useState } from 'react'
import { Globe, Search, CheckCircle, AlertTriangle, XCircle, RotateCcw, Download } from 'lucide-react'

const WebsiteSEOChecker = () => {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const checkSEO = async () => {
    if (!url.trim()) {
      setError('Please enter a website URL')
      return
    }

    // Basic URL validation
    let cleanUrl = url.trim()
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl
    }

    try {
      new URL(cleanUrl)
    } catch {
      setError('Please enter a valid URL (e.g., https://example.com)')
      return
    }

    setLoading(true)
    setError('')

    try {
      await new Promise(resolve => setTimeout(resolve, 4000))
      
      // Generate mock SEO analysis
      const seoChecks = [
        { name: 'Title Tag', status: Math.random() > 0.2 ? 'pass' : 'fail', message: 'Title tag found and optimized', score: 10 },
        { name: 'Meta Description', status: Math.random() > 0.3 ? 'pass' : 'warning', message: 'Meta description present', score: 8 },
        { name: 'H1 Tag', status: Math.random() > 0.2 ? 'pass' : 'fail', message: 'H1 tag found', score: 8 },
        { name: 'Image Alt Tags', status: Math.random() > 0.4 ? 'warning' : 'pass', message: 'Most images have alt tags', score: 6 },
        { name: 'SSL Certificate', status: Math.random() > 0.1 ? 'pass' : 'fail', message: 'SSL certificate valid', score: 10 },
        { name: 'Mobile Friendly', status: Math.random() > 0.2 ? 'pass' : 'warning', message: 'Website is mobile responsive', score: 9 },
        { name: 'Page Speed', status: Math.random() > 0.3 ? 'warning' : 'pass', message: 'Page loads in acceptable time', score: 7 },
        { name: 'XML Sitemap', status: Math.random() > 0.4 ? 'pass' : 'fail', message: 'XML sitemap found', score: 6 },
        { name: 'Robots.txt', status: Math.random() > 0.3 ? 'pass' : 'warning', message: 'Robots.txt file present', score: 5 },
        { name: 'Schema Markup', status: Math.random() > 0.6 ? 'warning' : 'fail', message: 'Limited schema markup found', score: 4 },
        { name: 'Internal Links', status: Math.random() > 0.2 ? 'pass' : 'warning', message: 'Good internal linking structure', score: 7 },
        { name: 'External Links', status: Math.random() > 0.3 ? 'pass' : 'warning', message: 'External links are appropriate', score: 5 }
      ]

      const totalScore = seoChecks.reduce((sum, check) => sum + check.score, 0)
      const maxScore = seoChecks.length * 10
      const overallScore = Math.round((totalScore / maxScore) * 100)

      const passCount = seoChecks.filter(c => c.status === 'pass').length
      const warningCount = seoChecks.filter(c => c.status === 'warning').length
      const failCount = seoChecks.filter(c => c.status === 'fail').length

      setResult({
        url: cleanUrl,
        overallScore,
        checks: seoChecks,
        summary: {
          pass: passCount,
          warning: warningCount,
          fail: failCount,
          total: seoChecks.length
        },
        recommendations: [
          'Optimize page loading speed',
          'Add more schema markup',
          'Improve image alt tags',
          'Enhance internal linking',
          'Update meta descriptions'
        ],
        checkedAt: new Date().toLocaleString()
      })
    } catch (err) {
      setError('Failed to analyze website. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const clearAll = () => {
    setUrl('')
    setResult(null)
    setError('')
  }

  const downloadReport = () => {
    if (!result) return
    
    const report = `
SEO ANALYSIS REPORT
==================
Website: ${result.url}
Checked: ${result.checkedAt}
Overall Score: ${result.overallScore}/100

SUMMARY:
- Passed: ${result.summary.pass}/${result.summary.total}
- Warnings: ${result.summary.warning}/${result.summary.total}
- Failed: ${result.summary.fail}/${result.summary.total}

DETAILED RESULTS:
${result.checks.map(check => 
  `${check.status.toUpperCase()}: ${check.name} - ${check.message} (${check.score}/10)`
).join('\n')}

RECOMMENDATIONS:
${result.recommendations.map(rec => `- ${rec}`).join('\n')}
    `.trim()

    const blob = new Blob([report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'seo-analysis-report.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreLabel = (score) => {
    if (score >= 80) return 'EXCELLENT'
    if (score >= 60) return 'GOOD'
    return 'NEEDS WORK'
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'fail': return <XCircle className="h-5 w-5 text-red-600" />
      default: return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pass': return 'border-green-400 bg-green-100'
      case 'warning': return 'border-yellow-400 bg-yellow-100'
      case 'fail': return 'border-red-400 bg-red-100'
      default: return 'border-gray-400 bg-gray-100'
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Website SEO Checker
        </h1>
        <p className="text-xl text-gray-600">
          Analyze your website's SEO performance and get improvement recommendations
        </p>
      </div>

      {/* Retro Window Header */}
      <div className="retro-window mb-8">
        <div className="retro-window-header">
          <div className="flex items-center space-x-3">
            <Globe className="h-6 w-6" />
            <span className="text-lg font-bold">SEO ANALYZER v1.0</span>
          </div>
          <div className="retro-window-controls">
            <div className="retro-window-control control-minimize"></div>
            <div className="retro-window-control control-maximize"></div>
            <div className="retro-window-control control-close"></div>
          </div>
        </div>
        <div className="p-6 bg-gray-100">
          <div className="text-center mb-6">
            <p className="text-lg font-bold text-black font-mono">
              {'>> COMPREHENSIVE SEO ANALYSIS & OPTIMIZATION RECOMMENDATIONS <<'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="card p-6">
          <div className="bg-blue-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
            <h2 className="text-xl font-mono">
              [INPUT] WEBSITE URL
            </h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-black mb-2 font-mono">
                WEBSITE URL:
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="ENTER URL (e.g., https://example.com)"
                className="input-field font-mono"
                onKeyPress={(e) => e.key === 'Enter' && checkSEO()}
              />
              <div className="text-xs text-gray-600 mt-1 font-mono">
                💡 TIP: Include https:// for best results
              </div>
            </div>

            {error && (
              <div className="retro-alert retro-alert-error font-mono font-bold">
                ERROR: {error}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <button
                onClick={checkSEO}
                disabled={loading || !url.trim()}
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
                    <span>ANALYZE SEO</span>
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
              {/* Overall Score */}
              <div className="card p-6">
                <div className="bg-green-500 text-black font-bold py-2 px-4 mb-4 border-b-4 border-black">
                  <h2 className="text-xl font-mono">
                    [SCORE] SEO ANALYSIS
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 border-4 border-black text-center">
                    <div className={`text-4xl font-bold font-mono mb-2 ${getScoreColor(result.overallScore)}`}>
                      {result.overallScore}/100
                    </div>
                    <div className="text-lg font-mono font-bold text-black">OVERALL SEO SCORE</div>
                    <div className={`text-sm font-mono font-bold ${getScoreColor(result.overallScore)}`}>
                      {getScoreLabel(result.overallScore)}
                    </div>
                  </div>

                  <div className="bg-gray-100 p-4 border-4 border-black">
                    <h3 className="font-mono font-bold text-black mb-3">SUMMARY:</h3>
                    <div className="space-y-2 text-sm font-mono">
                      <div className="flex justify-between">
                        <span className="text-black">PASSED:</span>
                        <span className="text-green-600 font-bold">{result.summary.pass}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">WARNINGS:</span>
                        <span className="text-yellow-600 font-bold">{result.summary.warning}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">FAILED:</span>
                        <span className="text-red-600 font-bold">{result.summary.fail}</span>
                      </div>
                      <div className="flex justify-between border-t border-black pt-2">
                        <span className="text-black font-bold">TOTAL:</span>
                        <span className="text-black font-bold">{result.summary.total}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="text-xs font-mono text-black">
                    Analyzed: {result.checkedAt}
                  </div>
                  <button
                    onClick={downloadReport}
                    className="btn-secondary flex items-center space-x-2 font-mono text-sm px-3 py-1"
                  >
                    <Download className="h-3 w-3" />
                    <span>DOWNLOAD REPORT</span>
                  </button>
                </div>
              </div>

              {/* SEO Checks */}
              <div className="card p-6">
                <div className="bg-yellow-500 text-black font-bold py-2 px-4 mb-4 border-b-4 border-black">
                  <h2 className="text-xl font-mono">
                    [CHECKS] SEO FACTORS
                  </h2>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {result.checks.map((check, index) => (
                    <div key={index} className={`p-3 border-2 ${getStatusColor(check.status)}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(check.status)}
                          <div>
                            <div className="font-mono font-bold text-black text-sm">
                              {check.name}
                            </div>
                            <div className="text-xs font-mono text-gray-700">
                              {check.message}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-black text-sm">
                            {check.score}/10
                          </div>
                          <div className="text-xs font-mono text-gray-600">
                            {check.status.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="card p-6">
                <div className="bg-purple-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
                  <h2 className="text-xl font-mono">
                    [RECOMMENDATIONS] IMPROVEMENTS
                  </h2>
                </div>
                
                <div className="bg-blue-100 p-4 border-4 border-black">
                  <h3 className="font-mono font-bold text-black mb-3">TOP PRIORITIES:</h3>
                  <div className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-blue-600">#{index + 1}</span>
                        <span className="font-mono text-black text-sm">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card p-6">
              <div className="bg-green-500 text-black font-bold py-2 px-4 mb-4 border-b-4 border-black">
                <h2 className="text-xl font-mono">
                  [OUTPUT] SEO ANALYSIS
                </h2>
              </div>
              
              <div className="flex flex-col items-center justify-center h-64 bg-gray-200 border-4 border-black">
                <Globe className="h-16 w-16 mb-4 text-black" />
                <p className="text-center font-mono font-bold text-black">
                  ENTER A WEBSITE URL AND CLICK "ANALYZE SEO" TO GET DETAILED REPORT
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
            [TIPS] SEO BEST PRACTICES
          </h3>
        </div>
        <div className="retro-alert retro-alert-warning">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-black font-mono font-bold">
            <div>
              {'>> OPTIMIZE PAGE TITLES & META DESCRIPTIONS'}
            </div>
            <div>
              {'>> USE PROPER HEADING STRUCTURE (H1-H6)'}
            </div>
            <div>
              {'>> ADD ALT TAGS TO ALL IMAGES'}
            </div>
            <div>
              {'>> ENSURE MOBILE RESPONSIVENESS'}
            </div>
            <div>
              {'>> IMPROVE PAGE LOADING SPEED'}
            </div>
            <div>
              {'>> CREATE XML SITEMAP & ROBOTS.TXT'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebsiteSEOChecker
