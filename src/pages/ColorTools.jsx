import React, { useState, useEffect } from 'react'
import { Palette, Copy, RotateCcw, Shuffle } from 'lucide-react'

const ColorTools = () => {
  const [selectedColor, setSelectedColor] = useState('#3B82F6')
  const [activeTab, setActiveTab] = useState('picker')
  const [colorPalette, setColorPalette] = useState([])
  const [copyMessage, setCopyMessage] = useState('')

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

  const hexToHsl = (hex) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return null
    
    const r = rgb.r / 255
    const g = rgb.g / 255
    const b = rgb.b / 255
    
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
      }
      h /= 6
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  const generatePalette = () => {
    const rgb = hexToRgb(selectedColor)
    if (!rgb) return
    
    const palette = []
    
    // Generate complementary colors
    palette.push({
      name: 'Original',
      color: selectedColor
    })
    
    // Lighter shades
    for (let i = 1; i <= 3; i++) {
      const factor = 0.2 * i
      const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * factor))
      const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * factor))
      const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * factor))
      palette.push({
        name: `Light ${i}`,
        color: rgbToHex(r, g, b)
      })
    }
    
    // Darker shades
    for (let i = 1; i <= 3; i++) {
      const factor = 0.2 * i
      const r = Math.round(rgb.r * (1 - factor))
      const g = Math.round(rgb.g * (1 - factor))
      const b = Math.round(rgb.b * (1 - factor))
      palette.push({
        name: `Dark ${i}`,
        color: rgbToHex(r, g, b)
      })
    }
    
    setColorPalette(palette)
  }

  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    setSelectedColor(randomColor)
  }

  const copyToClipboard = async (text, format = 'color') => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyMessage(`${format} copied!`)
      setTimeout(() => setCopyMessage(''), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const getColorFormats = (hex) => {
    const rgb = hexToRgb(hex)
    const hsl = hexToHsl(hex)
    
    return {
      hex: hex.toUpperCase(),
      rgb: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '',
      hsl: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : ''
    }
  }

  const formats = getColorFormats(selectedColor)

  return (
    <div className="min-h-screen">
      {/* Minimal Header */}
      <div className="minimal-hero">
        <div className="minimal-container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <h1 className="minimal-h1 mb-0">
                Color Tools
              </h1>
            </div>
            
            <p className="minimal-text text-lg">
              Pick colors, generate palettes, and convert between different color formats.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="minimal-container">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Tab Selection */}
            <div className="minimal-card">
              <div className="flex mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('picker')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                    activeTab === 'picker'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Color Picker
                </button>
                <button
                  onClick={() => setActiveTab('palette')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                    activeTab === 'palette'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Color Palette
                </button>
                <button
                  onClick={() => setActiveTab('converter')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                    activeTab === 'converter'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Color Converter
                </button>
              </div>

              {/* Color Picker Tab */}
              {activeTab === 'picker' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div 
                      className="w-32 h-32 mx-auto rounded-2xl shadow-lg border-4 border-white dark:border-gray-700"
                      style={{ backgroundColor: selectedColor }}
                    ></div>
                    <p className="mt-4 text-lg font-semibold">{selectedColor}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-16 h-16 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                    />
                    
                    <input
                      type="text"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="minimal-input max-w-xs"
                      placeholder="#000000"
                    />
                    
                    <button
                      onClick={generateRandomColor}
                      className="minimal-button minimal-button-secondary"
                    >
                      <Shuffle className="h-4 w-4" />
                      Random
                    </button>
                  </div>
                </div>
              )}

              {/* Color Palette Tab */}
              {activeTab === 'palette' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-4">Generated Palette</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                      {colorPalette.map((item, index) => (
                        <div key={index} className="text-center">
                          <div
                            className="w-full h-16 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 cursor-pointer hover:scale-105 transition-transform"
                            style={{ backgroundColor: item.color }}
                            onClick={() => copyToClipboard(item.color, 'Color')}
                            title={`Click to copy ${item.color}`}
                          ></div>
                          <p className="text-xs mt-2 font-medium">{item.name}</p>
                          <p className="text-xs minimal-text">{item.color}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Color Converter Tab */}
              {activeTab === 'converter' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div 
                      className="w-24 h-24 mx-auto rounded-xl shadow-lg border-4 border-white dark:border-gray-700 mb-4"
                      style={{ backgroundColor: selectedColor }}
                    ></div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          HEX
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            value={formats.hex}
                            readOnly
                            className="minimal-input rounded-r-none"
                          />
                          <button
                            onClick={() => copyToClipboard(formats.hex, 'HEX')}
                            className="px-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg transition-colors"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          RGB
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            value={formats.rgb}
                            readOnly
                            className="minimal-input rounded-r-none"
                          />
                          <button
                            onClick={() => copyToClipboard(formats.rgb, 'RGB')}
                            className="px-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg transition-colors"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          HSL
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            value={formats.hsl}
                            readOnly
                            className="minimal-input rounded-r-none"
                          />
                          <button
                            onClick={() => copyToClipboard(formats.hsl, 'HSL')}
                            className="px-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg transition-colors"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Copy Message */}
              {copyMessage && (
                <div className="text-center">
                  <div className="inline-block bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-4 py-2 rounded-lg text-sm font-medium">
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

export default ColorTools
