import React, { useState } from 'react'
import { Type, Hash, ArrowUpDown, RotateCcw } from 'lucide-react'

const TextTools = () => {
  const [text, setText] = useState('')
  const [activeTab, setActiveTab] = useState('count') // 'count', 'case', 'format'
  const [result, setResult] = useState(null)

  const analyzeText = () => {
    if (!text.trim()) {
      return
    }

    const words = text.trim().split(/\s+/).filter(word => word.length > 0)
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, '').length
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length
    const lines = text.split('\n').length
    
    // Fun calculations!
    const typingTime = Math.ceil(words.length / 40) // 40 WPM average typing speed
    const tweetCount = Math.ceil(characters / 280) // Twitter character limit
    const coffeeBreaks = Math.ceil(words.length / 500) // Coffee break every 500 words
    const pizzaSlices = Math.ceil(characters / 100) // 1 pizza slice per 100 characters of energy

    setResult({
      words: words.length,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      lines,
      averageWordsPerSentence: sentences > 0 ? Math.round(words.length / sentences * 10) / 10 : 0,
      readingTime: Math.ceil(words.length / 200), // Assuming 200 words per minute
      typingTime,
      tweetCount,
      coffeeBreaks,
      pizzaSlices
    })
  }

  const convertCase = (type) => {
    if (!text.trim()) return

    let converted = ''
    switch (type) {
      case 'upper':
        converted = text.toUpperCase()
        break
      case 'lower':
        converted = text.toLowerCase()
        break
      case 'title':
        converted = text.replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        )
        break
      case 'sentence':
        converted = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
        break
      case 'camel':
        converted = text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index === 0 ? word.toLowerCase() : word.toUpperCase()
        }).replace(/\s+/g, '')
        break
      case 'snake':
        converted = text.toLowerCase().replace(/\s+/g, '_')
        break
      default:
        converted = text
    }
    setText(converted)
  }

  const formatText = (type) => {
    if (!text.trim()) return

    let formatted = ''
    switch (type) {
      case 'removeSpaces':
        formatted = text.replace(/\s+/g, '')
        break
      case 'removeLineBreaks':
        formatted = text.replace(/\n/g, ' ').replace(/\s+/g, ' ')
        break
      case 'addLineBreaks':
        formatted = text.replace(/\. /g, '.\n')
        break
      case 'reverse':
        formatted = text.split('').reverse().join('')
        break
      case 'sort':
        formatted = text.split('\n').sort().join('\n')
        break
      case 'removeDuplicates':
        const lines = text.split('\n')
        formatted = [...new Set(lines)].join('\n')
        break
      default:
        formatted = text
    }
    setText(formatted)
  }

  const clearAll = () => {
    setText('')
    setResult(null)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Retro Window Header */}
      <div className="retro-window mb-8">
        <div className="retro-window-header">
          <div className="flex items-center space-x-3">
            <Type className="h-6 w-6" />
            <span className="text-lg font-bold">TEXT TOOLS v1.0</span>
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
              {'>> WORD COUNT, CASE CONVERTER, AND MORE TEXT UTILITIES <<'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="card p-6">
          <div className="bg-blue-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
            <h2 className="text-xl font-mono">
              [INPUT] TEXT OPERATIONS
            </h2>
          </div>
          
          {/* Tab Selection */}
          <div className="grid grid-cols-3 mb-4 border-4 border-black">
            <button
              onClick={() => setActiveTab('count')}
              className={`py-2 px-4 font-mono font-bold transition-colors ${
                activeTab === 'count'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              COUNT
            </button>
            <button
              onClick={() => setActiveTab('case')}
              className={`py-2 px-4 font-mono font-bold transition-colors border-l-4 border-r-4 border-black ${
                activeTab === 'case'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              CASE
            </button>
            <button
              onClick={() => setActiveTab('format')}
              className={`py-2 px-4 font-mono font-bold transition-colors ${
                activeTab === 'format'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              FORMAT
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-black dark:text-white mb-2 font-mono">
                ENTER YOUR TEXT:
              </label>
              <textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value)
                  if (activeTab === 'count') {
                    analyzeText()
                  }
                }}
                placeholder="PASTE OR TYPE YOUR TEXT HERE..."
                className="input-field h-48 resize-none font-mono"
              />
              <div className="text-sm text-black dark:text-white mt-1 font-mono font-bold">
                {text.length} CHARACTERS
              </div>
            </div>

            {activeTab === 'case' && (
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => convertCase('upper')} className="btn-secondary font-mono text-xs py-2">
                  UPPERCASE
                </button>
                <button onClick={() => convertCase('lower')} className="btn-secondary font-mono text-xs py-2">
                  lowercase
                </button>
                <button onClick={() => convertCase('title')} className="btn-secondary font-mono text-xs py-2">
                  Title Case
                </button>
                <button onClick={() => convertCase('sentence')} className="btn-secondary font-mono text-xs py-2">
                  Sentence case
                </button>
                <button onClick={() => convertCase('camel')} className="btn-secondary font-mono text-xs py-2">
                  camelCase
                </button>
                <button onClick={() => convertCase('snake')} className="btn-secondary font-mono text-xs py-2">
                  snake_case
                </button>
              </div>
            )}

            {activeTab === 'format' && (
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => formatText('removeSpaces')} className="btn-secondary font-mono text-xs py-2">
                  REMOVE SPACES
                </button>
                <button onClick={() => formatText('removeLineBreaks')} className="btn-secondary font-mono text-xs py-2">
                  REMOVE BREAKS
                </button>
                <button onClick={() => formatText('addLineBreaks')} className="btn-secondary font-mono text-xs py-2">
                  ADD BREAKS
                </button>
                <button onClick={() => formatText('reverse')} className="btn-secondary font-mono text-xs py-2">
                  REVERSE
                </button>
                <button onClick={() => formatText('sort')} className="btn-secondary font-mono text-xs py-2">
                  SORT LINES
                </button>
                <button onClick={() => formatText('removeDuplicates')} className="btn-secondary font-mono text-xs py-2">
                  REMOVE DUPES
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={copyToClipboard}
                disabled={!text.trim()}
                className="btn-primary flex-1 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
              >
                <Type className="h-4 w-4" />
                <span>COPY TEXT</span>
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

        {/* Results Section */}
        <div className="card p-6">
          <div className="bg-green-500 text-black font-bold py-2 px-4 mb-4 border-b-4 border-black">
            <h2 className="text-xl font-mono">
              [RESULTS] TEXT ANALYSIS
            </h2>
          </div>
          
          {result ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-200 p-3 border-4 border-black text-center">
                  <div className="text-2xl font-bold font-mono text-black">{result.words}</div>
                  <div className="text-sm font-mono font-bold text-black">WORDS</div>
                </div>
                <div className="bg-yellow-200 p-3 border-4 border-black text-center">
                  <div className="text-2xl font-bold font-mono text-black">{result.characters}</div>
                  <div className="text-sm font-mono font-bold text-black">CHARACTERS</div>
                </div>
                <div className="bg-green-200 p-3 border-4 border-black text-center">
                  <div className="text-2xl font-bold font-mono text-black">{result.sentences}</div>
                  <div className="text-sm font-mono font-bold text-black">SENTENCES</div>
                </div>
                <div className="bg-purple-200 p-3 border-4 border-black text-center">
                  <div className="text-2xl font-bold font-mono text-black">{result.paragraphs}</div>
                  <div className="text-sm font-mono font-bold text-black">PARAGRAPHS</div>
                </div>
              </div>
              
              <div className="bg-gray-200 p-4 border-4 border-black">
                <h3 className="font-bold font-mono text-black mb-2">DETAILED STATS:</h3>
                <div className="text-sm font-mono text-black space-y-1">
                  <div>• CHARACTERS (NO SPACES): {result.charactersNoSpaces}</div>
                  <div>• LINES: {result.lines}</div>
                  <div>• AVG WORDS/SENTENCE: {result.averageWordsPerSentence}</div>
                  <div>• READING TIME: ~{result.readingTime} MIN 📖</div>
                </div>
              </div>
              
              <div className="bg-yellow-200 p-4 border-4 border-black">
                <h3 className="font-bold font-mono text-black mb-2">🎉 FUN FACTS:</h3>
                <div className="text-sm font-mono text-black space-y-1">
                  <div>⌨️ TYPING TIME: ~{result.typingTime} MIN</div>
                  <div>🐦 TWITTER POSTS: {result.tweetCount} TWEETS</div>
                  <div>☕ COFFEE BREAKS NEEDED: {result.coffeeBreaks}</div>
                  <div>🍕 PIZZA ENERGY: {result.pizzaSlices} SLICES</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-200 dark:bg-gray-600 border-4 border-black">
              <Hash className="h-16 w-16 mb-4 text-black dark:text-white" />
              <p className="text-center font-mono font-bold text-black dark:text-white">
                ENTER TEXT TO SEE ANALYSIS
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 card p-6">
        <div className="bg-purple-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
          <h3 className="text-lg font-mono">
            [TIPS] TEXT PROCESSING
          </h3>
        </div>
        <div className="retro-alert retro-alert-warning">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-black font-mono font-bold">
            <div>
              {'>> USE FOR CONTENT ANALYSIS'}
            </div>
            <div>
              {'>> PERFECT FOR WRITERS & EDITORS'}
            </div>
            <div>
              {'>> BATCH PROCESS MULTIPLE TEXTS'}
            </div>
            <div>
              {'>> GREAT FOR SEO OPTIMIZATION'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextTools
