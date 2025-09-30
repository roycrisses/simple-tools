import React, { useState } from 'react'
import { QrCode, Download, Copy, RotateCcw } from 'lucide-react'
import axios from 'axios'

const QRGenerator = () => {
  const [text, setText] = useState('')
  const [size, setSize] = useState(10)
  const [border, setBorder] = useState(4)
  const [qrResult, setQrResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateQR = async () => {
    if (!text.trim()) {
      setError('Please enter some text or URL')
      return
    }

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('text', text)
      formData.append('size', size.toString())
      formData.append('border', border.toString())

      const response = await axios.post('/api/qr-generate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.success) {
        setQrResult(response.data)
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate QR code')
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

  const clearAll = () => {
    setText('')
    setQrResult(null)
    setError('')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <QrCode className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            QR Code Generator
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Convert any text, URL, or message into a QR code instantly
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Enter Your Content
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Text or URL
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text, URL, or any message..."
                className="input-field h-32 resize-none"
                maxLength={1000}
              />
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {text.length}/1000 characters
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Size
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  className="input-field"
                >
                  <option value={5}>Small (5)</option>
                  <option value={10}>Medium (10)</option>
                  <option value={15}>Large (15)</option>
                  <option value={20}>Extra Large (20)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Border
                </label>
                <select
                  value={border}
                  onChange={(e) => setBorder(parseInt(e.target.value))}
                  className="input-field"
                >
                  <option value={1}>Thin (1)</option>
                  <option value={4}>Normal (4)</option>
                  <option value={8}>Thick (8)</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300">
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={generateQR}
                disabled={loading || !text.trim()}
                className="btn-primary flex-1 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <QrCode className="h-4 w-4" />
                    <span>Generate QR</span>
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

        {/* Result Section */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Generated QR Code
          </h2>
          
          {qrResult ? (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center">
                <img
                  src={qrResult.url}
                  alt="Generated QR Code"
                  className="max-w-full h-auto"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={downloadQR}
                  className="btn-primary flex-1 flex items-center justify-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
                
                <button
                  onClick={copyToClipboard}
                  className="btn-secondary flex items-center justify-center space-x-2"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy Text</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              <QrCode className="h-16 w-16 mb-4 opacity-50" />
              <p className="text-center">
                Enter some text and click "Generate QR" to create your QR code
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          💡 Tips for Better QR Codes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div>
            <strong>• Keep it simple:</strong> Shorter text creates cleaner QR codes
          </div>
          <div>
            <strong>• Test before use:</strong> Always scan your QR code to verify it works
          </div>
          <div>
            <strong>• Size matters:</strong> Larger sizes are easier to scan from distance
          </div>
          <div>
            <strong>• Add context:</strong> Include instructions near your QR code
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRGenerator
