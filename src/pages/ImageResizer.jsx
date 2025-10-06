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
    <div className="min-h-screen">
      {/* Minimal Header */}
      <div className="minimal-hero">
        <div className="minimal-container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <ImageIcon className="h-6 w-6 text-white" />
              </div>
              <h1 className="minimal-h1 mb-0">
                Image Resizer
              </h1>
            </div>
            
            <p className="minimal-text text-lg">
              Resize your images to any dimensions while maintaining quality.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="minimal-container">
          <div className="minimal-grid minimal-grid-2">
            {/* Upload and Settings Section */}
            <div className="space-y-6">
              {/* File Upload */}
              <div className="minimal-card">
                <h2 className="minimal-h2 mb-6">
                  Upload Image
                </h2>
                
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
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
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <Upload className="h-12 w-12 text-gray-400" />
                    <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                      Click to upload an image
                    </span>
                    <span className="text-sm minimal-text">
                      Supports JPG, PNG, GIF, WebP
                    </span>
                  </label>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                  </div>
                )}
              </div>

              {/* Resize Settings */}
              {selectedFile && (
                <div className="minimal-card">
                  <h2 className="minimal-h2 mb-6">
                    Resize Settings
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Width (px)
                        </label>
                        <input
                          type="number"
                          value={width}
                          onChange={handleWidthChange}
                          className="minimal-input"
                          placeholder="Auto"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Height (px)
                        </label>
                        <input
                          type="number"
                          value={height}
                          onChange={handleHeightChange}
                          className="minimal-input"
                          placeholder="Auto"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="maintainAspect"
                        checked={maintainAspect}
                        onChange={(e) => setMaintainAspect(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="maintainAspect" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Maintain aspect ratio
                      </label>
                    </div>

                    {/* Quick Presets */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Quick Presets
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {presets.map((preset, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setWidth(preset.width.toString())
                              setHeight(preset.height.toString())
                            }}
                            className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                          >
                            {preset.name} ({preset.width}×{preset.height})
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={resizeImage}
                        disabled={loading || !selectedFile || (!width && !height)}
                        className="minimal-button minimal-button-primary flex-1 disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Maximize2 className="h-4 w-4" />
                            Resize Image
                          </>
                        )}
                      </button>
                      
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
              )}
            </div>

            {/* Preview and Result Section */}
            <div className="space-y-6">
              {/* Original Preview */}
              {preview && (
                <div className="minimal-card">
                  <h2 className="minimal-h2 mb-6">
                    Original Image
                  </h2>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <img
                      src={preview}
                      alt="Original"
                      className="max-w-full h-auto mx-auto rounded-lg shadow-sm"
                    />
                    <p className="minimal-text text-sm mt-2 text-center">
                      Original size: {selectedFile?.name}
                    </p>
                  </div>
                </div>
              )}

              {/* Resized Result */}
              {result && (
                <div className="minimal-card">
                  <h2 className="minimal-h2 mb-6">
                    Resized Image
                  </h2>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <img
                      src={result.url}
                      alt="Resized"
                      className="max-w-full h-auto mx-auto rounded-lg shadow-sm"
                    />
                    <div className="mt-4 text-center space-y-2">
                      <p className="minimal-text text-sm">
                        New size: {result.width} × {result.height} pixels
                      </p>
                      <button
                        onClick={downloadResult}
                        className="minimal-button minimal-button-primary"
                      >
                        <Download className="h-4 w-4" />
                        Download Resized Image
                      </button>
                    </div>
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

export default ImageResizer
