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
      {/* Modern Hero Section */}
      <div className="hero-modern mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="icon-container mx-auto mb-6">
            <Minimize2 className="h-8 w-8" />
          </div>
          <h1 className="heading-1 text-white mb-4">
            Image Compressor
          </h1>
          <p className="text-xl text-white/90 mb-6">
            Reduce image file size while maintaining quality
          </p>
          <div className="glass-modern rounded-xl p-4 inline-block">
            <p className="text-white/80 text-sm">
              ✨ Compress images up to 90% smaller • Maintain visual quality • Fast processing
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
            
            <div
              onClick={!preview ? () => fileInputRef.current?.click() : undefined}
              className={`border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl transition-all ${
                !preview ? 'cursor-pointer hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700' : ''
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                data-testid="image-compressor-input"
              />
              
              {preview ? (
                <div className="space-y-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-w-full max-h-48 mx-auto border-2 border-black"
                  />
                  <div className="text-center space-y-2">
                    <p className="text-sm font-mono font-bold text-black dark:text-white">
                      {selectedFile?.name}
                    </p>
                    <p className="text-xs font-mono text-black dark:text-white">
                      Size: {formatFileSize(selectedFile?.size)}
                    </p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-modern btn-modern-secondary text-sm px-4 py-2"
                    >
                      Change Image
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-32">
                  <Upload className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Click to upload image
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    JPG, PNG, WebP, GIF (Max 10MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Compression Settings */}
          {selectedFile && (
            <div className="modern-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="icon-container w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500">
                  <ImageIcon className="h-6 w-6" />
                </div>
                <h2 className="heading-3 mb-0">
                  Compression Settings
                </h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Quality: {quality}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <span>Smaller file</span>
                    <span>Higher quality</span>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <div className="font-semibold mb-2 flex items-center gap-2">
                      <span>💡</span> Quality Guide
                    </div>
                    <div className="space-y-1 text-xs">
                      <div>• 90-100%: Best quality, larger file</div>
                      <div>• 70-89%: Good quality, balanced</div>
                      <div>• 50-69%: Medium quality, smaller file</div>
                      <div>• 10-49%: Low quality, smallest file</div>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-red-800 dark:text-red-200 text-sm font-medium">
                      ⚠️ {error}
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={compressImage}
                    disabled={loading || !selectedFile}
                    className="btn-modern btn-modern-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="spinner-modern"></div>
                        <span>Compressing...</span>
                      </>
                    ) : (
                      <>
                        <Minimize2 className="h-4 w-4" />
                        <span>Compress Image</span>
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

        {/* Result Section */}
        <div className="modern-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="icon-container w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500">
              <Download className="h-6 w-6" />
            </div>
            <h2 className="heading-3 mb-0">
              Compressed Image
            </h2>
          </div>
          
          {result ? (
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <img
                  src={result.url}
                  alt="Compressed"
                  className="max-w-full h-auto mx-auto rounded-lg"
                />
              </div>
              
              {/* Compression Stats */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Compression Results</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <span className="font-medium text-gray-600 dark:text-gray-400 block">Original Size</span>
                    <div className="text-red-600 dark:text-red-400 font-semibold">{formatFileSize(result.originalSize)}</div>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <span className="font-medium text-gray-600 dark:text-gray-400 block">Compressed Size</span>
                    <div className="text-green-600 dark:text-green-400 font-semibold">{formatFileSize(result.compressedSize)}</div>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <span className="font-medium text-gray-600 dark:text-gray-400 block">Space Saved</span>
                    <div className="text-blue-600 dark:text-blue-400 font-semibold">{result.compressionRatio}%</div>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <span className="font-medium text-gray-600 dark:text-gray-400 block">Quality</span>
                    <div className="text-purple-600 dark:text-purple-400 font-semibold">{quality}%</div>
                  </div>
                </div>
              </div>

              {/* Dimensions */}
              <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-indigo-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Dimensions</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <span className="font-medium text-gray-600 dark:text-gray-400 block">Original</span>
                    <div className="text-gray-800 dark:text-gray-200 font-semibold">
                      {result.originalDimensions.width} × {result.originalDimensions.height}
                    </div>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <span className="font-medium text-gray-600 dark:text-gray-400 block">Compressed</span>
                    <div className="text-gray-800 dark:text-gray-200 font-semibold">
                      {result.newDimensions.width} × {result.newDimensions.height}
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={downloadImage}
                className="btn-modern btn-modern-primary w-full"
              >
                <Download className="h-5 w-5" />
                <span>Download Compressed Image</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
              <ImageIcon className="h-16 w-16 mb-4 text-gray-400" />
              <p className="text-center text-gray-600 dark:text-gray-400 max-w-sm">
                Upload an image and click "Compress Image" to reduce file size while maintaining quality
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-12 modern-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="icon-container w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500">
            <span className="text-xl">💡</span>
          </div>
          <h3 className="heading-3 mb-0">
            Image Optimization Tips
          </h3>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <span className="text-green-500">✓</span>
              <span className="text-gray-700 dark:text-gray-300">Compress images before uploading</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <span className="text-green-500">✓</span>
              <span className="text-gray-700 dark:text-gray-300">80% quality is usually optimal</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <span className="text-green-500">✓</span>
              <span className="text-gray-700 dark:text-gray-300">Smaller images load faster</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <span className="text-green-500">✓</span>
              <span className="text-gray-700 dark:text-gray-300">Use JPG for photos, PNG for graphics</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <span className="text-green-500">✓</span>
              <span className="text-gray-700 dark:text-gray-300">Optimize for web to improve SEO</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <span className="text-green-500">✓</span>
              <span className="text-gray-700 dark:text-gray-300">Batch compress multiple images</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageCompressor
