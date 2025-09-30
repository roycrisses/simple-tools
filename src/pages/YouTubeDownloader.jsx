import React, { useState } from 'react'
import { Download, Play, Music, RotateCcw, ExternalLink } from 'lucide-react'
import axios from 'axios'

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
      const formData = new FormData()
      formData.append('url', url)

      const response = await axios.post('/api/youtube-info', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.success) {
        setVideoInfo(response.data)
        // Auto-select first format
        if (response.data.formats && response.data.formats.length > 0) {
          setSelectedFormat(response.data.formats[0].format_id)
        }
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to get video information')
    } finally {
      setLoading(false)
    }
  }

  const downloadVideo = async () => {
    if (!videoInfo || !selectedFormat) {
      setError('Please select a format first')
      return
    }

    setDownloading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('url', url)
      formData.append('format_id', selectedFormat)
      formData.append('audio_only', audioOnly.toString())

      const response = await axios.post('/api/youtube-download', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.success) {
        setDownloadResult(response.data)
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to download video')
    } finally {
      setDownloading(false)
    }
  }

  const downloadFile = () => {
    if (downloadResult) {
      const link = document.createElement('a')
      link.href = downloadResult.url
      link.download = downloadResult.filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
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

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown'
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Download className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            YouTube Downloader
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Download YouTube videos and audio in various formats and qualities
        </p>
      </div>

      {/* URL Input Section */}
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Enter YouTube URL
        </h2>
        
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
            <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={getVideoInfo}
              disabled={loading || !url.trim()}
              className="btn-primary flex-1 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Getting Info...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Get Video Info</span>
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

      {/* Video Info Section */}
      {videoInfo && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Video Details */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Video Information
            </h3>
            
            <div className="space-y-4">
              {videoInfo.thumbnail && (
                <img
                  src={videoInfo.thumbnail}
                  alt="Video thumbnail"
                  className="w-full rounded-lg"
                />
              )}
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  {videoInfo.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Duration: {formatDuration(videoInfo.duration)}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="audioOnly"
                  checked={audioOnly}
                  onChange={(e) => setAudioOnly(e.target.checked)}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="audioOnly" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                  <Music className="h-4 w-4" />
                  <span>Audio only (MP3)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Format Selection */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Select Format & Quality
            </h3>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {videoInfo.formats?.map((format) => (
                <label
                  key={format.format_id}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                    selectedFormat === format.format_id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="format"
                    value={format.format_id}
                    checked={selectedFormat === format.format_id}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {format.quality} ({format.ext?.toUpperCase()})
                      </span>
                      {format.filesize && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {formatFileSize(format.filesize)}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {format.vcodec !== 'none' && `Video: ${format.vcodec}`}
                      {format.vcodec !== 'none' && format.acodec !== 'none' && ' | '}
                      {format.acodec !== 'none' && `Audio: ${format.acodec}`}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-4">
              <button
                onClick={downloadVideo}
                disabled={downloading || !selectedFormat}
                className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Downloading...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Download {audioOnly ? 'Audio' : 'Video'}</span>
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Download Ready
          </h3>
          
          <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                <Download className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">
                  Your {audioOnly ? 'audio' : 'video'} is ready!
                </p>
                <p className="text-sm text-green-600 dark:text-green-300">
                  {downloadResult.filename}
                </p>
              </div>
            </div>
            
            <button
              onClick={downloadFile}
              className="btn-primary flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download File</span>
            </button>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-8 card p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700">
        <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
          ⚠️ Important Notice
        </h3>
        <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-2">
          <p>
            • Please respect copyright laws and YouTube's Terms of Service
          </p>
          <p>
            • Only download content you have permission to download
          </p>
          <p>
            • This tool is for personal use and educational purposes only
          </p>
          <p>
            • Downloaded files are temporarily stored and automatically deleted
          </p>
        </div>
      </div>
    </div>
  )
}

export default YouTubeDownloader
