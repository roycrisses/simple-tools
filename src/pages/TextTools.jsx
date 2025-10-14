import React, { useState } from 'react'
import { Type, Copy, RotateCcw, FileText } from 'lucide-react'

const TextTools = () => {
  const [inputText, setInputText] = useState('')
  const [activeTab, setActiveTab] = useState('case')
  const [copyMessage, setCopyMessage] = useState('')

  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyMessage(`${label} copied!`)
      setTimeout(() => setCopyMessage(''), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const clearText = () => {
    setInputText('')
  }

  // Text transformation functions
  const transformations = {
    case: {
      name: 'Case Converter',
      operations: [
        { name: 'UPPERCASE', func: (text) => text.toUpperCase() },
        { name: 'lowercase', func: (text) => text.toLowerCase() },
        { name: 'Title Case', func: (text) => text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()) },
        { name: 'Sentence case', func: (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() },
        { name: 'aLtErNaTiNg CaSe', func: (text) => text.split('').map((char, i) => i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()).join('') },
        { name: 'iNVERSE cASE', func: (text) => text.split('').map(char => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()).join('') }
      ]
    },
    format: {
      name: 'Text Formatter',
      operations: [
        { name: 'Remove Extra Spaces', func: (text) => text.replace(/\s+/g, ' ').trim() },
        { name: 'Remove Line Breaks', func: (text) => text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim() },
        { name: 'Add Line Numbers', func: (text) => text.split('\n').map((line, i) => `${i + 1}. ${line}`).join('\n') },
        { name: 'Reverse Text', func: (text) => text.split('').reverse().join('') },
        { name: 'Reverse Words', func: (text) => text.split(' ').reverse().join(' ') },
        { name: 'Sort Lines A-Z', func: (text) => text.split('\n').sort().join('\n') }
      ]
    },
    encode: {
      name: 'Encoder/Decoder',
      operations: [
        { name: 'URL Encode', func: (text) => encodeURIComponent(text) },
        { name: 'URL Decode', func: (text) => { try { return decodeURIComponent(text) } catch { return 'Invalid URL encoding' } } },
        { name: 'Base64 Encode', func: (text) => btoa(unescape(encodeURIComponent(text))) },
        { name: 'Base64 Decode', func: (text) => { try { return decodeURIComponent(escape(atob(text))) } catch { return 'Invalid Base64' } } },
        { name: 'HTML Encode', func: (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;') },
        { name: 'HTML Decode', func: (text) => text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'") }
      ]
    }
  }

  // Text statistics
  const getTextStats = (text) => {
    const words = text.trim() ? text.trim().split(/\s+/) : []
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0) : []
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim().length > 0) : []
    
    return {
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, '').length,
      words: words.length,
      sentences: sentences.length,
      paragraphs: paragraphs.length,
      lines: text.split('\n').length
    }
  }

  const stats = getTextStats(inputText)

  return (
    <div className="min-h-screen">
      {/* Minimal Header */}
      <div className="minimal-hero">
        <div className="minimal-container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <Type className="h-6 w-6 text-white" />
              </div>
              <h1 className="minimal-h1 mb-0">
                Text Tools
              </h1>
            </div>
            
            <p className="minimal-text text-lg">
              Transform, format, and analyze your text with powerful text manipulation tools.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="minimal-container">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Input Section */}
            <div className="minimal-card">
              <h2 className="minimal-h2 mb-6">
                Enter Your Text
              </h2>
              
              <div className="space-y-4">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter your text here to transform, format, or analyze..."
                  className="minimal-input h-40 resize-none"
                  rows={8}
                />
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 text-sm minimal-text">
                    <span>Characters: {stats.characters}</span>
                    <span>Words: {stats.words}</span>
                    <span>Lines: {stats.lines}</span>
                  </div>
                  
                  <button
                    onClick={clearText}
                    className="minimal-button minimal-button-secondary"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Selection */}
            <div className="minimal-card">
              <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                {Object.entries(transformations).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                      activeTab === key
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                    activeTab === 'stats'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Statistics
                </button>
              </div>

              {/* Transformations */}
              {activeTab !== 'stats' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{transformations[activeTab].name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {transformations[activeTab].operations.map((operation, index) => {
                      const result = inputText ? operation.func(inputText) : ''
                      return (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-sm">{operation.name}</h4>
                            <button
                              onClick={() => copyToClipboard(result, operation.name)}
                              className="p-1 hover:bg-gray-100 rounded"
                              disabled={!result}
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="bg-gray-50 rounded p-2 text-sm min-h-[3rem] overflow-auto">
                            {result || <span className="minimal-text">Result will appear here</span>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Statistics Tab */}
              {activeTab === 'stats' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Text Statistics</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{stats.characters}</div>
                      <div className="text-sm minimal-text">Characters</div>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{stats.charactersNoSpaces}</div>
                      <div className="text-sm minimal-text">No Spaces</div>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{stats.words}</div>
                      <div className="text-sm minimal-text">Words</div>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{stats.sentences}</div>
                      <div className="text-sm minimal-text">Sentences</div>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{stats.paragraphs}</div>
                      <div className="text-sm minimal-text">Paragraphs</div>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-cyan-600">{stats.lines}</div>
                      <div className="text-sm minimal-text">Lines</div>
                    </div>
                  </div>

                  {inputText && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Reading Time Estimate</h4>
                      <p className="minimal-text">
                        Average reading time: {Math.ceil(stats.words / 200)} minute(s) 
                        <span className="text-xs ml-2">(based on 200 words per minute)</span>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Copy Message */}
              {copyMessage && (
                <div className="text-center mt-4">
                  <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
                    {copyMessage}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextTools
