import React, { useState, useRef } from 'react'
import { FileText, Upload, Download, RotateCcw, Scissors, Merge } from 'lucide-react'

const PDFTools = () => {
  const [activeTab, setActiveTab] = useState('merge')
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files)
    
    // Validate PDF files
    const pdfFiles = selectedFiles.filter(file => file.type === 'application/pdf')
    
    if (pdfFiles.length !== selectedFiles.length) {
      setError('Please select only PDF files')
      return
    }
    
    setFiles(pdfFiles)
    setError('')
    setResult(null)
  }

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const moveFile = (fromIndex, toIndex) => {
    const newFiles = [...files]
    const [removed] = newFiles.splice(fromIndex, 1)
    newFiles.splice(toIndex, 0, removed)
    setFiles(newFiles)
  }

  const processPDFs = async () => {
    if (files.length === 0) {
      setError('Please select PDF files first')
      return
    }

    if (activeTab === 'merge' && files.length < 2) {
      setError('Please select at least 2 PDF files to merge')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Simulate PDF processing
      setTimeout(() => {
        const operation = activeTab === 'merge' ? 'merged' : 'split'
        setResult({
          operation,
          filename: `${operation}-document-${Date.now()}.pdf`,
          size: '2.4 MB',
          pages: activeTab === 'merge' ? files.length * 5 : 10
        })
        setLoading(false)
      }, 2000)
    } catch (err) {
      setError('Failed to process PDF files. Please try again.')
      setLoading(false)
    }
  }

  const downloadResult = () => {
    if (result) {
      // In a real implementation, this would download the processed PDF
      alert(`Download would start for ${result.filename}`)
    }
  }

  const clearAll = () => {
    setFiles([])
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
    <div className="min-h-screen">
      {/* Minimal Header */}
      <div className="minimal-hero">
        <div className="minimal-container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h1 className="minimal-h1 mb-0">
                PDF Tools
              </h1>
            </div>
            
            <p className="minimal-text text-lg">
              Merge, split, and manipulate PDF files with ease.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="minimal-container">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Tab Selection */}
            <div className="minimal-card">
              <div className="flex mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('merge')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                    activeTab === 'merge'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Merge className="h-4 w-4 inline mr-2" />
                  Merge PDFs
                </button>
                <button
                  onClick={() => setActiveTab('split')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                    activeTab === 'split'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Scissors className="h-4 w-4 inline mr-2" />
                  Split PDF
                </button>
              </div>

              {/* Instructions */}
              <div className="mb-6">
                {activeTab === 'merge' ? (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Merge PDFs</h3>
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      Select multiple PDF files to combine them into a single document. You can reorder files by dragging them.
                    </p>
                  </div>
                ) : (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Split PDF</h3>
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      Select a PDF file to split it into separate pages or page ranges.
                    </p>
                  </div>
                )}
              </div>

              {/* File Upload */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select PDF Files
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept=".pdf,application/pdf"
                      multiple={activeTab === 'merge'}
                      className="hidden"
                      id="pdfUpload"
                    />
                    
                    <label
                      htmlFor="pdfUpload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Upload className="h-12 w-12 text-gray-400" />
                      <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                        Click to upload PDF files
                      </span>
                      <span className="text-sm minimal-text">
                        {activeTab === 'merge' ? 'Select multiple PDF files' : 'Select one PDF file'}
                      </span>
                    </label>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <span className="text-red-700 dark:text-red-300 text-sm">{error}</span>
                  </div>
                )}
              </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="minimal-card">
                <h2 className="minimal-h2 mb-6">
                  Selected Files ({files.length})
                </h2>
                
                <div className="space-y-3">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-red-500" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {file.name}
                          </div>
                          <div className="text-sm minimal-text">
                            {formatFileSize(file.size)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {activeTab === 'merge' && files.length > 1 && (
                          <>
                            {index > 0 && (
                              <button
                                onClick={() => moveFile(index, index - 1)}
                                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                                title="Move up"
                              >
                                ↑
                              </button>
                            )}
                            {index < files.length - 1 && (
                              <button
                                onClick={() => moveFile(index, index + 1)}
                                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                                title="Move down"
                              >
                                ↓
                              </button>
                            )}
                          </>
                        )}
                        <button
                          onClick={() => removeFile(index)}
                          className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 rounded"
                          title="Remove file"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={processPDFs}
                    disabled={loading}
                    className="minimal-button minimal-button-primary flex-1 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        {activeTab === 'merge' ? <Merge className="h-4 w-4" /> : <Scissors className="h-4 w-4" />}
                        {activeTab === 'merge' ? 'Merge PDFs' : 'Split PDF'}
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
            )}

            {/* Result Section */}
            {result && (
              <div className="minimal-card">
                <h2 className="minimal-h2 mb-6">
                  Processing Complete
                </h2>
                
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-green-600" />
                      <div>
                        <div className="font-semibold text-green-900 dark:text-green-100">
                          {result.filename}
                        </div>
                        <div className="text-sm text-green-700 dark:text-green-300">
                          {result.size} • {result.pages} pages
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={downloadResult}
                      className="minimal-button minimal-button-primary"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="text-sm text-yellow-700 dark:text-yellow-300">
                    <strong>Note:</strong> This is a demo interface. Actual PDF processing requires server-side implementation with PDF manipulation libraries.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PDFTools
