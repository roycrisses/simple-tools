
import React, { useState } from 'react'
import { Download, Play, Music, RotateCcw, ExternalLink } from 'lucide-react'

const YouTubeDownloader = () => {
  const [url, setUrl] = useState('')
  const [videoInfo, setVideoInfo] = useState(null)
  const [selectedFormat, setSelectedFormat] = useState('')
  const [audioOnly, setAudioOnly] = useState(false)
  const [loading, setLoading] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState('')
  const [downloadResult, setDownloadResult] = useState(null)

  const getVideoInfo = async () => {
    if (!url.trim()) {
      setError('Please enter a YouTube URL')
      return
    }

    // Basic YouTube URL validation
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
    if (!youtubeRegex.test(url)) {
      setError('Please enter a valid YouTube URL')
      return
    }

    setLoading(true)
    setError('')
    setVideoInfo(null)
    setDownloadResult(null)

    try {
      // Call Netlify Function
      const response = await fetch('/.netlify/functions/youtube-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setVideoInfo(result)
        // Auto-select first format
        if (result.formats && result.formats.length > 0) {
          setSelectedFormat(result.formats[0].format_id)
        }
      } else {
        setError(result.error || 'Failed to get video information')
      }
    } catch (err) {
      console.error('Netlify function error:', err)
      setError('Failed to connect to server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const downloadVideo = async () => {
    setDownloading(true)
    setError('')

    try {
      // Call Netlify Function
      const response = await fetch('/.netlify/functions/youtube-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          url, 
          format_id: selectedFormat, 
          audio_only: audioOnly 
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setDownloadResult(result)
      } else {
        setError(result.error || 'Failed to download video')
      }
    } catch (err) {
      console.error('Netlify function error:', err)
      setError('Failed to connect to server. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  const downloadFile = () => {
    if (downloadResult) {
      if (downloadResult.data) {
        // Handle binary file download (if yt-dlp was available)
        try {
          const byteCharacters = atob(downloadResult.data)
          const byteNumbers = new Array(byteCharacters.length)
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i)
          }
          const byteArray = new Uint8Array(byteNumbers)
          const blob = new Blob([byteArray], { type: downloadResult.mimeType })
          
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = downloadResult.filename
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
        } catch (error) {
          console.error('Error downloading file:', error)
          setError('Failed to download file. Please try again.')
        }
      } else if (downloadResult.downloadUrl) {
        // Handle redirect-based download
        window.open(downloadResult.downloadUrl, '_blank')
      }
    }
  }

  const clearAll = () => {
    setUrl('')
    setVideoInfo(null)
    setSelectedFormat('')
    setAudioOnly(false)
    setError('')
    setDownloadResult(null)
  }

  const openAlternativeService = (serviceUrl) => {
    window.open(serviceUrl, '_blank')
  }
  
  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size'
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const formatDuration = (seconds) => {
    if (!seconds) return 'Unknown'
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Retro Window Header */}
      <div className="retro-window mb-8">
        <div className="retro-window-header">
          <div className="flex items-center space-x-3">
            <Download className="h-6 w-6" />
            <span className="text-lg font-bold">YOUTUBE DOWNLOADER v2.0</span>
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
              {'>> DOWNLOAD YOUTUBE VIDEOS AND AUDIO IN VARIOUS FORMATS <<'}
            </p>
          </div>
        </div>
      </div>

      {/* URL Input Section */}
      <div className="card p-6 mb-8">
        <div className="bg-blue-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
          <h2 className="text-xl font-mono">
            [INPUT] YOUTUBE URL
          </h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="input-field"
            />
          </div>

          {error && (
            <div className="retro-alert retro-alert-error font-mono font-bold">
              ERROR: {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={getVideoInfo}
              disabled={loading || !url.trim()}
              className="btn-primary flex-1 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
            >
              {loading ? (
                <>
                  <div className="retro-spinner"></div>
                  <span>LOADING...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>GET INFO</span>
                </>
              )}
            </button>

            <button
              onClick={clearAll}
              className="btn-secondary flex items-center justify-center space-x-2 font-mono"
            >
              <RotateCcw className="h-4 w-4" />
              <span>RESET</span>
            </button>
          </div>
        </div>
      </div>

      {/* Video Info Section */}
      {videoInfo && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Video Details */}
          <div className="card p-6">
            <div className="bg-green-500 text-black font-bold py-2 px-4 mb-4 border-b-4 border-black">
              <h3 className="text-lg font-mono">
                [INFO] VIDEO DATA
              </h3>
            </div>
            
            <div className="space-y-4">
              {videoInfo.thumbnail && (
                <div className="border-4 border-black">
                  <img
                    src={videoInfo.thumbnail}
                    alt="Video thumbnail"
                    className="w-full"
                  />
                </div>
              )}
              
              <div className="bg-gray-200 dark:bg-gray-600 p-3 border-4 border-black font-mono">
                <h4 className="font-bold text-black dark:text-white mb-2">
                  {videoInfo.title}
                </h4>
                <p className="text-sm text-black dark:text-white font-bold">
                  DURATION: {formatDuration(videoInfo.duration)}
                </p>
              </div>

              <div className="flex items-center space-x-3 bg-yellow-200 p-3 border-4 border-black">
                <input
                  type="checkbox"
                  id="audioOnly"
                  checked={audioOnly}
                  onChange={(e) => setAudioOnly(e.target.checked)}
                  className="retro-checkbox"
                />
                <label htmlFor="audioOnly" className="font-bold text-black flex items-center space-x-2 font-mono">
                  <Music className="h-4 w-4" />
                  <span>AUDIO ONLY (MP3)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Format Selection */}
          <div className="card p-6">
            <div className="bg-purple-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
              <h3 className="text-lg font-mono">
                [SELECT] FORMAT & QUALITY
              </h3>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-y-auto bg-gray-50 dark:bg-gray-800 p-4 border-4 border-black">
              {videoInfo.formats?.map((format) => (
                <label
                  key={format.format_id}
                  className={`retro-format-option ${selectedFormat === format.format_id ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="format"
                    value={format.format_id}
                    checked={selectedFormat === format.format_id}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="retro-radio mt-1 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-black dark:text-white font-mono truncate">
                        {format.quality} ({format.ext?.toUpperCase()})
                      </span>
                      {format.filesize && (
                        <span className="text-sm font-bold text-black dark:text-white font-mono ml-2 flex-shrink-0">
                          {formatFileSize(format.filesize)}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-mono text-black dark:text-white opacity-75">
                      {format.vcodec !== 'none' && `VIDEO: ${format.vcodec.toUpperCase()}`}
                      {format.vcodec !== 'none' && format.acodec !== 'none' && ' | '}
                      {format.acodec !== 'none' && `AUDIO: ${format.acodec.toUpperCase()}`}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={downloadVideo}
                disabled={downloading || !selectedFormat}
                className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
              >
                {downloading ? (
                  <>
                    <div className="retro-spinner"></div>
                    <span>DOWNLOADING...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>DOWNLOAD {audioOnly ? 'AUDIO' : 'VIDEO'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Result */}
      {downloadResult && (
        <div className="card p-6">
          <div className="bg-green-500 text-black font-bold py-2 px-4 mb-4 border-b-4 border-black">
            <h3 className="text-lg font-mono">
              [SUCCESS] DOWNLOAD OPTIONS
            </h3>
          </div>
          
          <div className="space-y-4">
            {/* Primary Download Button */}
            <div className="bg-green-200 p-4 border-4 border-black">
              <h4 className="font-bold font-mono text-black mb-3">
                [PRIMARY] DOWNLOAD METHOD
              </h4>
              <button
                onClick={downloadFile}
                className="btn-primary w-full font-mono mb-2"
              >
                <Download className="h-4 w-4 mr-2" />
                OPEN VIDEO IN NEW TAB
              </button>
              {downloadResult.message && (
                <div className="text-xs font-mono text-black bg-blue-100 p-2 border-2 border-black">
                  <strong>✅ SUCCESS:</strong> {downloadResult.message}
                </div>
              )}
            </div>

            {/* Instructions */}
            {downloadResult.instructions && (
              <div className="bg-blue-200 p-4 border-4 border-black">
                <h4 className="font-bold font-mono text-black mb-3">
                  [INFO] DOWNLOAD INSTRUCTIONS
                </h4>
                <div className="space-y-2 text-sm font-mono text-black">
                  <p>• {downloadResult.instructions.method1}</p>
                  <p>• {downloadResult.instructions.method2}</p>
                  <p>• {downloadResult.instructions.method3}</p>
                  {downloadResult.instructions.note && (
                    <p className="text-xs bg-yellow-100 p-2 border-2 border-black mt-2">
                      <strong>NOTE:</strong> {downloadResult.instructions.note}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Alternative Services */}
            {downloadResult.alternativeServices && (
              <div className="bg-purple-200 p-4 border-4 border-black">
                <h4 className="font-bold font-mono text-black mb-3">
                  [ALTERNATIVE] DOWNLOAD SERVICES
                </h4>
                <div className="space-y-2">
                  {downloadResult.alternativeServices.map((service, index) => (
                    <button
                      key={index}
                      onClick={() => openAlternativeService(service.url)}
                      className="btn-secondary w-full font-mono text-left flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold">{service.name}</div>
                        <div className="text-xs">{service.description}</div>
                      </div>
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="retro-alert retro-alert-warning mt-4">
            <div className="font-mono font-bold text-black space-y-2">
              <p>
                {'>> RESPECT COPYRIGHT LAWS AND YOUTUBE TOS'}
              </p>
              <p>
                {'>> FOR PERSONAL/EDUCATIONAL USE ONLY'}
              </p>
              <p>
                {'>> USE OFFICIAL YOUTUBE PREMIUM FOR OFFLINE VIEWING'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default YouTubeDownloader
