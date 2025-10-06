import React, { useState, useRef } from 'react'
import { QrCode, Download, Copy, RotateCcw, FileImage } from 'lucide-react'
import QRCodeLib from 'qrcode'

const QRGenerator = () => {
  const [text, setText] = useState('')
  const [size, setSize] = useState(10)
  const [border, setBorder] = useState(4)
  const [qrResult, setQrResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploadedImage, setUploadedImage] = useState(null)
  const [uploadingToHost, setUploadingToHost] = useState(false)
  const [activeTab, setActiveTab] = useState('text')
  const fileInputRef = useRef(null)

  const generateQR = async () => {
    if (activeTab === 'text' && !text.trim()) {
      setError('Please enter some text or URL')
      return
    }
    
    if (activeTab === 'image' && !uploadedImage) {
      setError('Please upload an image first')
      return
    }

    setLoading(true)
    setError('')

    try {
      let dataToEncode = text
      let filename = `qr-code-${Date.now()}.png`
      
      if (activeTab === 'image' && uploadedImage) {
        setUploadingToHost(true)
        
        try {
          const imageUrl = await uploadImageToHost(uploadedImage)
          dataToEncode = imageUrl
          filename = `qr-code-image-${Date.now()}.png`
          setText(`Image URL: ${imageUrl}`)
        } catch (uploadError) {
          setError('Failed to upload image. Please try again or use text mode.')
          setLoading(false)
          setUploadingToHost(false)
          return
        } finally {
          setUploadingToHost(false)
        }
      }
      
      const qrDataURL = await QRCodeLib.toDataURL(dataToEncode, {
        width: size * 20,
        margin: border,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      
      setQrResult(qrDataURL)
    } catch (err) {
      setError(`Failed to generate QR code: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const downloadQR = () => {
    if (qrResult) {
      const link = document.createElement('a')
      link.download = `qr-code-${Date.now()}.png`
      link.href = qrResult
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file')
        return
      }
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target.result)
        setError('')
        setText('Image ready for QR conversion')
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImageToHost = async (imageDataUrl) => {
    try {
      const response = await fetch(imageDataUrl)
      const blob = await response.blob()
      
      const formData = new FormData()
      formData.append('image', blob)
      
      const apiKey = '15e11b72ae8aba63233d22d2e90198f5'
      
      const uploadResponse = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData
      })
      
      const result = await uploadResponse.json()
      
      if (result.success) {
        return result.data.url
      } else {
        throw new Error(`Upload failed: ${result.error?.message || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Image upload error:', error)
      throw new Error('Failed to upload image to hosting service')
    }
  }

  const clearAll = () => {
    setText('')
    setQrResult(null)
    setError('')
    setUploadedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen">
      {/* Minimal Header */}
      <div className="minimal-hero">
        <div className="minimal-container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <QrCode className="h-6 w-6 text-white" />
              </div>
              <h1 className="minimal-h1 mb-0">
                QR Code Generator
              </h1>
            </div>
            
            <p className="minimal-text text-lg">
              Generate QR codes for text, URLs, or any content you need to share.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="minimal-container">
          <div className="minimal-grid minimal-grid-2">
            {/* Input Section */}
            <div className="minimal-card">
              <h2 className="minimal-h2 mb-6">
                Enter Content
              </h2>
              
              {/* Tab Selection */}
              <div className="flex mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('text')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                    activeTab === 'text'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Text Input
                </button>
                <button
                  onClick={() => setActiveTab('image')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                    activeTab === 'image'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Image Upload
                </button>
              </div>
          
              <div className="space-y-4">
                {activeTab === 'text' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Text or URL
                    </label>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Enter text, URL, or any message..."
                      className="minimal-input h-32 resize-none"
                      maxLength={1000}
                      data-testid="qr-text-input"
                    />
                    <div className="minimal-text text-sm mt-1">
                      {text.length}/1000 characters
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Upload Image
                    </label>
                    <div className="minimal-text text-sm mb-3">
                      💡 Images will be uploaded and QR will contain the image URL
                    </div>
                    
                    <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                        id="imageUpload"
                      />
                      
                      <label
                        htmlFor="imageUpload"
                        className="cursor-pointer flex flex-col items-center justify-center h-32 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-lg"
                      >
                        {uploadedImage ? (
                          <div className="flex flex-col items-center">
                            <img
                              src={uploadedImage}
                              alt="Uploaded"
                              className="max-h-20 max-w-20 object-contain mb-2"
                            />
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Click to change image
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <FileImage className="h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Click to upload image
                            </p>
                            <p className="text-xs minimal-text mt-1">
                              JPG, PNG, GIF, etc.
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                    
                    {uploadingToHost && (
                      <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-yellow-600 border-t-transparent"></div>
                          <span className="text-sm text-yellow-700 dark:text-yellow-300">Uploading image...</span>
                        </div>
                      </div>
                    )}
                    
                    {uploadedImage && !qrResult && (
                      <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <span className="text-sm text-blue-700 dark:text-blue-300">📷 Image uploaded! Click Generate QR Code to create QR code</span>
                      </div>
                    )}
                  </div>
                )}

                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <span className="text-red-700 dark:text-red-300 text-sm">{error}</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Size (Modules)
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="20"
                        value={size}
                        onChange={(e) => setSize(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-center text-sm minimal-text mt-1">
                        {size} modules ({size * 20}px)
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Border (Margin)
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={border}
                        onChange={(e) => setBorder(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-center text-sm minimal-text mt-1">
                        {border} modules border
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={generateQR}
                    disabled={loading || (activeTab === 'text' && !text.trim()) || (activeTab === 'image' && !uploadedImage)}
                    className="minimal-button minimal-button-primary flex-1 disabled:opacity-50"
                    data-testid="generate-qr-button"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <QrCode className="h-4 w-4" />
                        Generate QR Code
                      </>
                    )}
                  </button>

                  <button
                    onClick={clearAll}
                    className="minimal-button minimal-button-secondary"
                    data-testid="clear-button"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Result Section */}
            <div className="minimal-card">
              <h2 className="minimal-h2 mb-6">
                Your QR Code
              </h2>

              {qrResult ? (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-center">
                    <img
                      src={qrResult}
                      alt="Generated QR Code"
                      className="max-w-full h-auto"
                      data-testid="qr-code-image"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={downloadQR}
                      className="minimal-button minimal-button-primary flex-1"
                      data-testid="download-button"
                    >
                      <Download className="h-4 w-4" />
                      Download QR
                    </button>

                    <button
                      onClick={copyToClipboard}
                      className="minimal-button minimal-button-secondary"
                      data-testid="copy-button"
                    >
                      <Copy className="h-4 w-4" />
                      Copy Image
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                    <QrCode className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Ready to Generate
                  </h3>
                  <p className="minimal-text text-sm">
                    Enter some text and click generate to create your QR code
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRGenerator
