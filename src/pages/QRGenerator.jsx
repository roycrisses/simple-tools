import React, { useState, useRef } from 'react'
import { QrCode, Download, Copy, RotateCcw, Upload, FileImage } from 'lucide-react'
import QRCodeLib from 'qrcode'

const QRGenerator = () => {
  const [text, setText] = useState('')
  const [size, setSize] = useState(10)
  const [border, setBorder] = useState(4)
  const [qrResult, setQrResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploadedImage, setUploadedImage] = useState(null)
  const [processingImage, setProcessingImage] = useState(false)
  const [uploadingToHost, setUploadingToHost] = useState(false)
  const [activeTab, setActiveTab] = useState('text') // 'text' or 'image'
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
    <div className="max-w-4xl mx-auto p-4">
      {/* Page Title for Accessibility */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          QR Code Generator
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Convert text, URLs, or images into QR codes instantly
        </p>
      </div>

      {/* Retro Window Header */}
      <div className="retro-window mb-8">
        <div className="retro-window-header">
          <div className="flex items-center space-x-3">
            <QrCode className="h-6 w-6" />
            <span className="text-lg font-bold">QR CODE GENERATOR v1.0</span>
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
              {'>> CONVERT TEXT, URLS, OR IMAGES INTO QR CODES INSTANTLY <<'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="card p-6">
          <div className="bg-blue-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
            <h2 className="text-xl font-mono">
              [INPUT] ENTER YOUR CONTENT
            </h2>
          </div>
          
          {/* Tab Selection */}
          <div className="flex mb-4 border-4 border-black">
            <button
              onClick={() => setActiveTab('text')}
              className={`flex-1 py-2 px-4 font-mono font-bold transition-colors ${
                activeTab === 'text'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              TEXT INPUT
            </button>
            <button
              onClick={() => setActiveTab('image')}
              className={`flex-1 py-2 px-4 font-mono font-bold transition-colors border-l-4 border-black ${
                activeTab === 'image'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              IMAGE UPLOAD
            </button>
          </div>
          
          <div className="space-y-4">
            {activeTab === 'text' ? (
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2 font-mono">
                  TEXT OR URL:
                </label>
                <textarea
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="ENTER TEXT, URL, OR ANY MESSAGE..."
                  className="input-field h-32 resize-none font-mono"
                  maxLength={1000}
                  data-testid="qr-text-input"
                />
                <div className="text-sm text-black dark:text-white mt-1 font-mono font-bold">
                  {text.length}/1000 CHARACTERS {text.length > 500 ? '💪 LONG TEXT!' : text.length > 100 ? '📄 GOOD SIZE' : text.length > 0 ? '📝 SHORT & SWEET' : ''}
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2 font-mono">
                  UPLOAD IMAGE TO CONVERT TO QR:
                </label>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-mono">
                  📤 NOTE: Images will be uploaded to hosting service and QR will contain the image URL.
                </div>
                
                <div className="border-4 border-black bg-gray-100 dark:bg-gray-600 p-4">
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
                    className="cursor-pointer flex flex-col items-center justify-center h-32 border-2 border-dashed border-black bg-white hover:bg-gray-50 transition-colors"
                  >
                    {uploadedImage ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={uploadedImage}
                          alt="Uploaded"
                          className="max-h-20 max-w-20 object-contain mb-2"
                        />
                        <p className="text-sm font-mono font-bold text-black">
                          CLICK TO CHANGE IMAGE
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <FileImage className="h-8 w-8 text-black mb-2" />
                        <p className="text-sm font-mono font-bold text-black">
                          CLICK TO UPLOAD IMAGE
                        </p>
                        <p className="text-xs font-mono text-black mt-1">
                          JPG, PNG, GIF, etc.
                        </p>
                      </div>
                    )}
                  </label>
                </div>
                
                {uploadingToHost && (
                  <div className="retro-alert retro-alert-warning font-mono font-bold">
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

      {/* Tips Section */}
      <div className="mt-8 card p-6">
        <div className="bg-purple-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
          <h3 className="text-lg font-mono">
            [TIPS] BETTER QR CODES
          </h3>
        </div>
        <div className="retro-alert retro-alert-warning">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-black font-mono font-bold">
            <div>
              {'>> KEEP IT SIMPLE: SHORTER TEXT = CLEANER CODES'}
            </div>
            <div>
              {'>> TEST BEFORE USE: ALWAYS SCAN TO VERIFY'}
            </div>
            <div>
              {'>> SIZE MATTERS: LARGER = EASIER TO SCAN'}
            </div>
            <div>
              {'>> UPLOAD IMAGES: CREATES URL FOR QR 📷'}
            </div>
            <div>
              {'>> FUN FACT: QR = QUICK RESPONSE! ⚡'}
            </div>
            <div>
              {'>> CAN STORE 4,296 CHARACTERS MAX! 📊'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRGenerator
