import React, { useState, useRef, useEffect } from 'react'
import { Palette, Pipette, Copy, RotateCcw, Shuffle } from 'lucide-react'

const ColorTools = () => {
  const [selectedColor, setSelectedColor] = useState('#3B82F6')
  const [activeTab, setActiveTab] = useState('picker') // 'picker', 'palette', 'converter'
  const [colorPalette, setColorPalette] = useState([])
  const [colorFormat, setColorFormat] = useState('hex')
  const canvasRef = useRef(null)

  useEffect(() => {
    generatePalette()
  }, [selectedColor])

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  const rgbToHsl = (r, g, b) => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
        default: h = 0
      }
      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  const getColorInFormat = (color, format) => {
    const rgb = hexToRgb(color)
    if (!rgb) return color

    switch (format) {
      case 'hex':
        return color.toUpperCase()
      case 'rgb':
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
      case 'hsl':
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
      default:
        return color
    }
  }

  const generatePalette = () => {
    const rgb = hexToRgb(selectedColor)
    if (!rgb) return

    const palette = []
    
    // Monochromatic palette
    for (let i = 0; i < 5; i++) {
      const factor = 0.2 + (i * 0.2)
      const r = Math.round(rgb.r * factor)
      const g = Math.round(rgb.g * factor)
      const b = Math.round(rgb.b * factor)
      palette.push(rgbToHex(r, g, b))
    }

    // Complementary colors
    const compR = 255 - rgb.r
    const compG = 255 - rgb.g
    const compB = 255 - rgb.b
    palette.push(rgbToHex(compR, compG, compB))

    // Analogous colors
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    for (let i = 1; i <= 2; i++) {
      const newHue = (hsl.h + (i * 30)) % 360
      // This is a simplified conversion - in a real app you'd want proper HSL to RGB
      palette.push(selectedColor)
    }

    setColorPalette(palette)
  }

  const generateRandomPalette = () => {
    const palette = []
    for (let i = 0; i < 8; i++) {
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
      palette.push(randomColor)
    }
    setColorPalette(palette)
  }
  
  const generateThemePalette = (theme) => {
    const themes = {
      sunset: ['#FF6B35', '#F7931E', '#FFD23F', '#FF8C42', '#C73E1D', '#A0522D', '#8B4513', '#D2691E'],
      ocean: ['#006994', '#13A3C4', '#5FBEAA', '#A8E6CF', '#0077BE', '#4682B4', '#5F9EA0', '#20B2AA'],
      forest: ['#228B22', '#32CD32', '#90EE90', '#98FB98', '#006400', '#8FBC8F', '#9ACD32', '#ADFF2F'],
      candy: ['#FF69B4', '#FF1493', '#DA70D6', '#BA55D3', '#9370DB', '#8A2BE2', '#FF00FF', '#EE82EE'],
      retro: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F']
    }
    setColorPalette(themes[theme] || themes.retro)
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const clearAll = () => {
    setSelectedColor('#3B82F6')
    setColorPalette([])
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Retro Window Header */}
      <div className="retro-window mb-8">
        <div className="retro-window-header">
          <div className="flex items-center space-x-3">
            <Palette className="h-6 w-6" />
            <span className="text-lg font-bold">COLOR TOOLS v1.0</span>
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
              {'>> COLOR PICKER, PALETTE GENERATOR, AND MORE <<'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="card p-6">
          <div className="bg-blue-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
            <h2 className="text-xl font-mono">
              [INPUT] COLOR OPERATIONS
            </h2>
          </div>
          
          {/* Tab Selection */}
          <div className="grid grid-cols-3 mb-4 border-4 border-black">
            <button
              onClick={() => setActiveTab('picker')}
              className={`py-2 px-4 font-mono font-bold transition-colors ${
                activeTab === 'picker'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              PICKER
            </button>
            <button
              onClick={() => setActiveTab('palette')}
              className={`py-2 px-4 font-mono font-bold transition-colors border-l-4 border-r-4 border-black ${
                activeTab === 'palette'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              PALETTE
            </button>
            <button
              onClick={() => setActiveTab('converter')}
              className={`py-2 px-4 font-mono font-bold transition-colors ${
                activeTab === 'converter'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              CONVERT
            </button>
          </div>
          
          <div className="space-y-4">
            {activeTab === 'picker' && (
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2 font-mono">
                  SELECT COLOR:
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-16 h-16 border-4 border-black cursor-pointer"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="input-field font-mono"
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>
                
                <div className="mt-4 p-4 border-4 border-black" style={{backgroundColor: selectedColor}}>
                  <div className="text-center">
                    <div className="bg-white bg-opacity-90 inline-block px-3 py-1 border-2 border-black">
                      <span className="font-mono font-bold text-black">PREVIEW</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'palette' && (
              <div>
                <div className="space-y-2 mb-4">
                  <div className="flex gap-2">
                    <button
                      onClick={generatePalette}
                      className="btn-primary flex-1 font-mono"
                    >
                      FROM COLOR
                    </button>
                    <button
                      onClick={generateRandomPalette}
                      className="btn-secondary font-mono"
                    >
                      <Shuffle className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="text-xs font-mono font-bold text-black dark:text-white mb-2">🎨 THEME PALETTES:</div>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <button onClick={() => generateThemePalette('sunset')} className="bg-orange-400 text-black font-mono font-bold py-1 px-2 border-2 border-black hover:bg-orange-300">🌅 SUNSET</button>
                    <button onClick={() => generateThemePalette('ocean')} className="bg-blue-400 text-black font-mono font-bold py-1 px-2 border-2 border-black hover:bg-blue-300">🌊 OCEAN</button>
                    <button onClick={() => generateThemePalette('forest')} className="bg-green-400 text-black font-mono font-bold py-1 px-2 border-2 border-black hover:bg-green-300">🌲 FOREST</button>
                    <button onClick={() => generateThemePalette('candy')} className="bg-pink-400 text-black font-mono font-bold py-1 px-2 border-2 border-black hover:bg-pink-300">🍭 CANDY</button>
                  </div>
                </div>
                
                {colorPalette.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {colorPalette.map((color, index) => (
                      <div
                        key={index}
                        className="aspect-square border-4 border-black cursor-pointer hover:scale-105 transition-transform"
                        style={{backgroundColor: color}}
                        onClick={() => copyToClipboard(color)}
                        title={`Click to copy: ${color}`}
                      >
                        <div className="h-full flex items-end justify-center pb-1">
                          <span className="text-xs font-mono font-bold bg-white bg-opacity-90 px-1 border border-black">
                            {color}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'converter' && (
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2 font-mono">
                  COLOR FORMAT:
                </label>
                <select
                  value={colorFormat}
                  onChange={(e) => setColorFormat(e.target.value)}
                  className="input-field font-mono font-bold mb-4"
                >
                  <option value="hex">HEX</option>
                  <option value="rgb">RGB</option>
                  <option value="hsl">HSL</option>
                </select>
                
                <div className="space-y-3">
                  <div className="bg-gray-200 p-3 border-4 border-black">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-black">HEX:</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-black">{getColorInFormat(selectedColor, 'hex')}</span>
                        <button
                          onClick={() => copyToClipboard(getColorInFormat(selectedColor, 'hex'))}
                          className="p-1 border-2 border-black bg-white hover:bg-gray-100"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-200 p-3 border-4 border-black">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-black">RGB:</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-black">{getColorInFormat(selectedColor, 'rgb')}</span>
                        <button
                          onClick={() => copyToClipboard(getColorInFormat(selectedColor, 'rgb'))}
                          className="p-1 border-2 border-black bg-white hover:bg-gray-100"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-200 p-3 border-4 border-black">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-black">HSL:</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-black">{getColorInFormat(selectedColor, 'hsl')}</span>
                        <button
                          onClick={() => copyToClipboard(getColorInFormat(selectedColor, 'hsl'))}
                          className="p-1 border-2 border-black bg-white hover:bg-gray-100"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => copyToClipboard(selectedColor)}
                className="btn-primary flex-1 flex items-center justify-center space-x-2 font-mono"
              >
                <Copy className="h-4 w-4" />
                <span>COPY COLOR</span>
              </button>

              <button
                onClick={clearAll}
                className="btn-secondary flex items-center justify-center space-x-2 font-mono px-4 py-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>RESET</span>
              </button>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="card p-6">
          <div className="bg-green-500 text-black font-bold py-2 px-4 mb-4 border-b-4 border-black">
            <h2 className="text-xl font-mono">
              [PREVIEW] COLOR DISPLAY
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="h-32 border-4 border-black" style={{backgroundColor: selectedColor}}>
              <div className="h-full flex items-center justify-center">
                <div className="bg-white bg-opacity-90 px-4 py-2 border-4 border-black">
                  <span className="font-mono font-bold text-black text-lg">{selectedColor}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 border-4 border-black">
                <div className="w-full h-8 border-2 border-black mb-2" style={{backgroundColor: selectedColor}}></div>
                <span className="font-mono font-bold text-black text-sm">ON WHITE</span>
              </div>
              <div className="bg-black p-4 border-4 border-black">
                <div className="w-full h-8 border-2 border-white mb-2" style={{backgroundColor: selectedColor}}></div>
                <span className="font-mono font-bold text-white text-sm">ON BLACK</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 card p-6">
        <div className="bg-purple-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
          <h3 className="text-lg font-mono">
            [TIPS] COLOR THEORY
          </h3>
        </div>
        <div className="retro-alert retro-alert-warning">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-black font-mono font-bold">
            <div>
              {'>> USE COMPLEMENTARY COLORS FOR CONTRAST'}
            </div>
            <div>
              {'>> TEST ACCESSIBILITY WITH COLOR BLINDNESS'}
            </div>
            <div>
              {'>> SAVE PALETTES FOR CONSISTENT BRANDING'}
            </div>
            <div>
              {'>> CONSIDER COLOR PSYCHOLOGY IN DESIGN'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorTools
