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
          // Upload image to hosting service and get URL
          const imageUrl = await uploadImageToHost(uploadedImage)
          dataToEncode = imageUrl
          filename = `qr-code-image-${Date.now()}.png`
          
          // Update text to show the URL that will be encoded
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
      
      // Generate QR code client-side
      const qrDataURL = await QRCodeLib.toDataURL(dataToEncode, {
        width: size * 20, // Convert size to pixels
        margin: border,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      
      setQrResult({
        success: true,
        url: qrDataURL,
        filename: filename
      })
    } catch (err) {
      setError(`Failed to generate QR code: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const downloadQR = () => {
    if (qrResult) {
      const link = document.createElement('a')
      link.href = qrResult.url
      link.download = qrResult.filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
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
        // Set a placeholder text to indicate image is ready
        setText('Image ready for QR conversion')
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImageToHost = async (imageDataUrl) => {
    try {
      // Convert data URL to blob
      const response = await fetch(imageDataUrl)
      const blob = await response.blob()
      
      // Create form data
      const formData = new FormData()
      formData.append('image', blob)
      
      // Upload to ImgBB using your API key
      const apiKey = '15e11b72ae8aba63233d22d2e90198f5'
      
      // Real ImgBB upload
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
                      <div className="retro-spinner"></div>
                      <span>UPLOADING IMAGE TO HOSTING SERVICE...</span>
                    </div>
                  </div>
                )}
                
                {uploadedImage && !qrResult && (
                  <div className="retro-alert retro-alert-info font-mono font-bold">
                    📷 IMAGE UPLOADED! CLICK "CONVERT TO QR" TO GENERATE QR CODE
                  </div>
                )}
                
                {uploadedImage && qrResult && (
                  <div className="retro-alert retro-alert-success font-mono font-bold">
                    ✅ IMAGE SUCCESSFULLY CONVERTED TO QR CODE!
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2 font-mono">
                  SIZE:
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  className="input-field font-mono font-bold"
                >
                  <option value={5}>SMALL (5)</option>
                  <option value={10}>MEDIUM (10)</option>
                  <option value={15}>LARGE (15)</option>
                  <option value={20}>EXTRA LARGE (20)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2 font-mono">
                  BORDER:
                </label>
                <select
                  value={border}
                  onChange={(e) => setBorder(parseInt(e.target.value))}
                  className="input-field font-mono font-bold"
                >
                  <option value={1}>THIN (1)</option>
                  <option value={4}>NORMAL (4)</option>
                  <option value={8}>THICK (8)</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="retro-alert retro-alert-error font-mono font-bold">
                ERROR: {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={generateQR}
                disabled={loading || (activeTab === 'text' && !text.trim()) || (activeTab === 'image' && !uploadedImage)}
                className="btn-primary flex-1 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
              >
                {loading || uploadingToHost ? (
                  <>
                    <div className="retro-spinner"></div>
                    <span>{activeTab === 'image' ? (uploadingToHost ? 'UPLOADING...' : 'GENERATING...') : 'GENERATING...'}</span>
                  </>
                ) : (
                  <>
                    <QrCode className="h-4 w-4" />
                    <span>{activeTab === 'image' ? 'CONVERT TO QR' : 'GENERATE QR'}</span>
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

        {/* Result Section */}
        <div className="card p-6">
          <div className="bg-green-500 text-black font-bold py-2 px-4 mb-4 border-b-4 border-black">
            <h2 className="text-xl font-mono">
              [OUTPUT] GENERATED QR CODE
            </h2>
          </div>
          
          {qrResult ? (
            <div className="space-y-4">
              <div className="bg-white p-4 border-4 border-black flex items-center justify-center" style={{boxShadow: '4px 4px 0px #000, 8px 8px 0px rgba(0,0,0,0.3)'}}>
                <img
                  src={qrResult.url}
                  alt="Generated QR Code"
                  className="max-w-full h-auto"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={downloadQR}
                  className="btn-primary flex-1 flex items-center justify-center space-x-2 font-mono"
                >
                  <Download className="h-4 w-4" />
                  <span>DOWNLOAD</span>
                </button>
                
                <button
                  onClick={copyToClipboard}
                  className="btn-secondary flex items-center justify-center space-x-2 font-mono"
                >
                  <Copy className="h-4 w-4" />
                  <span>COPY TEXT</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-200 dark:bg-gray-600 border-4 border-black">
              <QrCode className="h-16 w-16 mb-4 text-black dark:text-white" />
              <p className="text-center font-mono font-bold text-black dark:text-white">
                ENTER SOME TEXT AND CLICK "GENERATE QR" TO CREATE YOUR QR CODE
              </p>
            </div>
          )}
        </div>
      </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRGenerator
