import React, { useState, useRef } from 'react'
import { QrCode, Download, Copy, RotateCcw, FileImage } from 'lucide-react'
import QRCodeLib from 'qrcode'
import SEOHead from '../components/SEOHead'

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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "QR Code Generator",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "description": "Generate high-quality QR codes instantly for text, URLs, images, and any content. Customizable size, border, and format options. Free, fast, and privacy-focused.",
    "url": "https://simple-tools.netlify.app/qr-generator",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Instant QR code generation",
      "Text and URL support",
      "Image upload and conversion",
      "Customizable size and border",
      "High-quality output",
      "Free download",
      "Privacy-focused processing"
    ]
  }

  return (
    <>
      <SEOHead
        title="QR Code Generator - Free Online QR Code Creator"
        description="Generate high-quality QR codes instantly for text, URLs, images, and any content. Customizable size, border, and format options. Free, fast, and privacy-focused QR code generator."
        keywords="QR code generator, QR code creator, free QR code, QR code maker, QR code online, QR code text, QR code URL, QR code image, QR code download, QR code custom"
        canonical="/qr-generator"
        structuredData={structuredData}
      />
      <div className="max-w-6xl mx-auto p-4">
      {/* Modern Hero Section */}
      <div className="hero-modern mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="icon-container mx-auto mb-6">
            <QrCode className="h-8 w-8" />
          </div>
          <h1 className="heading-1 text-white mb-4">
            QR Code Generator
          </h1>
          <p className="text-xl text-white/90 mb-6">
            Generate QR codes for text, URLs, images, or any content you need to share
          </p>
          <div className="glass-modern rounded-xl p-4 inline-block">
            <p className="text-white/80 text-sm">
              ✨ Instant generation • Multiple formats • High quality output • Free download
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="modern-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="icon-container w-12 h-12">
              <QrCode className="h-6 w-6" />
            </div>
            <h2 className="heading-3 mb-0">
              Enter Content
            </h2>
          </div>
              
          {/* Tab Selection */}
          <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('text')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                activeTab === 'text'
                  ? 'bg-white text-gray-900 shadow-md transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              📝 Text Input
            </button>
            <button
              onClick={() => setActiveTab('image')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                activeTab === 'image'
                  ? 'bg-white text-gray-900 shadow-md transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              🖼️ Image Upload
            </button>
          </div>
          
          <div className="space-y-6">
            {activeTab === 'text' ? (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Text or URL
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text, URL, or any message..."
                  className="input-modern h-32 resize-none"
                  maxLength={1000}
                  data-testid="qr-text-input"
                />
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm text-gray-500">
                    {text.length}/1000 characters
                  </div>
                  <div className="text-xs text-gray-400">
                    💡 Supports URLs, text, phone numbers, emails
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Upload Image
                </label>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mb-4">
                  <p className="text-sm text-blue-800">
                    💡 Images will be uploaded to a hosting service and the QR code will contain the image URL
                  </p>
                </div>
                
                <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:border-blue-400 hover:bg-blue-50 transition-all">
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
                    className="cursor-pointer flex flex-col items-center justify-center h-32"
                  >
                    {uploadedImage ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={uploadedImage}
                          alt="Uploaded"
                          className="max-h-20 max-w-20 object-contain mb-3 rounded-lg border border-gray-200"
                        />
                        <p className="text-sm font-semibold text-gray-700">
                          Click to change image
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <FileImage className="h-12 w-12 text-gray-400 mb-3" />
                        <p className="text-lg font-semibold text-gray-700 mb-1">
                          Click to upload image
                        </p>
                        <p className="text-sm text-gray-500">
                          JPG, PNG, GIF, WebP supported
                        </p>
                      </div>
                    )}
                  </label>
                </div>
                
                {uploadingToHost && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="spinner-modern"></div>
                      <span className="text-sm font-medium text-yellow-700">Uploading image to hosting service...</span>
                    </div>
                  </div>
                )}
                
                {uploadedImage && !qrResult && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span className="text-sm font-medium text-green-700">Image ready! Click Generate QR Code to proceed</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="text-red-600">⚠️</span>
                  <span className="text-red-700 text-sm font-medium">{error}</span>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span>⚙️</span> Customization Options
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Size: {size} modules ({size * 20}px)
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    value={size}
                    onChange={(e) => setSize(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Small</span>
                    <span>Large</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Border: {border} modules
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={border}
                    onChange={(e) => setBorder(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>No border</span>
                    <span>Thick border</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={generateQR}
                disabled={loading || (activeTab === 'text' && !text.trim()) || (activeTab === 'image' && !uploadedImage)}
                className="btn-modern btn-modern-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="generate-qr-button"
              >
                {loading ? (
                  <>
                    <div className="spinner-modern"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <QrCode className="h-5 w-5" />
                    <span>Generate QR Code</span>
                  </>
                )}
              </button>

              <button
                onClick={clearAll}
                className="btn-modern btn-modern-secondary"
                data-testid="clear-button"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div className="modern-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="icon-container w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500">
              <Download className="h-6 w-6" />
            </div>
            <h2 className="heading-3 mb-0">
              Your QR Code
            </h2>
          </div>

          {qrResult ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl border border-gray-200 flex justify-center shadow-inner">
                <img
                  src={qrResult}
                  alt="Generated QR Code"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                  data-testid="qr-code-image"
                />
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-600">✓</span>
                  <span className="font-semibold text-blue-800">QR Code Generated Successfully!</span>
                </div>
                <p className="text-sm text-blue-700">
                  Size: {size * 20}px × {size * 20}px • Border: {border} modules • Ready to download
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={downloadQR}
                  className="btn-modern btn-modern-primary flex-1"
                  data-testid="download-button"
                >
                  <Download className="h-5 w-5" />
                  <span>Download QR Code</span>
                </button>

                <button
                  onClick={copyToClipboard}
                  className="btn-modern btn-modern-secondary"
                  data-testid="copy-button"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy Text</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
              <div className="icon-container w-16 h-16 mb-4 bg-gradient-to-br from-gray-400 to-gray-500">
                <QrCode className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                Ready to Generate
              </h3>
              <p className="text-gray-600 text-center max-w-sm">
                Enter some text or upload an image, then click generate to create your QR code
              </p>
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  )
}

export default QRGenerator
