import React, { useState, useRef } from 'react'
import { Image as ImageIcon, Upload, Download, RotateCcw, Maximize2 } from 'lucide-react'
import axios from 'axios'

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
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target.result)
        
        // Get original dimensions
        const img = new Image()
        img.onload = () => {
          setWidth(img.width.toString())
          setHeight(img.height.toString())
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  const handleWidthChange = (newWidth) => {
    setWidth(newWidth)
    if (maintainAspect && selectedFile && preview) {
      const img = new Image()
      img.onload = () => {
        const aspectRatio = img.height / img.width
        const newHeight = Math.round(parseInt(newWidth) * aspectRatio)
        setHeight(newHeight.toString())
      }
      img.src = preview
    }
  }

  const handleHeightChange = (newHeight) => {
    setHeight(newHeight)
    if (maintainAspect && selectedFile && preview) {
      const img = new Image()
      img.onload = () => {
        const aspectRatio = img.width / img.height
        const newWidth = Math.round(parseInt(newHeight) * aspectRatio)
        setWidth(newWidth.toString())
      }
      img.src = preview
    }
  }

  const resizeImage = async () => {
    if (!selectedFile || !width || !height) {
      setError('Please select an image and enter dimensions')
      return
    }

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('width', width)
      formData.append('height', height)
      formData.append('maintain_aspect', maintainAspect.toString())

      const response = await axios.post('/api/image-resize', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.success) {
        setResult(response.data)
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to resize image')
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = () => {
    if (result) {
      const link = document.createElement('a')
      link.href = result.url
      link.download = result.filename
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

  const commonSizes = [
    { name: 'Instagram Square', width: 1080, height: 1080 },
    { name: 'Instagram Story', width: 1080, height: 1920 },
    { name: 'Facebook Cover', width: 1200, height: 630 },
    { name: 'Twitter Header', width: 1500, height: 500 },
    { name: 'YouTube Thumbnail', width: 1280, height: 720 },
    { name: 'Profile Picture', width: 400, height: 400 },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <ImageIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Image Resizer
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Resize your images to any dimensions while maintaining quality
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload and Settings Section */}
        <div className="space-y-6">
          {/* File Upload */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Upload Image
            </h2>
            
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-colors duration-200"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {preview ? (
                <div className="space-y-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-w-full max-h-48 mx-auto rounded-lg"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {selectedFile?.name}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      Click to upload an image
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Supports JPG, PNG, WebP, and more
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Resize Settings */}
          {selectedFile && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Resize Settings
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="maintainAspect"
                    checked={maintainAspect}
                    onChange={(e) => setMaintainAspect(e.target.checked)}
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="maintainAspect" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Maintain aspect ratio
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Width (px)
                    </label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => handleWidthChange(e.target.value)}
                      className="input-field"
                      min="1"
                      max="5000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Height (px)
                    </label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => handleHeightChange(e.target.value)}
                      className="input-field"
                      min="1"
                      max="5000"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300">
                    {error}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={resizeImage}
                    disabled={loading || !selectedFile || !width || !height}
                    className="btn-primary flex-1 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Resizing...</span>
                      </>
                    ) : (
                      <>
                        <Maximize2 className="h-4 w-4" />
                        <span>Resize</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={clearAll}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Clear</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Common Sizes */}
          {selectedFile && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Common Sizes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {commonSizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setWidth(size.width.toString())
                      setHeight(size.height.toString())
                      setMaintainAspect(false)
                    }}
                    className="text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      {size.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {size.width} × {size.height}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Result Section */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Resized Image
          </h2>
          
          {result ? (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600">
                <img
                  src={result.url}
                  alt="Resized"
                  className="max-w-full h-auto mx-auto rounded-lg"
                />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Original:</span>
                    <div className="text-gray-600 dark:text-gray-400">
                      {result.original_size.width} × {result.original_size.height}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Resized:</span>
                    <div className="text-gray-600 dark:text-gray-400">
                      {result.new_size.width} × {result.new_size.height}
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={downloadImage}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download Resized Image</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              <ImageIcon className="h-16 w-16 mb-4 opacity-50" />
              <p className="text-center">
                Upload an image and set your desired dimensions to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageResizer
