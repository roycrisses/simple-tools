import React, { useState } from 'react'
import { Coins, RotateCcw, TrendingUp } from 'lucide-react'

const CoinFlip = () => {
  const [result, setResult] = useState(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [history, setHistory] = useState([])
  const [stats, setStats] = useState({ heads: 0, tails: 0 })

  const flipCoin = () => {
    setIsFlipping(true)
    
    // Add animation delay
    setTimeout(() => {
      // Generate random result client-side
      const newResult = Math.random() < 0.5 ? 'heads' : 'tails'
      setResult(newResult)
      
      // Update history (keep last 10 flips)
      setHistory(prev => [newResult, ...prev.slice(0, 9)])
      
      // Update stats
      setStats(prev => ({
        ...prev,
        [newResult]: prev[newResult] + 1
      }))
      
      setIsFlipping(false)
    }, 2000) // 2 second animation
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
    <div className="max-w-4xl mx-auto p-4">
      {/* Retro Window Header */}
      <div className="retro-window mb-8">
        <div className="retro-window-header">
          <div className="flex items-center space-x-3">
            <Coins className="h-6 w-6" />
            <span className="text-lg font-bold">COIN FLIP SIMULATOR v1.0</span>
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
              {'>> MAKE QUICK DECISIONS WITH A VIRTUAL COIN FLIP <<'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Coin Flip Section */}
        <div className="lg:col-span-2">
          <div className="card p-8 text-center">
            <div className="bg-blue-500 text-white font-bold py-2 px-4 mb-6 border-b-4 border-black">
              <h2 className="text-xl font-mono">
                [FLIP] COIN SIMULATOR
              </h2>
            </div>
            <div className="mb-8">
              {/* Retro Coin Animation */}
              <div className="relative mx-auto w-48 h-48 mb-8">
                <div
                  className={`absolute inset-0 border-8 border-black flex items-center justify-center text-6xl font-bold font-mono transition-all duration-500 ${
                    isFlipping
                      ? 'animate-bounce'
                      : 'transform rotate-0'
                  } ${
                    result === 'heads'
                      ? 'bg-yellow-400 text-black'
                      : result === 'tails'
                      ? 'bg-gray-400 text-black'
                      : 'bg-blue-300 text-black'
                  }`}
                  style={{
                    boxShadow: '8px 8px 0px #000, 16px 16px 0px rgba(0,0,0,0.3)',
                    transform: isFlipping ? 'rotateY(1800deg)' : 'rotateY(0deg)',
                    transition: 'transform 2s ease-in-out, background-color 0.3s'
                  }}
                >
                  {isFlipping ? (
                    <div className="animate-pulse text-black font-mono">?</div>
                  ) : result ? (
                    <div className="font-mono text-black">
                      {result === 'heads' ? 'H' : 'T'}
                    </div>
                  ) : (
                    <div className="font-mono text-black">?</div>
                  )}
                </div>
              </div>

              {/* Result Display */}
              <div className="mb-6">
                {result && !isFlipping && (
                  <div className="retro-alert retro-alert-success">
                    <h2 className="text-4xl font-bold text-black font-mono capitalize">
                      {result.toUpperCase()}!
                    </h2>
                    <p className="text-lg text-black font-mono font-bold">
                      {result === 'heads' ? 'YOU GOT HEADS!' : 'YOU GOT TAILS!'}
                    </p>
                  </div>
                )}
                
                {isFlipping && (
                  <div className="retro-alert retro-alert-warning">
                    <h2 className="text-4xl font-bold text-black font-mono">
                      FLIPPING...
                    </h2>
                    <p className="text-lg text-black font-mono font-bold">
                      THE COIN IS IN THE AIR!
                    </p>
                  </div>
                )}
                
                {!result && !isFlipping && (
                  <div className="bg-gray-200 dark:bg-gray-600 p-4 border-4 border-black">
                    <h2 className="text-4xl font-bold text-black dark:text-white font-mono">
                      READY TO FLIP?
                    </h2>
                    <p className="text-lg text-black dark:text-white font-mono font-bold">
                      CLICK THE BUTTON BELOW TO FLIP THE COIN
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={flipCoin}
                  disabled={isFlipping}
                  className="btn-primary px-8 py-4 text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                >
                  {isFlipping ? (
                    <>
                      <div className="retro-spinner"></div>
                      <span>FLIPPING...</span>
                    </>
                  ) : (
                    <>
                      <Coins className="h-5 w-5" />
                      <span>FLIP COIN</span>
                    </>
                  )}
                </button>

                {totalFlips > 0 && (
                  <button
                    onClick={resetStats}
                    disabled={isFlipping}
                    className="btn-secondary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed font-mono px-6 py-4"
                  >
                    <RotateCcw className="h-5 w-5" />
                    <span>RESET</span>
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
              <div className="bg-green-500 text-black font-bold py-2 px-4 mb-4 border-b-4 border-black">
                <h3 className="text-lg font-mono flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>[STATS] STATISTICS</span>
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="text-center bg-blue-300 p-3 border-4 border-black">
                  <div className="text-2xl font-bold text-black font-mono">
                    {totalFlips}
                  </div>
                  <div className="text-sm text-black font-mono font-bold">
                    TOTAL FLIPS
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Heads */}
                  <div className="bg-yellow-200 p-3 border-2 border-black">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-bold text-black font-mono">
                        [H] HEADS
                      </span>
                      <span className="text-sm text-black font-mono font-bold">
                        {stats.heads} ({headsPercentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-600 border-2 border-black h-4">
                      <div
                        className="bg-yellow-500 h-full border-r-2 border-black transition-all duration-300"
                        style={{ width: `${headsPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Tails */}
                  <div className="bg-gray-200 p-3 border-2 border-black">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-bold text-black font-mono">
                        [T] TAILS
                      </span>
                      <span className="text-sm text-black font-mono font-bold">
                        {stats.tails} ({tailsPercentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-600 border-2 border-black h-4">
                      <div
                        className="bg-gray-400 h-full border-r-2 border-black transition-all duration-300"
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
              <div className="bg-purple-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
                <h3 className="text-lg font-mono">
                  [HISTORY] RECENT FLIPS
                </h3>
              </div>
              
              <div className="space-y-2 bg-gray-50 dark:bg-gray-800 p-2 border-4 border-black max-h-48 overflow-y-auto">
                {history.map((flip, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 border-2 border-black ${
                      index === 0 && result
                        ? 'bg-green-300'
                        : flip === 'heads' ? 'bg-yellow-200' : 'bg-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-mono font-bold text-black">
                        {flip === 'heads' ? '[H]' : '[T]'}
                      </span>
                      <span className="font-bold text-black font-mono capitalize">
                        {flip.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-black font-mono font-bold">
                      #{history.length - index}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="card p-6">
            <div className="bg-red-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
              <h3 className="text-lg font-mono">
                [INFO] DID YOU KNOW?
              </h3>
            </div>
            <div className="retro-alert retro-alert-warning">
              <div className="text-sm text-black font-mono font-bold space-y-2">
                <p>
                  {'>> A FAIR COIN HAS 50% CHANCE FOR EACH SIDE'}
                </p>
                <p>
                  {'>> COIN FLIPS DETERMINE WHO GOES FIRST IN SPORTS'}
                </p>
                <p>
                  {'>> PROBABILITY DOESN\'T CHANGE FROM PREVIOUS RESULTS'}
                </p>
                <p>
                  {'>> PERFECT FOR MAKING UNBIASED DECISIONS!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinFlip
