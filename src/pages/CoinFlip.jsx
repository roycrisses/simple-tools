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
    <div className="max-w-6xl mx-auto p-4">
      {/* Modern Hero Section */}
      <div className="hero-modern mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="icon-container mx-auto mb-6">
            <Coins className="h-8 w-8" />
          </div>
          <h1 className="heading-1 text-white mb-4">
            Coin Flip
          </h1>
          <p className="text-xl text-white/90 mb-6">
            Flip a virtual coin to make random decisions with fair and unbiased results
          </p>
          <div className="glass-modern rounded-xl p-4 inline-block">
            <p className="text-white/80 text-sm">
              ✨ True randomness • Real-time statistics • Flip history • Perfect for decisions
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Coin Flip Section */}
        <div className="modern-card p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="icon-container w-12 h-12">
              <Coins className="h-6 w-6" />
            </div>
            <h2 className="heading-3 mb-0">
              Flip the Coin
            </h2>
          </div>
          
          {/* Coin Display */}
          <div className="mb-8">
            <div className="relative">
              <div className={`w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center text-white font-bold text-xl shadow-2xl border-4 border-yellow-300 ${isFlipping ? 'animate-spin' : ''} transition-all duration-1000`}>
                {result === 'heads' && !isFlipping && (
                  <div className="text-center animate-fade-in-up">
                    <div className="text-4xl mb-1">👑</div>
                    <div className="text-sm font-bold tracking-wider">HEADS</div>
                  </div>
                )}
                {result === 'tails' && !isFlipping && (
                  <div className="text-center animate-fade-in-up">
                    <div className="text-4xl mb-1">🦅</div>
                    <div className="text-sm font-bold tracking-wider">TAILS</div>
                  </div>
                )}
                {(!result || isFlipping) && (
                  <div className="text-center">
                    <Coins className="h-10 w-10 mb-2" />
                    <div className="text-sm font-bold tracking-wider">FLIP</div>
                  </div>
                )}
              </div>
              {/* Glow effect */}
              <div className={`absolute inset-0 w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-30 blur-xl ${isFlipping ? 'animate-pulse' : ''}`}></div>
            </div>
          </div>

          {/* Result Display */}
          {result && !isFlipping && (
            <div className="mb-8">
              <div className={`inline-block px-6 py-3 rounded-full text-white font-bold text-xl mb-3 ${result === 'heads' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-green-500 to-green-600'} shadow-lg`}>
                {result.toUpperCase()}!
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                The coin landed on <span className="font-semibold">{result}</span>
              </p>
            </div>
          )}

          {isFlipping && (
            <div className="mb-8">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                <div className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-2 flex items-center justify-center gap-2">
                  <div className="spinner-modern"></div>
                  Flipping...
                </div>
                <p className="text-purple-600 dark:text-purple-400 text-sm">
                  The coin is spinning in the air ✨
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={flipCoin}
              disabled={isFlipping}
              className="btn-modern btn-modern-primary disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3"
            >
              <Coins className="h-5 w-5" />
              <span>{isFlipping ? 'Flipping...' : 'Flip Coin'}</span>
            </button>
            
            <button
              onClick={resetStats}
              className="btn-modern btn-modern-secondary px-6 py-3"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="space-y-6">
          {/* Stats Card */}
          <div className="modern-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="icon-container w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h2 className="heading-3 mb-0">
                Statistics
              </h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalFlips}</div>
                  <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Flips</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="font-semibold text-blue-800 dark:text-blue-200">Heads</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.heads}</div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">({headsPercentage}%)</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl border border-green-200 dark:border-green-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="font-semibold text-green-800 dark:text-green-200">Tails</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.tails}</div>
                  <div className="text-sm text-green-600 dark:text-green-400">({tailsPercentage}%)</div>
                </div>
              </div>

              {/* Progress Bars */}
              {totalFlips > 0 && (
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Heads Distribution</span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{headsPercentage}%</span>
                    </div>
                    <div className="progress-modern">
                      <div 
                        className="progress-modern-fill bg-gradient-to-r from-blue-500 to-blue-600" 
                        style={{ width: `${headsPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tails Distribution</span>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">{tailsPercentage}%</span>
                    </div>
                    <div className="progress-modern">
                      <div 
                        className="progress-modern-fill bg-gradient-to-r from-green-500 to-green-600" 
                        style={{ width: `${tailsPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* History Card */}
          {history.length > 0 && (
            <div className="modern-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="icon-container w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500">
                  <span className="text-xl">📋</span>
                </div>
                <h2 className="heading-3 mb-0">
                  Recent Flips
                </h2>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                <div className="flex flex-wrap gap-3 mb-4">
                  {history.map((flip, index) => (
                    <div
                      key={index}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg transform hover:scale-110 transition-all ${
                        flip === 'heads' 
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                          : 'bg-gradient-to-br from-green-500 to-green-600'
                      }`}
                    >
                      {flip === 'heads' ? '👑' : '🦅'}
                    </div>
                  ))}
                </div>
                
                <p className="text-sm text-purple-700 dark:text-purple-300 text-center">
                  Last {history.length} flips (newest first) • 
                  {history.filter(f => f === 'heads').length}H / {history.filter(f => f === 'tails').length}T
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CoinFlip
