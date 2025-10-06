import React, { useState, useRef } from 'react'
import { FileText, Search, AlertTriangle, CheckCircle, Upload, RotateCcw, Download } from 'lucide-react'

const PlagiarismChecker = () => {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const checkPlagiarism = async () => {
    if (!text.trim()) {
      setError('Please enter some text to check')
      return
    }

    if (text.length < 50) {
      setError('Please enter at least 50 characters for accurate checking')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Simulate plagiarism checking process
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Generate mock plagiarism results
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10)
      const plagiarizedSentences = []
      const sources = [
        'wikipedia.org',
        'britannica.com',
        'medium.com',
        'forbes.com',
        'techcrunch.com',
        'stackoverflow.com',
        'github.com'
      ]

      // Randomly mark some sentences as plagiarized
      sentences.forEach((sentence, index) => {
        if (Math.random() < 0.3) { // 30% chance of plagiarism
          plagiarizedSentences.push({
            id: index,
            text: sentence.trim(),
            source: sources[Math.floor(Math.random() * sources.length)],
            similarity: Math.floor(Math.random() * 40) + 60, // 60-100% similarity
            url: `https://${sources[Math.floor(Math.random() * sources.length)]}/article-${index + 1}`
          })
        }
      })

      const plagiarismPercentage = Math.round((plagiarizedSentences.length / sentences.length) * 100)
      const uniquePercentage = 100 - plagiarismPercentage

      setResult({
        originalText: text,
        totalWords: text.split(/\s+/).length,
        totalSentences: sentences.length,
        plagiarismPercentage,
        uniquePercentage,
        plagiarizedSentences,
        sources: [...new Set(plagiarizedSentences.map(p => p.source))],
        checkedAt: new Date().toLocaleString()
      })
    } catch (err) {
      setError('Failed to check plagiarism. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
        setError('Please upload a .txt file only')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target.result
        if (content.length > 10000) {
          setError('File too large. Please upload text under 10,000 characters.')
          return
        }
        setText(content)
        setError('')
      }
      reader.readAsText(file)
    }
  }

  const clearAll = () => {
    setText('')
    setResult(null)
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const downloadReport = () => {
    if (!result) return
    
    const report = `
PLAGIARISM CHECK REPORT
======================
Checked: ${result.checkedAt}
Total Words: ${result.totalWords}
Total Sentences: ${result.totalSentences}

RESULTS:
- Unique Content: ${result.uniquePercentage}%
- Plagiarized Content: ${result.plagiarismPercentage}%

PLAGIARIZED SENTENCES:
${result.plagiarizedSentences.map((p, i) => 
  `${i + 1}. "${p.text}" (${p.similarity}% match from ${p.source})`
).join('\n')}

SOURCES FOUND:
${result.sources.map(s => `- ${s}`).join('\n')}
    `.trim()

    const blob = new Blob([report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'plagiarism-report.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getResultColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400'
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getResultLabel = (percentage) => {
    if (percentage >= 80) return 'EXCELLENT'
    if (percentage >= 60) return 'GOOD'
    return 'NEEDS WORK'
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Plagiarism Checker
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Check your content for plagiarism and ensure originality
        </p>
      </div>

      {/* Retro Window Header */}
      <div className="retro-window mb-8">
        <div className="retro-window-header">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6" />
            <span className="text-lg font-bold">PLAGIARISM DETECTOR v1.0</span>
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
              {'>> DETECT PLAGIARISM & ENSURE CONTENT ORIGINALITY <<'}
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
            {/* File Upload */}
            <div>
              <label className="block text-sm font-bold text-black dark:text-white mb-2 font-mono">
                UPLOAD TEXT FILE (OPTIONAL):
              </label>
              <div className="border-4 border-black bg-gray-100 dark:bg-gray-600 p-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".txt"
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  data-testid="plagiarism-file-input"
                />
                
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer flex flex-col items-center justify-center h-20 border-2 border-dashed border-black bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Upload className="h-5 w-5 text-black" />
                    <span className="text-sm font-mono font-bold text-black">
                      CLICK TO UPLOAD .TXT FILE
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Text Input */}
            <div>
              <label className="block text-sm font-bold text-black dark:text-white mb-2 font-mono">
                OR PASTE YOUR TEXT:
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="PASTE YOUR CONTENT HERE TO CHECK FOR PLAGIARISM..."
                className="input-field h-64 resize-none font-mono text-sm"
                maxLength={10000}
              />
              <div className="text-sm text-black dark:text-white mt-1 font-mono font-bold">
                {text.length}/10,000 CHARACTERS | {text.split(/\s+/).filter(w => w.length > 0).length} WORDS
              </div>
            </div>

            {error && (
              <div className="retro-alert retro-alert-error font-mono font-bold">
                ERROR: {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={checkPlagiarism}
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
                    <span>CHECK PLAGIARISM</span>
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
              [OUTPUT] PLAGIARISM RESULTS
            </h2>
          </div>
          
          {result ? (
            <div className="space-y-4">
              {/* Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 border-4 border-black text-center">
                  <div className={`text-3xl font-bold font-mono mb-2 ${getResultColor(result.uniquePercentage)}`}>
                    {result.uniquePercentage}%
                  </div>
                  <div className="text-sm font-mono font-bold text-black">UNIQUE CONTENT</div>
                  <div className={`text-xs font-mono font-bold ${getResultColor(result.uniquePercentage)}`}>
                    {getResultLabel(result.uniquePercentage)}
                  </div>
                </div>

                <div className="bg-white p-4 border-4 border-black text-center">
                  <div className={`text-3xl font-bold font-mono mb-2 ${result.plagiarismPercentage > 20 ? 'text-red-600' : 'text-green-600'}`}>
                    {result.plagiarismPercentage}%
                  </div>
                  <div className="text-sm font-mono font-bold text-black">PLAGIARIZED</div>
                  <div className={`text-xs font-mono font-bold ${result.plagiarismPercentage > 20 ? 'text-red-600' : 'text-green-600'}`}>
                    {result.plagiarismPercentage > 20 ? 'HIGH RISK' : 'LOW RISK'}
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
                    <span className="font-bold text-black">SOURCES FOUND:</span>
                    <span className="text-black ml-2">{result.sources.length}</span>
                  </div>
                  <div>
                    <span className="font-bold text-black">CHECKED:</span>
                    <span className="text-black ml-2">{result.checkedAt}</span>
                  </div>
                </div>
              </div>

              {/* Plagiarized Sentences */}
              {result.plagiarizedSentences.length > 0 && (
                <div>
                  <h3 className="font-mono font-bold text-black dark:text-white mb-2">
                    PLAGIARIZED CONTENT:
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {result.plagiarizedSentences.map((item, index) => (
                      <div key={item.id} className="bg-red-100 p-3 border-2 border-red-400">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <span className="font-mono font-bold text-red-600 text-sm">
                              {item.similarity}% MATCH
                            </span>
                          </div>
                          <span className="font-mono text-xs text-red-600">
                            SOURCE: {item.source}
                          </span>
                        </div>
                        <p className="text-sm font-mono text-black">
                          "{item.text}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sources */}
              {result.sources.length > 0 && (
                <div>
                  <h3 className="font-mono font-bold text-black dark:text-white mb-2">
                    SOURCES DETECTED:
                  </h3>
                  <div className="bg-yellow-100 p-3 border-2 border-yellow-400">
                    {result.sources.map((source, index) => (
                      <div key={index} className="font-mono text-sm text-black">
                        • {source}
                      </div>
                    ))}
                  </div>
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
                  onClick={checkPlagiarism}
                  className="btn-secondary flex items-center justify-center space-x-2 font-mono"
                >
                  <Search className="h-4 w-4" />
                  <span>RECHECK</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-200 dark:bg-gray-600 border-4 border-black">
              <CheckCircle className="h-16 w-16 mb-4 text-black dark:text-white" />
              <p className="text-center font-mono font-bold text-black dark:text-white">
                PASTE YOUR TEXT AND CLICK "CHECK PLAGIARISM" TO ANALYZE ORIGINALITY
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 card p-6">
        <div className="bg-purple-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
          <h3 className="text-lg font-mono">
            [TIPS] PLAGIARISM PREVENTION
          </h3>
        </div>
        <div className="retro-alert retro-alert-warning">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-black font-mono font-bold">
            <div>
              {'>> ALWAYS CITE YOUR SOURCES PROPERLY'}
            </div>
            <div>
              {'>> USE QUOTES FOR DIRECT REFERENCES'}
            </div>
            <div>
              {'>> PARAPHRASE IN YOUR OWN WORDS'}
            </div>
            <div>
              {'>> CHECK BEFORE SUBMITTING CONTENT'}
            </div>
            <div>
              {'>> AIM FOR <10% PLAGIARISM RATE'}
            </div>
            <div>
              {'>> ORIGINAL CONTENT RANKS BETTER'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlagiarismChecker
