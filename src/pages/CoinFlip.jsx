import React, { useState } from 'react'
import { Coins, RotateCcw, TrendingUp } from 'lucide-react'
import axios from 'axios'

const CoinFlip = () => {
  const [result, setResult] = useState(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [history, setHistory] = useState([])
  const [stats, setStats] = useState({ heads: 0, tails: 0 })

  const flipCoin = async () => {
    setIsFlipping(true)
    
    // Add animation delay
    setTimeout(async () => {
      try {
        const response = await axios.post('/api/coin-flip')
        
        if (response.data.success) {
          const newResult = response.data.result
          setResult(newResult)
          
          // Update history (keep last 10 flips)
          setHistory(prev => [newResult, ...prev.slice(0, 9)])
          
          // Update stats
          setStats(prev => ({
            ...prev,
            [newResult]: prev[newResult] + 1
          }))
        }
      } catch (err) {
        console.error('Error flipping coin:', err)
      } finally {
        setIsFlipping(false)
      }
    }, 1500) // 1.5 second animation
  }

  const resetStats = () => {
    setHistory([])
    setStats({ heads: 0, tails: 0 })
    setResult(null)
  }

  const totalFlips = stats.heads + stats.tails
  const headsPercentage = totalFlips > 0 ? ((stats.heads / totalFlips) * 100).toFixed(1) : 0
  const tailsPercentage = totalFlips > 0 ? ((stats.tails / totalFlips) * 100).toFixed(1) : 0

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Coins className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Coin Flip
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Make quick decisions with a virtual coin flip
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Coin Flip Section */}
        <div className="lg:col-span-2">
          <div className="card p-8 text-center">
            <div className="mb-8">
              {/* Coin Animation */}
              <div className="relative mx-auto w-48 h-48 mb-8">
                <div
                  className={`absolute inset-0 rounded-full border-8 border-primary-500 flex items-center justify-center text-6xl font-bold transition-all duration-1500 ${
                    isFlipping
                      ? 'animate-spin transform rotate-[1800deg]'
                      : result
                      ? 'transform rotate-0'
                      : 'transform rotate-0'
                  } ${
                    result === 'heads'
                      ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900'
                      : result === 'tails'
                      ? 'bg-gradient-to-br from-gray-400 to-gray-600 text-gray-900'
                      : 'bg-gradient-to-br from-beige-200 to-beige-400 text-beige-800'
                  }`}
                >
                  {isFlipping ? (
                    <div className="animate-pulse">?</div>
                  ) : result ? (
                    result === 'heads' ? '👑' : '🪙'
                  ) : (
                    '🪙'
                  )}
                </div>
              </div>

              {/* Result Display */}
              <div className="mb-6">
                {result && !isFlipping && (
                  <div className="space-y-2">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white capitalize">
                      {result}!
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      {result === 'heads' ? 'You got heads!' : 'You got tails!'}
                    </p>
                  </div>
                )}
                
                {isFlipping && (
                  <div className="space-y-2">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                      Flipping...
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      The coin is in the air!
                    </p>
                  </div>
                )}
                
                {!result && !isFlipping && (
                  <div className="space-y-2">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                      Ready to Flip?
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Click the button below to flip the coin
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={flipCoin}
                  disabled={isFlipping}
                  className="btn-primary px-8 py-4 text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isFlipping ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Flipping...</span>
                    </>
                  ) : (
                    <>
                      <Coins className="h-5 w-5" />
                      <span>Flip Coin</span>
                    </>
                  )}
                </button>

                {totalFlips > 0 && (
                  <button
                    onClick={resetStats}
                    disabled={isFlipping}
                    className="px-6 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RotateCcw className="h-5 w-5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Statistics and History */}
        <div className="space-y-6">
          {/* Statistics */}
          {totalFlips > 0 && (
            <div className="card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Statistics
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {totalFlips}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Total Flips
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Heads */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        👑 Heads
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {stats.heads} ({headsPercentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${headsPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Tails */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        🪙 Tails
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {stats.tails} ({tailsPercentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gray-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${tailsPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent History */}
          {history.length > 0 && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Flips
              </h3>
              
              <div className="space-y-2">
                {history.map((flip, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      index === 0 && result
                        ? 'bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-700'
                        : 'bg-gray-50 dark:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">
                        {flip === 'heads' ? '👑' : '🪙'}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white capitalize">
                        {flip}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      #{history.length - index}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="card p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
              💡 Did You Know?
            </h3>
            <div className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
              <p>
                • A fair coin has a 50% chance of landing on either side
              </p>
              <p>
                • Coin flips are used in sports to determine who goes first
              </p>
              <p>
                • The probability doesn't change based on previous results
              </p>
              <p>
                • Perfect for making unbiased decisions!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinFlip
