import React, { useState, useRef } from 'react'
import { FileText, Upload, Download, Scissors, Merge, RotateCcw } from 'lucide-react'

const PDFTools = () => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [activeTab, setActiveTab] = useState('merge') // 'merge', 'split', 'convert'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files)
    if (files.length > 0) {
      const pdfFiles = files.filter(file => file.type === 'application/pdf')
      if (pdfFiles.length !== files.length) {
        setError('Please select only PDF files')
        return
      }
      setSelectedFiles(pdfFiles)
      setError('')
      setResult(null)
    }
  }

  const clearAll = () => {
    setSelectedFiles([])
    setResult(null)
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const processFiles = () => {
    if (selectedFiles.length === 0) {
      setError('Please select PDF files first')
      return
    }

    setLoading(true)
    setError('')

    // Simulate processing (in a real app, you'd use PDF-lib or similar)
    setTimeout(() => {
      setError('PDF processing requires a backend server. This feature is currently disabled for the static version.')
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Retro Window Header */}
      <div className="retro-window mb-8">
        <div className="retro-window-header">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6" />
            <span className="text-lg font-bold">PDF TOOLS v1.0</span>
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
              {'>> MERGE, SPLIT, AND CONVERT PDF FILES <<'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="card p-6">
          <div className="bg-blue-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
            <h2 className="text-xl font-mono">
              [INPUT] PDF OPERATIONS
            </h2>
          </div>
          
          {/* Tab Selection */}
          <div className="grid grid-cols-3 mb-4 border-4 border-black">
            <button
              onClick={() => setActiveTab('merge')}
              className={`py-2 px-4 font-mono font-bold transition-colors ${
                activeTab === 'merge'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              MERGE
            </button>
            <button
              onClick={() => setActiveTab('split')}
              className={`py-2 px-4 font-mono font-bold transition-colors border-l-4 border-r-4 border-black ${
                activeTab === 'split'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              SPLIT
            </button>
            <button
              onClick={() => setActiveTab('convert')}
              className={`py-2 px-4 font-mono font-bold transition-colors ${
                activeTab === 'convert'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              CONVERT
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-black dark:text-white mb-2 font-mono">
                {activeTab === 'merge' ? 'SELECT MULTIPLE PDF FILES TO MERGE:' :
                 activeTab === 'split' ? 'SELECT PDF FILE TO SPLIT:' :
                 'SELECT PDF FILE TO CONVERT:'}
              </label>
              
              <div className="border-4 border-black bg-gray-100 dark:bg-gray-600 p-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf"
                  multiple={activeTab === 'merge'}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  id="pdfUpload"
                  data-testid="pdf-file-input"
                />
                
                <label
                  htmlFor="pdfUpload"
                  className="cursor-pointer flex flex-col items-center justify-center h-32 border-2 border-dashed border-black bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col items-center">
                    <Upload className="h-8 w-8 text-black mb-2" />
                    <p className="text-sm font-mono font-bold text-black">
                      CLICK TO UPLOAD PDF FILES
                    </p>
                    <p className="text-xs font-mono text-black mt-1">
                      {activeTab === 'merge' ? 'Multiple files allowed' : 'Single file only'}
                    </p>
                  </div>
                </label>
              </div>
              
              {selectedFiles.length > 0 && (
                <div className="mt-4 bg-blue-100 p-3 border-4 border-black">
                  <p className="font-mono font-bold text-black mb-2">
                    SELECTED FILES ({selectedFiles.length}):
                  </p>
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="text-sm font-mono text-black">
                      • {file.name} ({Math.round(file.size / 1024)} KB)
                    </div>
                  ))}
                </div>
              )}
            </div>

            {error && (
              <div className="retro-alert retro-alert-error font-mono font-bold">
                ERROR: {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={processFiles}
                disabled={loading || selectedFiles.length === 0}
                className="btn-primary flex-1 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
              >
                {loading ? (
                  <>
                    <div className="retro-spinner"></div>
                    <span>PROCESSING...</span>
                  </>
                ) : (
                  <>
                    {activeTab === 'merge' ? <Merge className="h-4 w-4" /> :
                     activeTab === 'split' ? <Scissors className="h-4 w-4" /> :
                     <Download className="h-4 w-4" />}
                    <span>
                      {activeTab === 'merge' ? 'MERGE PDFs' :
                       activeTab === 'split' ? 'SPLIT PDF' :
                       'CONVERT PDF'}
                    </span>
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

        {/* Info Section */}
        <div className="card p-6">
          <div className="bg-green-500 text-black font-bold py-2 px-4 mb-4 border-b-4 border-black">
            <h2 className="text-xl font-mono">
              [INFO] OPERATION DETAILS
            </h2>
          </div>
          
          <div className="space-y-4">
            {activeTab === 'merge' && (
              <div className="bg-yellow-200 p-4 border-4 border-black">
                <h3 className="font-bold font-mono text-black mb-2">MERGE PDFs:</h3>
                <ul className="text-sm font-mono text-black space-y-1">
                  <li>• COMBINE MULTIPLE PDF FILES</li>
                  <li>• MAINTAIN ORIGINAL QUALITY</li>
                  <li>• PRESERVE BOOKMARKS</li>
                  <li>• CUSTOM PAGE ORDER</li>
                </ul>
              </div>
            )}
            
            {activeTab === 'split' && (
              <div className="bg-blue-200 p-4 border-4 border-black">
                <h3 className="font-bold font-mono text-black mb-2">SPLIT PDF:</h3>
                <ul className="text-sm font-mono text-black space-y-1">
                  <li>• EXTRACT SPECIFIC PAGES</li>
                  <li>• SPLIT BY PAGE RANGES</li>
                  <li>• CREATE SEPARATE FILES</li>
                  <li>• BATCH PROCESSING</li>
                </ul>
              </div>
            )}
            
            {activeTab === 'convert' && (
              <div className="bg-green-200 p-4 border-4 border-black">
                <h3 className="font-bold font-mono text-black mb-2">CONVERT PDF:</h3>
                <ul className="text-sm font-mono text-black space-y-1">
                  <li>• PDF TO IMAGES (PNG/JPG)</li>
                  <li>• PDF TO TEXT</li>
                  <li>• PDF TO WORD</li>
                  <li>• HIGH QUALITY OUTPUT</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 card p-6">
        <div className="bg-purple-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
          <h3 className="text-lg font-mono">
            [TIPS] PDF BEST PRACTICES
          </h3>
        </div>
        <div className="retro-alert retro-alert-warning">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-black font-mono font-bold">
            <div>
              {'>> SMALLER FILES PROCESS FASTER'}
            </div>
            <div>
              {'>> CHECK FILE PERMISSIONS FIRST'}
            </div>
            <div>
              {'>> BACKUP ORIGINAL FILES'}
            </div>
            <div>
              {'>> USE DESCRIPTIVE FILENAMES'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PDFTools
