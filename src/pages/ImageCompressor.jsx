import React, { useState, useRef } from 'react'
import { Image as ImageIcon, Upload, Download, Minimize2, RotateCcw } from 'lucide-react'

const ImageCompressor = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [quality, setQuality] = useState(80)
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
      
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File too large. Please select an image under 10MB.')
        return
      }
      
      setSelectedFile(file)
      setError('')
      setResult(null)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const compressImage = () => {
    if (!selectedFile) {
      setError('Please select an image first')
      return
    }

    setLoading(true)
    setError('')

    // Create a canvas to compress the image client-side
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // Calculate new dimensions (optional resize for compression)
      let { width, height } = img
      
      // If image is very large, resize it
      const maxDimension = 2048
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = (height * maxDimension) / width
          width = maxDimension
        } else {
          width = (width * maxDimension) / height
          height = maxDimension
        }
      }
      
      canvas.width = width
      canvas.height = height
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height)
      
      // Convert to compressed format
      const compressedDataURL = canvas.toDataURL('image/jpeg', quality / 100)
      
      // Calculate compression stats
      const originalSize = selectedFile.size
      const compressedSize = Math.round((compressedDataURL.length * 3) / 4) // Approximate size
      const compressionRatio = Math.round(((originalSize - compressedSize) / originalSize) * 100)
      
      setResult({
        success: true,
        url: compressedDataURL,
        filename: `compressed-${selectedFile.name.split('.')[0]}.jpg`,
        originalSize,
        compressedSize,
        compressionRatio,
        originalDimensions: { width: img.width, height: img.height },
        newDimensions: { width: Math.round(width), height: Math.round(height) }
      })
      
      setLoading(false)
    }
    
    img.onerror = () => {
      setError('Failed to compress image')
      setLoading(false)
    }
    
    img.src = preview
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
    setResult(null)
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Image Compressor
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Reduce image file size while maintaining quality
        </p>
      </div>

      {/* Retro Window Header */}
      <div className="retro-window mb-8">
        <div className="retro-window-header">
          <div className="flex items-center space-x-3">
            <Minimize2 className="h-6 w-6" />
            <span className="text-lg font-bold">IMAGE COMPRESSOR v1.0</span>
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
              {'>> COMPRESS IMAGES TO REDUCE FILE SIZE & IMPROVE LOADING SPEED <<'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload and Settings Section */}
        <div className="space-y-6">
          {/* File Upload */}
          <div className="card p-6">
            <div className="bg-blue-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
              <h2 className="text-xl font-mono">
                [INPUT] UPLOAD IMAGE
              </h2>
            </div>
            
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-4 border-black bg-gray-100 dark:bg-gray-600 p-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                data-testid="image-compressor-input"
              />
              
              {preview ? (
                <div className="space-y-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-w-full max-h-48 mx-auto border-2 border-black"
                  />
                  <div className="text-center">
                    <p className="text-sm font-mono font-bold text-black dark:text-white">
                      {selectedFile?.name}
                    </p>
                    <p className="text-xs font-mono text-black dark:text-white">
                      Size: {formatFileSize(selectedFile?.size)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-black bg-white">
                  <Upload className="h-8 w-8 text-black mb-2" />
                  <p className="text-sm font-mono font-bold text-black">
                    CLICK TO UPLOAD IMAGE
                  </p>
                  <p className="text-xs font-mono text-black mt-1">
                    JPG, PNG, WebP, GIF (Max 10MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Compression Settings */}
          {selectedFile && (
            <div className="card p-6">
              <div className="bg-yellow-500 text-black font-bold py-2 px-4 mb-4 border-b-4 border-black">
                <h2 className="text-xl font-mono">
                  [SETTINGS] COMPRESSION
                </h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-black dark:text-white mb-2 font-mono">
                    QUALITY: {quality}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs font-mono text-black dark:text-white mt-1">
                    <span>SMALL FILE</span>
                    <span>HIGH QUALITY</span>
                  </div>
                </div>

                <div className="bg-gray-100 p-3 border-2 border-black">
                  <div className="text-xs font-mono text-black">
                    <div>💡 QUALITY GUIDE:</div>
                    <div>• 90-100%: BEST QUALITY, LARGER FILE</div>
                    <div>• 70-89%: GOOD QUALITY, BALANCED</div>
                    <div>• 50-69%: MEDIUM QUALITY, SMALLER FILE</div>
                    <div>• 10-49%: LOW QUALITY, SMALLEST FILE</div>
                  </div>
                </div>

                {error && (
                  <div className="retro-alert retro-alert-error font-mono font-bold">
                    ERROR: {error}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={compressImage}
                    disabled={loading || !selectedFile}
                    className="btn-primary flex-1 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                  >
                    {loading ? (
                      <>
                        <div className="retro-spinner"></div>
                        <span>COMPRESSING...</span>
                      </>
                    ) : (
                      <>
                        <Minimize2 className="h-4 w-4" />
                        <span>COMPRESS IMAGE</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={clearAll}
                    className="btn-secondary flex items-center justify-center space-x-2 font-mono px-4 py-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>CLEAR</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Result Section */}
        <div className="card p-6">
          <div className="bg-green-500 text-black font-bold py-2 px-4 mb-4 border-b-4 border-black">
            <h2 className="text-xl font-mono">
              [OUTPUT] COMPRESSED IMAGE
            </h2>
          </div>
          
          {result ? (
            <div className="space-y-4">
              <div className="bg-white p-4 border-4 border-black">
                <img
                  src={result.url}
                  alt="Compressed"
                  className="max-w-full h-auto mx-auto border-2 border-gray-300"
                />
              </div>
              
              {/* Compression Stats */}
              <div className="bg-gray-100 p-4 border-4 border-black">
                <h3 className="font-mono font-bold text-black mb-3">COMPRESSION RESULTS:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                  <div>
                    <span className="font-bold text-black">ORIGINAL SIZE:</span>
                    <div className="text-red-600">{formatFileSize(result.originalSize)}</div>
                  </div>
                  <div>
                    <span className="font-bold text-black">COMPRESSED SIZE:</span>
                    <div className="text-green-600">{formatFileSize(result.compressedSize)}</div>
                  </div>
                  <div>
                    <span className="font-bold text-black">SPACE SAVED:</span>
                    <div className="text-blue-600">{result.compressionRatio}%</div>
                  </div>
                  <div>
                    <span className="font-bold text-black">QUALITY:</span>
                    <div className="text-purple-600">{quality}%</div>
                  </div>
                </div>
              </div>

              {/* Dimensions */}
              <div className="bg-blue-100 p-4 border-4 border-black">
                <h3 className="font-mono font-bold text-black mb-3">DIMENSIONS:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                  <div>
                    <span className="font-bold text-black">ORIGINAL:</span>
                    <div className="text-black">
                      {result.originalDimensions.width} × {result.originalDimensions.height}
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-black">COMPRESSED:</span>
                    <div className="text-black">
                      {result.newDimensions.width} × {result.newDimensions.height}
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={downloadImage}
                className="btn-primary w-full flex items-center justify-center space-x-2 font-mono"
              >
                <Download className="h-4 w-4" />
                <span>DOWNLOAD COMPRESSED IMAGE</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-200 dark:bg-gray-600 border-4 border-black">
              <ImageIcon className="h-16 w-16 mb-4 text-black dark:text-white" />
              <p className="text-center font-mono font-bold text-black dark:text-white">
                UPLOAD AN IMAGE AND CLICK "COMPRESS IMAGE" TO REDUCE FILE SIZE
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 card p-6">
        <div className="bg-purple-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
          <h3 className="text-lg font-mono">
            [TIPS] IMAGE OPTIMIZATION
          </h3>
        </div>
        <div className="retro-alert retro-alert-warning">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-black font-mono font-bold">
            <div>
              {'>> COMPRESS IMAGES BEFORE UPLOADING'}
            </div>
            <div>
              {'>> 80% QUALITY IS USUALLY OPTIMAL'}
            </div>
            <div>
              {'>> SMALLER IMAGES LOAD FASTER'}
            </div>
            <div>
              {'>> USE JPG FOR PHOTOS, PNG FOR GRAPHICS'}
            </div>
            <div>
              {'>> OPTIMIZE FOR WEB TO IMPROVE SEO'}
            </div>
            <div>
              {'>> BATCH COMPRESS MULTIPLE IMAGES'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageCompressor
