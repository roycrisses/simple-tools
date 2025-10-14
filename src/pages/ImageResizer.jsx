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
    <div className="max-w-6xl mx-auto p-4">
      {/* Modern Hero Section */}
      <div className="hero-modern mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="icon-container mx-auto mb-6">
            <Maximize2 className="h-8 w-8" />
          </div>
          <h1 className="heading-1 text-white mb-4">
            Image Resizer
          </h1>
          <p className="text-xl text-white/90 mb-6">
            Resize your images to any dimensions while maintaining perfect quality
          </p>
          <div className="glass-modern rounded-xl p-4 inline-block">
            <p className="text-white/80 text-sm">
              ✨ Maintain aspect ratio • Social media presets • Instant preview • High quality output
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload and Settings Section */}
        <div className="space-y-6">
          {/* File Upload */}
          <div className="modern-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="icon-container w-12 h-12">
                <Upload className="h-6 w-6" />
              </div>
              <h2 className="heading-3 mb-0">
                Upload Image
              </h2>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all">
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
                <Upload className="h-16 w-16 text-gray-400" />
                <span className="text-xl font-semibold text-gray-700">
                  Click to upload an image
                </span>
                <span className="text-sm text-gray-500">
                  Supports JPG, PNG, GIF, WebP • Drag & drop supported
                </span>
              </label>
            </div>

            {error && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <span className="text-red-600">⚠️</span>
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Resize Settings */}
          {selectedFile && (
            <div className="modern-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="icon-container w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500">
                  <Maximize2 className="h-6 w-6" />
                </div>
                <h2 className="heading-3 mb-0">
                  Resize Settings
                </h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span>📐</span> Dimensions
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Width (px)
                      </label>
                      <input
                        type="number"
                        value={width}
                        onChange={handleWidthChange}
                        className="input-modern"
                        placeholder="Auto"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Height (px)
                      </label>
                      <input
                        type="number"
                        value={height}
                        onChange={handleHeightChange}
                        className="input-modern"
                        placeholder="Auto"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 mt-4 p-3 bg-white/50 rounded-lg">
                    <input
                      type="checkbox"
                      id="maintainAspect"
                      checked={maintainAspect}
                      onChange={(e) => setMaintainAspect(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="maintainAspect" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <span>🔗</span> Maintain aspect ratio
                    </label>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
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
                        className="p-3 text-sm bg-white/70 hover:bg-white rounded-lg transition-all border border-purple-200/50 hover:border-purple-300 hover:shadow-md"
                      >
                        <div className="font-semibold text-gray-800">{preset.name}</div>
                        <div className="text-xs text-gray-600">{preset.width}×{preset.height}px</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={resizeImage}
                    disabled={loading || !selectedFile || (!width && !height)}
                    className="btn-modern btn-modern-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="spinner-modern"></div>
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
                    className="btn-modern btn-modern-secondary"
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
            <div className="modern-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="icon-container w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500">
                  <ImageIcon className="h-6 w-6" />
                </div>
                <h2 className="heading-3 mb-0">
                  Original Image
                </h2>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <img
                  src={preview}
                  alt="Original"
                  className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
                />
                <div className="mt-4 p-3 bg-white/50 rounded-lg">
                  <p className="text-sm text-gray-600 text-center font-medium">
                    📁 {selectedFile?.name}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Resized Result */}
          {result && (
            <div className="modern-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="icon-container w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500">
                  <Download className="h-6 w-6" />
                </div>
                <h2 className="heading-3 mb-0">
                  Resized Image
                </h2>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <img
                  src={result.url}
                  alt="Resized"
                  className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
                />
                <div className="mt-6 space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-600">✓</span>
                      <span className="font-semibold text-green-800">Resize Complete!</span>
                    </div>
                    <p className="text-sm text-green-700">
                      New dimensions: {result.width} × {result.height} pixels
                    </p>
                  </div>
                  <button
                    onClick={downloadResult}
                    className="btn-modern btn-modern-primary w-full"
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
  )
}

export default ImageResizer
