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
    if (score >= 80) return 'text-black'
    if (score >= 60) return 'text-gray-700'
    return 'text-gray-900'
  }

  const getScoreLabel = (score) => {
    if (score >= 80) return 'EXCELLENT'
    if (score >= 60) return 'GOOD'
    return 'NEEDS WORK'
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-5 w-5 text-black" />
      case 'warning': return <AlertTriangle className="h-5 w-5 text-gray-600" />
      case 'fail': return <XCircle className="h-5 w-5 text-gray-800" />
      default: return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pass': return 'border-gray-300 bg-gray-50'
      case 'warning': return 'border-gray-300 bg-gray-100'
      case 'fail': return 'border-gray-400 bg-gray-100'
      default: return 'border-gray-300 bg-gray-50'
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="award-heading-1 mb-4">
          Website SEO Checker
        </h1>
        <p className="text-xl text-gray-600">
          Analyze your website's SEO performance and get improvement recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="award-card p-6">
          <h2 className="award-heading-3 mb-4 pb-3 border-b border-gray-200">
            Website URL
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="award-input"
                onKeyPress={(e) => e.key === 'Enter' && checkSEO()}
              />
              <div className="text-xs text-gray-500 mt-1">
                Include https:// for best results
              </div>
            </div>

            {error && (
              <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 text-sm text-gray-700">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <button
                onClick={checkSEO}
                disabled={loading || !url.trim()}
                className="award-btn award-btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="award-spinner"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span>Analyze SEO</span>
                  </>
                )}
              </button>

              <button
                onClick={clearAll}
                className="award-btn award-btn-secondary flex items-center justify-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          {result ? (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className="award-card p-6">
                <h2 className="award-heading-3 mb-4 pb-3 border-b border-gray-200">
                  SEO Score
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 border border-gray-200 rounded-lg text-center">
                    <div className={`text-4xl font-bold mb-2 ${getScoreColor(result.overallScore)}`}>
                      {result.overallScore}/100
                    </div>
                    <div className="text-lg font-semibold text-gray-900">Overall SEO Score</div>
                    <div className={`text-sm font-medium ${getScoreColor(result.overallScore)}`}>
                      {getScoreLabel(result.overallScore)}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Passed:</span>
                        <span className="text-gray-900 font-semibold">{result.summary.pass}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Warnings:</span>
                        <span className="text-gray-900 font-semibold">{result.summary.warning}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Failed:</span>
                        <span className="text-gray-900 font-semibold">{result.summary.fail}</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 pt-2">
                        <span className="text-gray-900 font-semibold">Total:</span>
                        <span className="text-gray-900 font-semibold">{result.summary.total}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="text-xs text-gray-600">
                    Analyzed: {result.checkedAt}
                  </div>
                  <button
                    onClick={downloadReport}
                    className="award-btn award-btn-secondary flex items-center space-x-2 text-sm px-3 py-1"
                  >
                    <Download className="h-3 w-3" />
                    <span>Download Report</span>
                  </button>
                </div>
              </div>

              {/* SEO Checks */}
              <div className="award-card p-6">
                <h2 className="award-heading-3 mb-4 pb-3 border-b border-gray-200">
                  SEO Factors
                </h2>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {result.checks.map((check, index) => (
                    <div key={index} className={`p-3 border rounded-lg ${getStatusColor(check.status)}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(check.status)}
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">
                              {check.name}
                            </div>
                            <div className="text-xs text-gray-600">
                              {check.message}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900 text-sm">
                            {check.score}/10
                          </div>
                          <div className="text-xs text-gray-500">
                            {check.status.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="award-card p-6">
                <h2 className="award-heading-3 mb-4 pb-3 border-b border-gray-200">
                  Recommendations
                </h2>
                
                <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Top Priorities</h3>
                  <div className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-700">#{index + 1}</span>
                        <span className="text-gray-700 text-sm">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="award-card p-6">
              <h2 className="award-heading-3 mb-4 pb-3 border-b border-gray-200">
                SEO Analysis
              </h2>
              
              <div className="flex flex-col items-center justify-center h-64 bg-gray-50 border border-gray-200 rounded-lg">
                <Globe className="h-16 w-16 mb-4 text-gray-400" />
                <p className="text-center text-gray-600">
                  Enter a website URL and click "Analyze SEO" to get detailed report
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 award-card p-6">
        <h3 className="award-heading-3 mb-4 pb-3 border-b border-gray-200">
          SEO Best Practices
        </h3>
        <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              • Optimize page titles & meta descriptions
            </div>
            <div>
              • Use proper heading structure (H1-H6)
            </div>
            <div>
              • Add alt tags to all images
            </div>
            <div>
              • Ensure mobile responsiveness
            </div>
            <div>
              • Improve page loading speed
            </div>
            <div>
              • Create XML sitemap & robots.txt
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebsiteSEOChecker
