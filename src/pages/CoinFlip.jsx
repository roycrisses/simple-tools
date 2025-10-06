import React, { useState } from 'react'
import { Coins, RotateCcw, TrendingUp } from 'lucide-react'

const CoinFlip = () => {
  const [result, setResult] = useState(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [history, setHistory] = useState([])
  const [stats, setStats] = useState({ heads: 0, tails: 0 })

  const flipCoin = () => {
    setIsFlipping(true)
    
    setTimeout(() => {
      const newResult = Math.random() < 0.5 ? 'heads' : 'tails'
      setResult(newResult)
      
      setHistory(prev => [newResult, ...prev.slice(0, 9)])
      
      setStats(prev => ({
        ...prev,
        [newResult]: prev[newResult] + 1
      }))
      
      setIsFlipping(false)
    }, 1000)
  }

  const resetStats = () => {
    setResult(null)
    setHistory([])
    setStats({ heads: 0, tails: 0 })
  }

  const totalFlips = stats.heads + stats.tails
  const headsPercentage = totalFlips > 0 ? ((stats.heads / totalFlips) * 100).toFixed(1) : 0
  const tailsPercentage = totalFlips > 0 ? ((stats.tails / totalFlips) * 100).toFixed(1) : 0

  return (
    <div className="min-h-screen">
      {/* Minimal Header */}
      <div className="minimal-hero">
        <div className="minimal-container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <Coins className="h-6 w-6 text-white" />
              </div>
              <h1 className="minimal-h1 mb-0">
                Coin Flip
              </h1>
            </div>
            
            <p className="minimal-text text-lg">
              Flip a virtual coin to make random decisions. Fair and unbiased results every time.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="minimal-container">
          <div className="minimal-grid minimal-grid-2">
            {/* Coin Flip Section */}
            <div className="minimal-card text-center">
              <h2 className="minimal-h2 mb-8">
                Flip the Coin
              </h2>
              
              {/* Coin Display */}
              <div className="mb-8">
                <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-xl shadow-lg ${isFlipping ? 'animate-spin' : ''} transition-all duration-1000`}>
                  {result === 'heads' && !isFlipping && (
                    <div className="text-center">
                      <div className="text-2xl">👑</div>
                      <div className="text-sm">HEADS</div>
                    </div>
                  )}
                  {result === 'tails' && !isFlipping && (
                    <div className="text-center">
                      <div className="text-2xl">🦅</div>
                      <div className="text-sm">TAILS</div>
                    </div>
                  )}
                  {(!result || isFlipping) && (
                    <div className="text-center">
                      <Coins className="h-8 w-8 mb-1" />
                      <div className="text-sm">FLIP</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Result Display */}
              {result && !isFlipping && (
                <div className="mb-6">
                  <div className={`text-2xl font-bold mb-2 ${result === 'heads' ? 'text-blue-600' : 'text-green-600'}`}>
                    {result.toUpperCase()}!
                  </div>
                  <p className="minimal-text">
                    The coin landed on {result}
                  </p>
                </div>
              )}

              {isFlipping && (
                <div className="mb-6">
                  <div className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Flipping...
                  </div>
                  <p className="minimal-text">
                    The coin is spinning in the air
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={flipCoin}
                  disabled={isFlipping}
                  className="minimal-button minimal-button-primary disabled:opacity-50"
                >
                  <Coins className="h-4 w-4" />
                  {isFlipping ? 'Flipping...' : 'Flip Coin'}
                </button>
                
                <button
                  onClick={resetStats}
                  className="minimal-button minimal-button-secondary"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="space-y-6">
              {/* Stats Card */}
              <div className="minimal-card">
                <h2 className="minimal-h2 mb-6">
                  Statistics
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Flips:</span>
                    <span className="text-xl font-bold text-blue-600">{totalFlips}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center">
                        <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                        Heads:
                      </span>
                      <span className="font-semibold">{stats.heads} ({headsPercentage}%)</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="flex items-center">
                        <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                        Tails:
                      </span>
                      <span className="font-semibold">{stats.tails} ({tailsPercentage}%)</span>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  {totalFlips > 0 && (
                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${headsPercentage}%` }}
                        ></div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${tailsPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* History Card */}
              {history.length > 0 && (
                <div className="minimal-card">
                  <h2 className="minimal-h2 mb-6">
                    Recent Flips
                  </h2>
                  
                  <div className="flex flex-wrap gap-2">
                    {history.map((flip, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                          flip === 'heads' ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                      >
                        {flip === 'heads' ? 'H' : 'T'}
                      </div>
                    ))}
                  </div>
                  
                  <p className="minimal-text text-sm mt-3">
                    Last {history.length} flips (newest first)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinFlip
