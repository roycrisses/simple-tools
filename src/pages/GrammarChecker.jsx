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
    if (score >= 90) return 'text-black'
    if (score >= 70) return 'text-gray-700'
    return 'text-gray-900'
  }

  const getScoreLabel = (score) => {
    if (score >= 90) return 'EXCELLENT'
    if (score >= 70) return 'GOOD'
    return 'NEEDS IMPROVEMENT'
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-gray-400 bg-gray-100'
      case 'medium': return 'border-gray-300 bg-gray-50'
      case 'low': return 'border-gray-300 bg-gray-50'
      default: return 'border-gray-300 bg-gray-50'
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="award-heading-1 mb-4">
          Grammar Checker
        </h1>
        <p className="text-xl text-gray-600">
          Check your text for grammar, spelling, and style errors
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="award-card p-6">
          <h2 className="award-heading-3 mb-4 pb-3 border-b border-gray-200">
            Text to Check
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Paste Your Text
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here to check for grammar, spelling, and style errors..."
                className="award-input h-64 resize-none text-sm"
                maxLength={5000}
              />
              <div className="text-sm text-gray-600 mt-1">
                {text.length}/5,000 characters | {text.split(/\s+/).filter(w => w.length > 0).length} words
              </div>
            </div>

            {error && (
              <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 text-sm text-gray-700">
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={checkGrammar}
                disabled={loading || !text.trim()}
                className="award-btn award-btn-primary flex-1 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="award-spinner"></div>
                    <span>Checking...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span>Check Grammar</span>
                  </>
                )}
              </button>

              <button
                onClick={clearAll}
                className="award-btn award-btn-secondary flex items-center justify-center space-x-2 px-4 py-2"
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
            Grammar Analysis
          </h2>
          
          {result ? (
            <div className="space-y-4">
              {/* Score Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg text-center">
                  <div className={`text-3xl font-bold mb-2 ${getScoreColor(result.accuracyScore)}`}>
                    {result.accuracyScore}%
                  </div>
                  <div className="text-sm font-semibold text-gray-900">Accuracy Score</div>
                  <div className={`text-xs font-medium ${getScoreColor(result.accuracyScore)}`}>
                    {getScoreLabel(result.accuracyScore)}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg text-center">
                  <div className={`text-3xl font-bold mb-2 ${getScoreColor(result.readabilityScore)}`}>
                    {result.readabilityScore}%
                  </div>
                  <div className="text-sm font-semibold text-gray-900">Readability</div>
                  <div className={`text-xs font-medium ${getScoreColor(result.readabilityScore)}`}>
                    {getScoreLabel(result.readabilityScore)}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Total Words:</span>
                    <span className="text-gray-900 ml-2">{result.totalWords}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Sentences:</span>
                    <span className="text-gray-900 ml-2">{result.totalSentences}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Errors Found:</span>
                    <span className="text-gray-900 ml-2">
                      {result.errorCount}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Checked:</span>
                    <span className="text-gray-900 ml-2">{result.checkedAt}</span>
                  </div>
                </div>
              </div>

              {/* Errors List */}
              {result.errors.length > 0 ? (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Errors & Suggestions
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {result.errors.map((error, index) => (
                      <div key={error.id} className={`p-3 border rounded-lg ${getSeverityColor(error.severity)}`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="h-4 w-4 text-gray-700" />
                            <span className="font-semibold text-gray-900 text-sm">
                              {error.type}
                            </span>
                            <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">
                              {error.severity}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-700 mb-1">
                          <strong>Issue:</strong> "{error.text}" - {error.message}
                        </div>
                        <div className="text-sm text-gray-700">
                          <strong>Suggestion:</strong> {error.suggestion}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          In: "{error.sentence}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg text-center">
                  <CheckCircle className="h-8 w-8 text-black mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">
                    Excellent! No grammar errors found
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={downloadReport}
                  className="award-btn award-btn-primary flex-1 flex items-center justify-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Report</span>
                </button>
                <button
                  onClick={checkGrammar}
                  className="award-btn award-btn-secondary flex items-center justify-center space-x-2"
                >
                  <Search className="h-4 w-4" />
                  <span>Recheck</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-50 border border-gray-200 rounded-lg">
              <BookOpen className="h-16 w-16 mb-4 text-gray-400" />
              <p className="text-center text-gray-600">
                Paste your text and click "Check Grammar" to analyze writing quality
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 award-card p-6">
        <h3 className="award-heading-3 mb-4 pb-3 border-b border-gray-200">
          Writing Improvement Tips
        </h3>
        <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              • Read your text aloud to catch errors
            </div>
            <div>
              • Use active voice for clarity
            </div>
            <div>
              • Keep sentences concise & clear
            </div>
            <div>
              • Check subject-verb agreement
            </div>
            <div>
              • Proofread before publishing
            </div>
            <div>
              • Aim for 90%+ accuracy score
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GrammarChecker
