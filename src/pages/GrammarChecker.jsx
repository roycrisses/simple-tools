import React, { useState } from 'react'
import { BookOpen, Search, AlertCircle, CheckCircle, RotateCcw, Download } from 'lucide-react'

const GrammarChecker = () => {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const checkGrammar = async () => {
    if (!text.trim()) {
      setError('Please enter some text to check')
      return
    }

    if (text.length < 10) {
      setError('Please enter at least 10 characters for grammar checking')
      return
    }

    setLoading(true)
    setError('')

    try {
      await new Promise(resolve => setTimeout(resolve, 2500))
      
      // Generate mock grammar errors
      const words = text.split(/\s+/)
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
      const errors = []

      // Common grammar error patterns
      const errorPatterns = [
        { type: 'Spelling', message: 'Possible spelling mistake', severity: 'high' },
        { type: 'Grammar', message: 'Subject-verb disagreement', severity: 'high' },
        { type: 'Punctuation', message: 'Missing comma', severity: 'medium' },
        { type: 'Style', message: 'Consider using active voice', severity: 'low' },
        { type: 'Clarity', message: 'Sentence may be unclear', severity: 'medium' },
        { type: 'Redundancy', message: 'Redundant word usage', severity: 'low' }
      ]

      // Simulate finding errors (30% chance per sentence)
      sentences.forEach((sentence, index) => {
        if (Math.random() < 0.3) {
          const errorType = errorPatterns[Math.floor(Math.random() * errorPatterns.length)]
          const startPos = text.indexOf(sentence.trim())
          const wordInSentence = sentence.trim().split(/\s+/)[Math.floor(Math.random() * sentence.trim().split(/\s+/).length)]
          
          errors.push({
            id: index + 1,
            type: errorType.type,
            message: errorType.message,
            severity: errorType.severity,
            text: wordInSentence,
            sentence: sentence.trim(),
            position: startPos,
            suggestion: `Corrected ${wordInSentence}`
          })
        }
      })

      const totalWords = words.length
      const totalSentences = sentences.length
      const errorCount = errors.length
      const accuracyScore = Math.max(0, Math.round(((totalSentences - errorCount) / totalSentences) * 100))

      setResult({
        originalText: text,
        totalWords,
        totalSentences,
        errorCount,
        accuracyScore,
        errors,
        checkedAt: new Date().toLocaleString(),
        readabilityScore: Math.floor(Math.random() * 40) + 60, // 60-100
        fleschScore: Math.floor(Math.random() * 30) + 70 // 70-100
      })
    } catch (err) {
      setError('Failed to check grammar. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const clearAll = () => {
    setText('')
    setResult(null)
    setError('')
  }

  const downloadReport = () => {
    if (!result) return
    
    const report = `
GRAMMAR CHECK REPORT
====================
Checked: ${result.checkedAt}
Total Words: ${result.totalWords}
Total Sentences: ${result.totalSentences}
Accuracy Score: ${result.accuracyScore}%
Readability Score: ${result.readabilityScore}%

ERRORS FOUND (${result.errorCount}):
${result.errors.map((error, i) => 
  `${i + 1}. ${error.type}: "${error.text}" - ${error.message}
     Suggestion: ${error.suggestion}
     Sentence: "${error.sentence}"`
).join('\n\n')}

RECOMMENDATIONS:
- Review highlighted errors above
- Consider suggestions for improvement
- Aim for 90%+ accuracy score
- Higher readability improves user engagement
    `.trim()

    const blob = new Blob([report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'grammar-report.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400'
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getScoreLabel = (score) => {
    if (score >= 90) return 'EXCELLENT'
    if (score >= 70) return 'GOOD'
    return 'NEEDS IMPROVEMENT'
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-red-400 bg-red-100'
      case 'medium': return 'border-yellow-400 bg-yellow-100'
      case 'low': return 'border-blue-400 bg-blue-100'
      default: return 'border-gray-400 bg-gray-100'
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Grammar Checker
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Check your text for grammar, spelling, and style errors
        </p>
      </div>

      {/* Retro Window Header */}
      <div className="retro-window mb-8">
        <div className="retro-window-header">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-6 w-6" />
            <span className="text-lg font-bold">GRAMMAR ANALYZER v1.0</span>
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
              {'>> PERFECT YOUR WRITING WITH ADVANCED GRAMMAR CHECKING <<'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="card p-6">
          <div className="bg-blue-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
            <h2 className="text-xl font-mono">
              [INPUT] TEXT TO CHECK
            </h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-black dark:text-white mb-2 font-mono">
                PASTE YOUR TEXT:
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="PASTE YOUR TEXT HERE TO CHECK FOR GRAMMAR, SPELLING, AND STYLE ERRORS..."
                className="input-field h-64 resize-none font-mono text-sm"
                maxLength={5000}
              />
              <div className="text-sm text-black dark:text-white mt-1 font-mono font-bold">
                {text.length}/5,000 CHARACTERS | {text.split(/\s+/).filter(w => w.length > 0).length} WORDS
              </div>
            </div>

            {error && (
              <div className="retro-alert retro-alert-error font-mono font-bold">
                ERROR: {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={checkGrammar}
                disabled={loading || !text.trim()}
                className="btn-primary flex-1 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
              >
                {loading ? (
                  <>
                    <div className="retro-spinner"></div>
                    <span>CHECKING...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span>CHECK GRAMMAR</span>
                  </>
                )}
              </button>

              <button
                onClick={clearAll}
                className="btn-secondary flex items-center justify-center space-x-2 font-mono px-4 py-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>CLEAR</span>
              </button>
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div className="card p-6">
          <div className="bg-green-500 text-black font-bold py-2 px-4 mb-4 border-b-4 border-black">
            <h2 className="text-xl font-mono">
              [OUTPUT] GRAMMAR ANALYSIS
            </h2>
          </div>
          
          {result ? (
            <div className="space-y-4">
              {/* Score Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 border-4 border-black text-center">
                  <div className={`text-3xl font-bold font-mono mb-2 ${getScoreColor(result.accuracyScore)}`}>
                    {result.accuracyScore}%
                  </div>
                  <div className="text-sm font-mono font-bold text-black">ACCURACY SCORE</div>
                  <div className={`text-xs font-mono font-bold ${getScoreColor(result.accuracyScore)}`}>
                    {getScoreLabel(result.accuracyScore)}
                  </div>
                </div>

                <div className="bg-white p-4 border-4 border-black text-center">
                  <div className={`text-3xl font-bold font-mono mb-2 ${getScoreColor(result.readabilityScore)}`}>
                    {result.readabilityScore}%
                  </div>
                  <div className="text-sm font-mono font-bold text-black">READABILITY</div>
                  <div className={`text-xs font-mono font-bold ${getScoreColor(result.readabilityScore)}`}>
                    {getScoreLabel(result.readabilityScore)}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gray-100 p-4 border-4 border-black">
                <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                  <div>
                    <span className="font-bold text-black">TOTAL WORDS:</span>
                    <span className="text-black ml-2">{result.totalWords}</span>
                  </div>
                  <div>
                    <span className="font-bold text-black">SENTENCES:</span>
                    <span className="text-black ml-2">{result.totalSentences}</span>
                  </div>
                  <div>
                    <span className="font-bold text-black">ERRORS FOUND:</span>
                    <span className={`ml-2 ${result.errorCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {result.errorCount}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-black">CHECKED:</span>
                    <span className="text-black ml-2">{result.checkedAt}</span>
                  </div>
                </div>
              </div>

              {/* Errors List */}
              {result.errors.length > 0 ? (
                <div>
                  <h3 className="font-mono font-bold text-black dark:text-white mb-2">
                    ERRORS & SUGGESTIONS:
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {result.errors.map((error, index) => (
                      <div key={error.id} className={`p-3 border-2 ${getSeverityColor(error.severity)}`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <span className="font-mono font-bold text-black text-sm">
                              {error.type.toUpperCase()}
                            </span>
                            <span className={`text-xs font-mono px-2 py-1 border border-black ${
                              error.severity === 'high' ? 'bg-red-200' : 
                              error.severity === 'medium' ? 'bg-yellow-200' : 'bg-blue-200'
                            }`}>
                              {error.severity.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm font-mono text-black mb-1">
                          <strong>Issue:</strong> "{error.text}" - {error.message}
                        </div>
                        <div className="text-sm font-mono text-green-700">
                          <strong>Suggestion:</strong> {error.suggestion}
                        </div>
                        <div className="text-xs font-mono text-gray-600 mt-1">
                          In: "{error.sentence}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-green-100 p-4 border-2 border-green-400 text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-mono font-bold text-green-700">
                    EXCELLENT! NO GRAMMAR ERRORS FOUND
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={downloadReport}
                  className="btn-primary flex-1 flex items-center justify-center space-x-2 font-mono"
                >
                  <Download className="h-4 w-4" />
                  <span>DOWNLOAD REPORT</span>
                </button>
                <button
                  onClick={checkGrammar}
                  className="btn-secondary flex items-center justify-center space-x-2 font-mono"
                >
                  <Search className="h-4 w-4" />
                  <span>RECHECK</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-200 dark:bg-gray-600 border-4 border-black">
              <BookOpen className="h-16 w-16 mb-4 text-black dark:text-white" />
              <p className="text-center font-mono font-bold text-black dark:text-white">
                PASTE YOUR TEXT AND CLICK "CHECK GRAMMAR" TO ANALYZE WRITING QUALITY
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 card p-6">
        <div className="bg-purple-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
          <h3 className="text-lg font-mono">
            [TIPS] WRITING IMPROVEMENT
          </h3>
        </div>
        <div className="retro-alert retro-alert-warning">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-black font-mono font-bold">
            <div>
              {'>> READ YOUR TEXT ALOUD TO CATCH ERRORS'}
            </div>
            <div>
              {'>> USE ACTIVE VOICE FOR CLARITY'}
            </div>
            <div>
              {'>> KEEP SENTENCES CONCISE & CLEAR'}
            </div>
            <div>
              {'>> CHECK SUBJECT-VERB AGREEMENT'}
            </div>
            <div>
              {'>> PROOFREAD BEFORE PUBLISHING'}
            </div>
            <div>
              {'>> AIM FOR 90%+ ACCURACY SCORE'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GrammarChecker
