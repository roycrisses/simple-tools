
import React, { useState } from 'react'
import { Download, Play, Music, RotateCcw, ExternalLink } from 'lucide-react'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../config/firebase'

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
      // Call Firebase Function
      const getYouTubeInfo = httpsCallable(functions, 'getYouTubeInfo')
      const result = await getYouTubeInfo({ url })
      
      if (result.data.success) {
        setVideoInfo(result.data)
        // Auto-select first format
        if (result.data.formats && result.data.formats.length > 0) {
          setSelectedFormat(result.data.formats[0].format_id)
        }
      }
    } catch (err) {
      console.error('Firebase function error:', err)
      setError('Failed to get video information. Make sure Firebase is configured.')
    } finally {
      setLoading(false)
    }
  }

  const downloadVideo = async () => {
    setDownloading(true)
    setError('')

    try {
      // Call Firebase Function
      const downloadYouTube = httpsCallable(functions, 'downloadYouTube')
      const result = await downloadYouTube({ 
        url, 
        format_id: selectedFormat, 
        audio_only: audioOnly 
      })
      
      if (result.data.success) {
        setDownloadResult(result.data)
      }
    } catch (err) {
      console.error('Firebase function error:', err)
      setError('Failed to download video. Make sure Firebase is configured.')
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
                  className="retro-radio"
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
            
            <div className="space-y-2 max-h-64 overflow-y-auto bg-gray-50 dark:bg-gray-800 p-2 border-4 border-black">
              {videoInfo.formats?.map((format) => (
                <label
                  key={format.format_id}
                  className={`retro-format-option ${
                    selectedFormat === format.format_id ? 'selected' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="format"
                    value={format.format_id}
                    checked={selectedFormat === format.format_id}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="retro-radio mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-black dark:text-white font-mono">
                        {format.quality} ({format.ext?.toUpperCase()})
                      </span>
                      {format.filesize && (
                        <span className="text-sm font-bold text-black dark:text-white font-mono">
                          {formatFileSize(format.filesize)}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-mono text-black dark:text-white">
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
              [SUCCESS] DOWNLOAD READY
            </h3>
          </div>
          
          <div className="retro-alert retro-alert-success flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 border-4 border-black flex items-center justify-center">
                <Download className="h-6 w-6 text-black" />
              </div>
              <div>
                <p className="font-bold text-black font-mono text-lg">
                  {audioOnly ? 'AUDIO' : 'VIDEO'} FILE READY!
                </p>
                <p className="text-sm font-mono text-black">
                  {downloadResult.filename}
                </p>
              </div>
            </div>
            
            <button
              onClick={downloadFile}
              className="btn-primary flex items-center space-x-2 font-mono"
            >
              <Download className="h-4 w-4" />
              <span>DOWNLOAD</span>
            </button>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-8 card p-6">
        <div className="bg-red-500 text-white font-bold py-2 px-4 mb-4 border-b-4 border-black">
          <h3 className="text-lg font-mono">
            [WARNING] IMPORTANT NOTICE
          </h3>
        </div>
        <div className="retro-alert retro-alert-warning">
          <div className="font-mono font-bold text-black space-y-2">
            <p>
              {'>> RESPECT COPYRIGHT LAWS AND YOUTUBE TOS'}
            </p>
            <p>
              {'>> DOWNLOAD ONLY AUTHORIZED CONTENT'}
            </p>
            <p>
              {'>> FOR PERSONAL/EDUCATIONAL USE ONLY'}
            </p>
            <p>
              {'>> FILES AUTO-DELETED AFTER DOWNLOAD'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YouTubeDownloader
