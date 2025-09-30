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
      name: 'LENGTH',
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
      name: 'WEIGHT',
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
      name: 'TEMPERATURE',
      units: {
        'c': { name: 'Celsius' },
        'f': { name: 'Fahrenheit' },
        'k': { name: 'Kelvin' }
      }
    },
    volume: {
      name: 'VOLUME',
      units: {
        'ml': { name: 'Milliliters', factor: 0.001 },
        'l': { name: 'Liters', factor: 1 },
        'gal': { name: 'Gallons', factor: 3.78541 },
        'qt': { name: 'Quarts', factor: 0.946353 },
        'pt': { name: 'Pints', factor: 0.473176 },
        'cup': { name: 'Cups', factor: 0.236588 },
        'fl_oz': { name: 'Fluid Ounces', factor: 0.0295735 }
      }
    },
    area: {
      name: 'AREA',
      units: {
        'mm2': { name: 'Square Millimeters', factor: 0.000001 },
        'cm2': { name: 'Square Centimeters', factor: 0.0001 },
        'm2': { name: 'Square Meters', factor: 1 },
        'km2': { name: 'Square Kilometers', factor: 1000000 },
        'in2': { name: 'Square Inches', factor: 0.00064516 },
        'ft2': { name: 'Square Feet', factor: 0.092903 },
        'acre': { name: 'Acres', factor: 4046.86 }
      }
    },
    speed: {
      name: 'SPEED',
      units: {
        'mps': { name: 'Meters/Second', factor: 1 },
        'kph': { name: 'Kilometers/Hour', factor: 0.277778 },
        'mph': { name: 'Miles/Hour', factor: 0.44704 },
        'fps': { name: 'Feet/Second', factor: 0.3048 },
        'knot': { name: 'Knots', factor: 0.514444 }
      }
    }
  }

  useEffect(() => {
    const units = Object.keys(conversions[activeCategory].units)
    setFromUnit(units[0] || '')
    setToUnit(units[1] || units[0] || '')
    setInputValue('')
    setResult('')
  }, [activeCategory])

  useEffect(() => {
    if (inputValue && fromUnit && toUnit) {
      convertValue()
    } else {
      setResult('')
    }
  }, [inputValue, fromUnit, toUnit, activeCategory])

  const convertValue = () => {
    if (!inputValue || isNaN(inputValue)) {
      setResult('')
      return
    }

    const value = parseFloat(inputValue)
    let convertedValue = 0

    if (activeCategory === 'temperature') {
      convertedValue = convertTemperature(value, fromUnit, toUnit)
    } else {
      const fromFactor = conversions[activeCategory].units[fromUnit].factor
      const toFactor = conversions[activeCategory].units[toUnit].factor
      convertedValue = (value * fromFactor) / toFactor
    }

    setResult(convertedValue.toFixed(6).replace(/\.?0+$/, ''))
  }

  const convertTemperature = (value, from, to) => {
    let celsius = value

    // Convert to Celsius first
    if (from === 'f') {
      celsius = (value - 32) * 5/9
    } else if (from === 'k') {
      celsius = value - 273.15
    }

    // Convert from Celsius to target
    if (to === 'f') {
      return celsius * 9/5 + 32
    } else if (to === 'k') {
      return celsius + 273.15
    }

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

  const currentUnits = conversions[activeCategory].units

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Retro Window Header */}
      <div className="retro-window mb-8">
        <div className="retro-window-header">
          <div className="flex items-center space-x-3">
            <Calculator className="h-6 w-6" />
            <span className="text-lg font-bold">UNIT CONVERTER v1.0</span>
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
              {'>> LENGTH, WEIGHT, TEMPERATURE, AND MORE CONVERSIONS <<'}
            </p>
          </div>
        </div>
      </div>

      {/* Category Selection */}
      <div className="card p-6 mb-8">
        <div className="bg-blue-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
          <h2 className="text-xl font-mono">
            [SELECT] CONVERSION CATEGORY
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {Object.entries(conversions).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`py-2 px-4 font-mono font-bold transition-colors border-4 border-black ${
                activeCategory === key
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="card p-6">
          <div className="bg-green-500 text-black font-bold py-2 px-4 mb-4 border-b-4 border-black">
            <h2 className="text-xl font-mono">
              [INPUT] CONVERSION SETUP
            </h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-black dark:text-white mb-2 font-mono">
                FROM UNIT:
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="input-field font-mono font-bold"
              >
                {Object.entries(currentUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-black dark:text-white mb-2 font-mono">
                VALUE TO CONVERT:
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="ENTER VALUE..."
                className="input-field font-mono"
                step="any"
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={swapUnits}
                className="btn-secondary flex items-center space-x-2 font-mono"
              >
                <ArrowRightLeft className="h-4 w-4" />
                <span>SWAP</span>
              </button>
            </div>

            <div>
              <label className="block text-sm font-bold text-black dark:text-white mb-2 font-mono">
                TO UNIT:
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="input-field font-mono font-bold"
              >
                {Object.entries(currentUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={clearAll}
              className="btn-secondary w-full flex items-center justify-center space-x-2 font-mono"
            >
              <RotateCcw className="h-4 w-4" />
              <span>CLEAR</span>
            </button>
          </div>
        </div>

        {/* Result Section */}
        <div className="card p-6">
          <div className="bg-purple-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
            <h2 className="text-xl font-mono">
              [RESULT] CONVERSION OUTPUT
            </h2>
          </div>
          
          <div className="space-y-4">
            {inputValue && result ? (
              <>
                <div className="bg-blue-200 p-4 border-4 border-black text-center">
                  <div className="text-sm font-mono font-bold text-black mb-1">FROM:</div>
                  <div className="text-2xl font-mono font-bold text-black">
                    {inputValue} {currentUnits[fromUnit]?.name}
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <ArrowRightLeft className="h-8 w-8 text-black dark:text-white" />
                </div>
                
                <div className="bg-green-200 p-4 border-4 border-black text-center">
                  <div className="text-sm font-mono font-bold text-black mb-1">TO:</div>
                  <div className="text-2xl font-mono font-bold text-black">
                    {result} {currentUnits[toUnit]?.name}
                  </div>
                </div>
                
                <div className="bg-yellow-200 p-4 border-4 border-black">
                  <div className="text-center font-mono font-bold text-black">
                    {inputValue} {fromUnit.toUpperCase()} = {result} {toUnit.toUpperCase()}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-gray-200 dark:bg-gray-600 border-4 border-black">
                <Calculator className="h-16 w-16 mb-4 text-black dark:text-white" />
                <p className="text-center font-mono font-bold text-black dark:text-white">
                  ENTER A VALUE TO SEE CONVERSION
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="mt-8 card p-6">
        <div className="bg-red-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
          <h3 className="text-lg font-mono">
            [REFERENCE] COMMON CONVERSIONS
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-200 p-3 border-4 border-black">
            <h4 className="font-bold font-mono text-black mb-2">LENGTH:</h4>
            <div className="text-sm font-mono text-black space-y-1">
              <div>• 1 METER = 3.28 FEET</div>
              <div>• 1 INCH = 2.54 CM</div>
              <div>• 1 MILE = 1.61 KM</div>
            </div>
          </div>
          
          <div className="bg-gray-200 p-3 border-4 border-black">
            <h4 className="font-bold font-mono text-black mb-2">WEIGHT:</h4>
            <div className="text-sm font-mono text-black space-y-1">
              <div>• 1 KG = 2.20 LBS</div>
              <div>• 1 OZ = 28.35 GRAMS</div>
              <div>• 1 TON = 1000 KG</div>
            </div>
          </div>
          
          <div className="bg-gray-200 p-3 border-4 border-black">
            <h4 className="font-bold font-mono text-black mb-2">TEMPERATURE:</h4>
            <div className="text-sm font-mono text-black space-y-1">
              <div>• 0°C = 32°F</div>
              <div>• 100°C = 212°F</div>
              <div>• 0K = -273.15°C</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnitConverter
