import React, { useState } from 'react'
import { Search, TrendingUp, BarChart3, Target, RotateCcw, Download } from 'lucide-react'

const KeywordResearch = () => {
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const researchKeywords = async () => {
    if (!keyword.trim()) {
      setError('Please enter a keyword to research')
      return
    }

    setLoading(true)
    setError('')

    try {
      await new Promise(resolve => setTimeout(resolve, 2500))
      
      // Generate mock keyword data
      const baseKeyword = keyword.toLowerCase().trim()
      const relatedKeywords = []
      const longTailKeywords = []
      
      // Generate related keywords
      const prefixes = ['best', 'top', 'how to', 'what is', 'free', 'online', 'cheap']
      const suffixes = ['tool', 'software', 'app', 'service', 'guide', 'tips', 'review']
      
      for (let i = 0; i < 10; i++) {
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
        
        relatedKeywords.push({
          keyword: `${prefix} ${baseKeyword}`,
          volume: Math.floor(Math.random() * 10000) + 100,
          difficulty: Math.floor(Math.random() * 100) + 1,
          cpc: (Math.random() * 5).toFixed(2),
          trend: Math.random() > 0.5 ? 'up' : 'down'
        })
        
        longTailKeywords.push({
          keyword: `${prefix} ${baseKeyword} ${suffix}`,
          volume: Math.floor(Math.random() * 1000) + 50,
          difficulty: Math.floor(Math.random() * 50) + 1,
          cpc: (Math.random() * 3).toFixed(2),
          trend: Math.random() > 0.5 ? 'up' : 'down'
        })
      }

      setResult({
        mainKeyword: baseKeyword,
        mainVolume: Math.floor(Math.random() * 50000) + 1000,
        mainDifficulty: Math.floor(Math.random() * 100) + 1,
        mainCpc: (Math.random() * 10).toFixed(2),
        relatedKeywords,
        longTailKeywords,
        totalSuggestions: relatedKeywords.length + longTailKeywords.length,
        searchedAt: new Date().toLocaleString()
      })
    } catch (err) {
      setError('Failed to research keywords. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const clearAll = () => {
    setKeyword('')
    setResult(null)
    setError('')
  }

  const exportKeywords = () => {
    if (!result) return
    
    const csvContent = [
      ['Keyword', 'Search Volume', 'Difficulty', 'CPC', 'Type'],
      [result.mainKeyword, result.mainVolume, result.mainDifficulty, result.mainCpc, 'Main'],
      ...result.relatedKeywords.map(kw => [kw.keyword, kw.volume, kw.difficulty, kw.cpc, 'Related']),
      ...result.longTailKeywords.map(kw => [kw.keyword, kw.volume, kw.difficulty, kw.cpc, 'Long Tail'])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${result.mainKeyword}-keywords.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getDifficultyColor = (difficulty) => {
    if (difficulty <= 30) return 'text-black'
    if (difficulty <= 60) return 'text-gray-700'
    return 'text-gray-900'
  }

  const getDifficultyLabel = (difficulty) => {
    if (difficulty <= 30) return 'EASY'
    if (difficulty <= 60) return 'MEDIUM'
    return 'HARD'
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="award-heading-1 mb-4">
          Keyword Research Tool
        </h1>
        <p className="text-xl text-gray-600">
          Discover profitable keywords and analyze search trends
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="award-card p-6">
          <h2 className="award-heading-3 mb-4 pb-3 border-b border-gray-200">
            Keyword
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Seed Keyword
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter keyword (e.g., seo tools)"
                className="award-input"
                onKeyPress={(e) => e.key === 'Enter' && researchKeywords()}
              />
              <div className="text-xs text-gray-500 mt-1">
                Use 1-3 words for best results
              </div>
            </div>

            {error && (
              <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 text-sm text-gray-700">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <button
                onClick={researchKeywords}
                disabled={loading || !keyword.trim()}
                className="award-btn award-btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="award-spinner"></div>
                    <span>Researching...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span>Research Keywords</span>
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
              {/* Main Keyword Stats */}
              <div className="award-card p-6">
                <h2 className="award-heading-3 mb-4 pb-3 border-b border-gray-200">
                  {result.mainKeyword}
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg text-center">
                    <div className="text-2xl font-bold text-black mb-1">
                      {result.mainVolume.toLocaleString()}
                    </div>
                    <div className="text-xs font-semibold text-gray-700">Monthly Searches</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg text-center">
                    <div className={`text-2xl font-bold mb-1 ${getDifficultyColor(result.mainDifficulty)}`}>
                      {result.mainDifficulty}
                    </div>
                    <div className="text-xs font-semibold text-gray-700">Difficulty</div>
                    <div className={`text-xs font-medium ${getDifficultyColor(result.mainDifficulty)}`}>
                      {getDifficultyLabel(result.mainDifficulty)}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg text-center">
                    <div className="text-2xl font-bold text-black mb-1">
                      ${result.mainCpc}
                    </div>
                    <div className="text-xs font-semibold text-gray-700">CPC (USD)</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg text-center">
                    <div className="text-2xl font-bold text-black mb-1">
                      {result.totalSuggestions}
                    </div>
                    <div className="text-xs font-semibold text-gray-700">Suggestions</div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="text-xs text-gray-600">
                    Researched: {result.searchedAt}
                  </div>
                  <button
                    onClick={exportKeywords}
                    className="award-btn award-btn-secondary flex items-center space-x-2 text-sm px-3 py-1"
                  >
                    <Download className="h-3 w-3" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Related Keywords */}
              <div className="award-card p-6">
                <h2 className="award-heading-3 mb-4 pb-3 border-b border-gray-200">
                  Keyword Variations
                </h2>
                
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {result.relatedKeywords.map((kw, index) => (
                    <div key={index} className="bg-gray-50 p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 text-sm mb-1">
                            {kw.keyword}
                          </div>
                          <div className="flex items-center space-x-4 text-xs">
                            <span className="text-gray-700">Vol: {kw.volume.toLocaleString()}</span>
                            <span className={getDifficultyColor(kw.difficulty)}>
                              Diff: {kw.difficulty}
                            </span>
                            <span className="text-gray-700">CPC: ${kw.cpc}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className={`h-4 w-4 ${kw.trend === 'up' ? 'text-black' : 'text-gray-600'}`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Long Tail Keywords */}
              <div className="award-card p-6">
                <h2 className="award-heading-3 mb-4 pb-3 border-b border-gray-200">
                  Long Tail Keywords
                </h2>
                
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {result.longTailKeywords.map((kw, index) => (
                    <div key={index} className="bg-gray-50 p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 text-sm mb-1">
                            {kw.keyword}
                          </div>
                          <div className="flex items-center space-x-4 text-xs">
                            <span className="text-gray-700">Vol: {kw.volume.toLocaleString()}</span>
                            <span className={getDifficultyColor(kw.difficulty)}>
                              Diff: {kw.difficulty}
                            </span>
                            <span className="text-gray-700">CPC: ${kw.cpc}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className={`h-4 w-4 ${kw.trend === 'up' ? 'text-black' : 'text-gray-600'}`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="award-card p-6">
              <h2 className="award-heading-3 mb-4 pb-3 border-b border-gray-200">
                Keyword Data
              </h2>
              
              <div className="flex flex-col items-center justify-center h-64 bg-gray-50 border border-gray-200 rounded-lg">
                <BarChart3 className="h-16 w-16 mb-4 text-gray-400" />
                <p className="text-center text-gray-600">
                  Enter a keyword and click "Research Keywords" to discover opportunities
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 award-card p-6">
        <h3 className="award-heading-3 mb-4 pb-3 border-b border-gray-200">
          Keyword Strategy Tips
        </h3>
        <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              • Target low difficulty keywords first
            </div>
            <div>
              • Long tail keywords convert better
            </div>
            <div>
              • Focus on search intent matching
            </div>
            <div>
              • Analyze competitor keywords
            </div>
            <div>
              • Track keyword rankings regularly
            </div>
            <div>
              • Create content around keywords
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KeywordResearch
