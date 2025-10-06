import React, { useState, useEffect } from 'react'
import { Calculator, ArrowRightLeft, RotateCcw } from 'lucide-react'

const UnitConverter = () => {
  const [activeCategory, setActiveCategory] = useState('length')
  const [fromUnit, setFromUnit] = useState('')
  const [toUnit, setToUnit] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [result, setResult] = useState('')

  const conversions = {
    length: {
      name: 'Length',
      units: {
        'mm': { name: 'Millimeters', factor: 0.001 },
        'cm': { name: 'Centimeters', factor: 0.01 },
        'm': { name: 'Meters', factor: 1 },
        'km': { name: 'Kilometers', factor: 1000 },
        'in': { name: 'Inches', factor: 0.0254 },
        'ft': { name: 'Feet', factor: 0.3048 },
        'yd': { name: 'Yards', factor: 0.9144 },
        'mi': { name: 'Miles', factor: 1609.344 }
      }
    },
    weight: {
      name: 'Weight',
      units: {
        'mg': { name: 'Milligrams', factor: 0.000001 },
        'g': { name: 'Grams', factor: 0.001 },
        'kg': { name: 'Kilograms', factor: 1 },
        'oz': { name: 'Ounces', factor: 0.0283495 },
        'lb': { name: 'Pounds', factor: 0.453592 },
        'ton': { name: 'Tons', factor: 1000 }
      }
    },
    temperature: {
      name: 'Temperature',
      units: {
        'c': { name: 'Celsius' },
        'f': { name: 'Fahrenheit' },
        'k': { name: 'Kelvin' }
      }
    },
    volume: {
      name: 'Volume',
      units: {
        'ml': { name: 'Milliliters', factor: 0.001 },
        'l': { name: 'Liters', factor: 1 },
        'cup': { name: 'Cups', factor: 0.236588 },
        'pt': { name: 'Pints', factor: 0.473176 },
        'qt': { name: 'Quarts', factor: 0.946353 },
        'gal': { name: 'Gallons', factor: 3.78541 }
      }
    },
    area: {
      name: 'Area',
      units: {
        'mm2': { name: 'Square Millimeters', factor: 0.000001 },
        'cm2': { name: 'Square Centimeters', factor: 0.0001 },
        'm2': { name: 'Square Meters', factor: 1 },
        'km2': { name: 'Square Kilometers', factor: 1000000 },
        'in2': { name: 'Square Inches', factor: 0.00064516 },
        'ft2': { name: 'Square Feet', factor: 0.092903 },
        'acre': { name: 'Acres', factor: 4046.86 }
      }
    }
  }

  useEffect(() => {
    const units = Object.keys(conversions[activeCategory].units)
    if (units.length >= 2) {
      setFromUnit(units[0])
      setToUnit(units[1])
    }
    setInputValue('')
    setResult('')
  }, [activeCategory])

  useEffect(() => {
    if (inputValue && fromUnit && toUnit) {
      convertUnits()
    } else {
      setResult('')
    }
  }, [inputValue, fromUnit, toUnit])

  const convertUnits = () => {
    if (!inputValue || !fromUnit || !toUnit) return

    const value = parseFloat(inputValue)
    if (isNaN(value)) {
      setResult('')
      return
    }

    if (activeCategory === 'temperature') {
      setResult(convertTemperature(value, fromUnit, toUnit).toFixed(2))
    } else {
      const fromFactor = conversions[activeCategory].units[fromUnit].factor
      const toFactor = conversions[activeCategory].units[toUnit].factor
      const converted = (value * fromFactor) / toFactor
      setResult(converted.toFixed(6).replace(/\.?0+$/, ''))
    }
  }

  const convertTemperature = (value, from, to) => {
    let celsius = value
    
    if (from === 'f') celsius = (value - 32) * 5/9
    if (from === 'k') celsius = value - 273.15
    
    if (to === 'f') return celsius * 9/5 + 32
    if (to === 'k') return celsius + 273.15
    return celsius
  }

  const swapUnits = () => {
    const temp = fromUnit
    setFromUnit(toUnit)
    setToUnit(temp)
  }

  const clearAll = () => {
    setInputValue('')
    setResult('')
  }

  return (
    <div className="min-h-screen">
      {/* Minimal Header */}
      <div className="minimal-hero">
        <div className="minimal-container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <h1 className="minimal-h1 mb-0">
                Unit Converter
              </h1>
            </div>
            
            <p className="minimal-text text-lg">
              Convert between different units of measurement quickly and accurately.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="minimal-container">
          <div className="max-w-4xl mx-auto">
            {/* Category Selection */}
            <div className="minimal-card mb-8">
              <h2 className="minimal-h2 mb-6">
                Select Category
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {Object.entries(conversions).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`p-3 rounded-lg font-medium transition-colors ${
                      activeCategory === key
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Conversion Section */}
            <div className="minimal-card">
              <h2 className="minimal-h2 mb-6">
                Convert {conversions[activeCategory].name}
              </h2>
              
              <div className="space-y-6">
                {/* Input Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      From
                    </label>
                    <select
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                      className="minimal-input"
                    >
                      {Object.entries(conversions[activeCategory].units).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex justify-center">
                    <button
                      onClick={swapUnits}
                      className="minimal-button minimal-button-secondary"
                      title="Swap units"
                    >
                      <ArrowRightLeft className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      To
                    </label>
                    <select
                      value={toUnit}
                      onChange={(e) => setToUnit(e.target.value)}
                      className="minimal-input"
                    >
                      {Object.entries(conversions[activeCategory].units).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Value Input */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Enter Value
                    </label>
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter value to convert"
                      className="minimal-input"
                      step="any"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Result
                    </label>
                    <div className="minimal-input bg-gray-50 dark:bg-gray-700 flex items-center">
                      {result ? (
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                          {result}
                        </span>
                      ) : (
                        <span className="minimal-text">
                          Result will appear here
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Result Display */}
                {result && inputValue && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {inputValue} {conversions[activeCategory].units[fromUnit].name} = 
                      </div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                        {result} {conversions[activeCategory].units[toUnit].name}
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-center">
                  <button
                    onClick={clearAll}
                    className="minimal-button minimal-button-secondary"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnitConverter
