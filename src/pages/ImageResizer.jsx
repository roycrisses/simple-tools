import React, { useState, useRef } from 'react'
import { Image as ImageIcon, Upload, Download, RotateCcw, Maximize2 } from 'lucide-react'

const ImageResizer = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [maintainAspect, setMaintainAspect] = useState(true)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file')
        return
      }
      
      setSelectedFile(file)
      setError('')
      setResult(null)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target.result)
        
        const img = new Image()
        img.onload = () => {
          if (!width && !height) {
            setWidth(img.naturalWidth.toString())
            setHeight(img.naturalHeight.toString())
          }
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  const handleWidthChange = (e) => {
    const newWidth = e.target.value
    setWidth(newWidth)
    
    if (maintainAspect && selectedFile && newWidth) {
      const img = new Image()
      img.onload = () => {
        const aspectRatio = img.naturalHeight / img.naturalWidth
        setHeight(Math.round(newWidth * aspectRatio).toString())
      }
      img.src = preview
    }
  }

  const handleHeightChange = (e) => {
    const newHeight = e.target.value
    setHeight(newHeight)
    
    if (maintainAspect && selectedFile && newHeight) {
      const img = new Image()
      img.onload = () => {
        const aspectRatio = img.naturalWidth / img.naturalHeight
        setWidth(Math.round(newHeight * aspectRatio).toString())
      }
      img.src = preview
    }
  }

  const resizeImage = () => {
    if (!selectedFile || (!width && !height)) return
    
    setLoading(true)
    setError('')
    
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      const targetWidth = parseInt(width) || img.naturalWidth
      const targetHeight = parseInt(height) || img.naturalHeight
      
      canvas.width = targetWidth
      canvas.height = targetHeight
      
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
      
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob)
        setResult({
          url,
          width: targetWidth,
          height: targetHeight,
          blob
        })
        setLoading(false)
      }, selectedFile.type, 0.9)
    }
    
    img.onerror = () => {
      setError('Failed to load image')
      setLoading(false)
    }
    
    img.src = preview
  }

  const downloadResult = () => {
    if (result) {
      const link = document.createElement('a')
      link.download = `resized-${selectedFile.name}`
      link.href = result.url
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const clearAll = () => {
    setSelectedFile(null)
    setPreview('')
    setWidth('')
    setHeight('')
    setResult(null)
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const presets = [
    { name: 'Instagram Square', width: 1080, height: 1080 },
    { name: 'Instagram Story', width: 1080, height: 1920 },
    { name: 'Facebook Cover', width: 1200, height: 630 },
    { name: 'Twitter Header', width: 1500, height: 500 },
    { name: 'YouTube Thumbnail', width: 1280, height: 720 },
    { name: 'Profile Picture', width: 400, height: 400 },
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto p-4">
        {/* Hero Section */}
        <div className="clean-hero mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="clean-icon w-16 h-16 mx-auto mb-6">
              <Maximize2 className="h-8 w-8" />
            </div>
            <h1 className="clean-h1 mb-4">
              Image Resizer
            </h1>
            <p className="text-xl text-white mb-6">
              Resize your images to any dimensions while maintaining perfect quality
            </p>
            <div className="bg-gray-900 border border-gray-800 p-4 inline-block">
              <p className="text-white text-sm">
                ✨ Maintain aspect ratio • Social media presets • Instant preview • High quality output
              </p>
            </div>
          </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload and Settings Section */}
        <div className="space-y-6">
          {/* File Upload */}
          <div className="clean-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="clean-icon w-12 h-12">
                <Upload className="h-6 w-6" />
              </div>
              <h2 className="clean-h3 mb-0">
                Upload Image
              </h2>
            </div>
            
            <div className="border-2 border-dashed border-gray-700 bg-gray-900 p-8 text-center hover:border-yellow-400 transition-all">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
                id="imageUpload"
              />
              
              <label
                htmlFor="imageUpload"
                className="cursor-pointer flex flex-col items-center space-y-3"
              >
                <Upload className="h-16 w-16 text-gray-500" />
                <span className="text-xl font-semibold text-white">
                  Click to upload an image
                </span>
                <span className="text-sm text-gray-400">
                  Supports JPG, PNG, GIF, WebP • Drag & drop supported
                </span>
              </label>
            </div>

            {error && (
              <div className="bg-red-900 border border-red-700 p-4 mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-red-400">⚠️</span>
                  <p className="text-red-300 text-sm font-medium">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Resize Settings */}
          {selectedFile && (
            <div className="clean-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="clean-icon w-12 h-12">
                  <Maximize2 className="h-6 w-6" />
                </div>
                <h2 className="clean-h3 mb-0">
                  Resize Settings
                </h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-800 p-6 border border-gray-700">
                  <h3 className="font-semibold text-yellow-400 mb-4 flex items-center gap-2">
                    <span>📐</span> Dimensions
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-3">
                        Width (px)
                      </label>
                      <input
                        type="number"
                        value={width}
                        onChange={handleWidthChange}
                        className="clean-input"
                        placeholder="Auto"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-white mb-3">
                        Height (px)
                      </label>
                      <input
                        type="number"
                        value={height}
                        onChange={handleHeightChange}
                        className="clean-input"
                        placeholder="Auto"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 mt-4 p-3 bg-gray-900">
                    <input
                      type="checkbox"
                      id="maintainAspect"
                      checked={maintainAspect}
                      onChange={(e) => setMaintainAspect(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="maintainAspect" className="text-sm font-semibold text-white flex items-center gap-2">
                      <span>🔗</span> Maintain aspect ratio
                    </label>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="bg-gray-800 p-6 border border-gray-700">
                  <h3 className="font-semibold text-yellow-400 mb-4 flex items-center gap-2">
                    <span>⚡</span> Quick Presets
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {presets.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setWidth(preset.width.toString())
                          setHeight(preset.height.toString())
                        }}
                        className="p-3 text-sm bg-gray-900 hover:bg-gray-800 transition-all border border-gray-700 hover:border-yellow-400"
                      >
                        <div className="font-semibold text-white">{preset.name}</div>
                        <div className="text-xs text-gray-400">{preset.width}×{preset.height}px</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={resizeImage}
                    disabled={loading || !selectedFile || (!width && !height)}
                    className="clean-btn clean-btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="clean-spinner"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Maximize2 className="h-5 w-5" />
                        <span>Resize Image</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={clearAll}
                    className="clean-btn clean-btn-secondary"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Clear</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Preview and Result Section */}
        <div className="space-y-6">
          {/* Original Preview */}
          {preview && (
            <div className="clean-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="clean-icon w-12 h-12">
                  <ImageIcon className="h-6 w-6" />
                </div>
                <h2 className="clean-h3 mb-0">
                  Original Image
                </h2>
              </div>
              <div className="bg-gray-900 p-6 border border-gray-800">
                <img
                  src={preview}
                  alt="Original"
                  className="max-w-full h-auto mx-auto"
                />
                <div className="mt-4 p-3 bg-gray-800">
                  <p className="text-sm text-white text-center font-medium">
                    📁 {selectedFile?.name}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Resized Result */}
          {result && (
            <div className="clean-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="clean-icon w-12 h-12">
                  <Download className="h-6 w-6" />
                </div>
                <h2 className="clean-h3 mb-0">
                  Resized Image
                </h2>
              </div>
              <div className="bg-gray-900 p-6 border border-gray-800">
                <img
                  src={result.url}
                  alt="Resized"
                  className="max-w-full h-auto mx-auto"
                />
                <div className="mt-6 space-y-4">
                  <div className="bg-green-900 p-4 border border-green-700">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-400">✓</span>
                      <span className="font-semibold text-green-300">Resize Complete!</span>
                    </div>
                    <p className="text-sm text-green-200">
                      New dimensions: {result.width} × {result.height} pixels
                    </p>
                  </div>
                  <button
                    onClick={downloadResult}
                    className="clean-btn clean-btn-primary w-full"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Resized Image</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}

export default ImageResizer
