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
    if (difficulty <= 30) return 'text-green-600'
    if (difficulty <= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getDifficultyLabel = (difficulty) => {
    if (difficulty <= 30) return 'EASY'
    if (difficulty <= 60) return 'MEDIUM'
    return 'HARD'
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Keyword Research Tool
        </h1>
        <p className="text-xl text-gray-600">
          Discover profitable keywords and analyze search trends
        </p>
      </div>

      {/* Retro Window Header */}
      <div className="retro-window mb-8">
        <div className="retro-window-header">
          <div className="flex items-center space-x-3">
            <Target className="h-6 w-6" />
            <span className="text-lg font-bold">KEYWORD RESEARCH v1.0</span>
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
              {'>> FIND HIGH-VALUE KEYWORDS FOR SEO SUCCESS <<'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="card p-6">
          <div className="bg-blue-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
            <h2 className="text-xl font-mono">
              [INPUT] KEYWORD
            </h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-black mb-2 font-mono">
                SEED KEYWORD:
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="ENTER KEYWORD (e.g., seo tools)"
                className="input-field font-mono"
                onKeyPress={(e) => e.key === 'Enter' && researchKeywords()}
              />
              <div className="text-xs text-gray-600 mt-1 font-mono">
                💡 TIP: Use 1-3 words for best results
              </div>
            </div>

            {error && (
              <div className="retro-alert retro-alert-error font-mono font-bold">
                ERROR: {error}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <button
                onClick={researchKeywords}
                disabled={loading || !keyword.trim()}
                className="btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
              >
                {loading ? (
                  <>
                    <div className="retro-spinner"></div>
                    <span>RESEARCHING...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span>RESEARCH KEYWORDS</span>
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
              {/* Main Keyword Stats */}
              <div className="card p-6">
                <div className="bg-green-500 text-black font-bold py-2 px-4 mb-4 border-b-4 border-black">
                  <h2 className="text-xl font-mono">
                    [MAIN] {result.mainKeyword.toUpperCase()}
                  </h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 border-4 border-black text-center">
                    <div className="text-2xl font-bold font-mono text-blue-600 mb-1">
                      {result.mainVolume.toLocaleString()}
                    </div>
                    <div className="text-xs font-mono font-bold text-black">MONTHLY SEARCHES</div>
                  </div>
                  
                  <div className="bg-white p-4 border-4 border-black text-center">
                    <div className={`text-2xl font-bold font-mono mb-1 ${getDifficultyColor(result.mainDifficulty)}`}>
                      {result.mainDifficulty}
                    </div>
                    <div className="text-xs font-mono font-bold text-black">DIFFICULTY</div>
                    <div className={`text-xs font-mono font-bold ${getDifficultyColor(result.mainDifficulty)}`}>
                      {getDifficultyLabel(result.mainDifficulty)}
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 border-4 border-black text-center">
                    <div className="text-2xl font-bold font-mono text-green-600 mb-1">
                      ${result.mainCpc}
                    </div>
                    <div className="text-xs font-mono font-bold text-black">CPC (USD)</div>
                  </div>
                  
                  <div className="bg-white p-4 border-4 border-black text-center">
                    <div className="text-2xl font-bold font-mono text-purple-600 mb-1">
                      {result.totalSuggestions}
                    </div>
                    <div className="text-xs font-mono font-bold text-black">SUGGESTIONS</div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="text-xs font-mono text-black">
                    Researched: {result.searchedAt}
                  </div>
                  <button
                    onClick={exportKeywords}
                    className="btn-secondary flex items-center space-x-2 font-mono text-sm px-3 py-1"
                  >
                    <Download className="h-3 w-3" />
                    <span>EXPORT CSV</span>
                  </button>
                </div>
              </div>

              {/* Related Keywords */}
              <div className="card p-6">
                <div className="bg-yellow-500 text-black font-bold py-2 px-4 mb-4 border-b-4 border-black">
                  <h2 className="text-xl font-mono">
                    [RELATED] KEYWORD VARIATIONS
                  </h2>
                </div>
                
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {result.relatedKeywords.map((kw, index) => (
                    <div key={index} className="bg-gray-100 p-3 border-2 border-black">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-mono font-bold text-black text-sm mb-1">
                            {kw.keyword}
                          </div>
                          <div className="flex items-center space-x-4 text-xs font-mono">
                            <span className="text-blue-600">Vol: {kw.volume.toLocaleString()}</span>
                            <span className={getDifficultyColor(kw.difficulty)}>
                              Diff: {kw.difficulty}
                            </span>
                            <span className="text-green-600">CPC: ${kw.cpc}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className={`h-4 w-4 ${kw.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Long Tail Keywords */}
              <div className="card p-6">
                <div className="bg-purple-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
                  <h2 className="text-xl font-mono">
                    [LONG TAIL] LOW COMPETITION
                  </h2>
                </div>
                
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {result.longTailKeywords.map((kw, index) => (
                    <div key={index} className="bg-gray-100 p-3 border-2 border-black">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-mono font-bold text-black text-sm mb-1">
                            {kw.keyword}
                          </div>
                          <div className="flex items-center space-x-4 text-xs font-mono">
                            <span className="text-blue-600">Vol: {kw.volume.toLocaleString()}</span>
                            <span className={getDifficultyColor(kw.difficulty)}>
                              Diff: {kw.difficulty}
                            </span>
                            <span className="text-green-600">CPC: ${kw.cpc}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className={`h-4 w-4 ${kw.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                        </div>
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
                  [OUTPUT] KEYWORD DATA
                </h2>
              </div>
              
              <div className="flex flex-col items-center justify-center h-64 bg-gray-200 border-4 border-black">
                <BarChart3 className="h-16 w-16 mb-4 text-black" />
                <p className="text-center font-mono font-bold text-black">
                  ENTER A KEYWORD AND CLICK "RESEARCH KEYWORDS" TO DISCOVER OPPORTUNITIES
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
            [TIPS] KEYWORD STRATEGY
          </h3>
        </div>
        <div className="retro-alert retro-alert-warning">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-black font-mono font-bold">
            <div>
              {'>> TARGET LOW DIFFICULTY KEYWORDS FIRST'}
            </div>
            <div>
              {'>> LONG TAIL KEYWORDS CONVERT BETTER'}
            </div>
            <div>
              {'>> FOCUS ON SEARCH INTENT MATCHING'}
            </div>
            <div>
              {'>> ANALYZE COMPETITOR KEYWORDS'}
            </div>
            <div>
              {'>> TRACK KEYWORD RANKINGS REGULARLY'}
            </div>
            <div>
              {'>> CREATE CONTENT AROUND KEYWORDS'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KeywordResearch
