import React, { useState } from 'react'
import { Download, Youtube, ExternalLink, RotateCcw } from 'lucide-react'

const YouTubeDownloader = () => {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [videoInfo, setVideoInfo] = useState(null)

  const validateYouTubeUrl = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)[\w-]+/
    return regex.test(url)
  }

  const extractVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const analyzeVideo = async () => {
    if (!url.trim()) {
      setError('Please enter a YouTube URL')
      return
    }

    if (!validateYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL')
      return
    }

    setLoading(true)
    setError('')
    setVideoInfo(null)

    try {
      const videoId = extractVideoId(url)
      if (!videoId) {
        throw new Error('Could not extract video ID')
      }

      // Simulate video info (in a real app, you'd call an API)
      setTimeout(() => {
        setVideoInfo({
          id: videoId,
          title: 'Sample Video Title',
          thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          duration: '5:30',
          views: '1.2M views',
          channel: 'Sample Channel',
          description: 'This is a sample video description...',
          formats: [
            { quality: '1080p', format: 'MP4', size: '45.2 MB' },
            { quality: '720p', format: 'MP4', size: '28.1 MB' },
            { quality: '480p', format: 'MP4', size: '18.5 MB' },
            { quality: 'Audio Only', format: 'MP3', size: '4.2 MB' }
          ]
        })
        setLoading(false)
      }, 2000)
    } catch (err) {
      setError('Failed to analyze video. Please check the URL and try again.')
      setLoading(false)
    }
  }

  const downloadVideo = (format) => {
    // In a real implementation, this would trigger the actual download
    alert(`Download would start for ${format.quality} ${format.format} (${format.size})`)
  }

  const clearAll = () => {
    setUrl('')
    setVideoInfo(null)
    setError('')
  }

  return (
    <div className="min-h-screen">
      {/* Minimal Header */}
      <div className="minimal-hero">
        <div className="minimal-container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <Youtube className="h-6 w-6 text-white" />
              </div>
              <h1 className="minimal-h1 mb-0">
                YouTube Downloader
              </h1>
            </div>
            
            <p className="minimal-text text-lg">
              Download YouTube videos in various formats and qualities.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="minimal-container">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Input Section */}
            <div className="minimal-card">
              <h2 className="minimal-h2 mb-6">
                Enter YouTube URL
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    YouTube Video URL
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="minimal-input"
                    onKeyPress={(e) => e.key === 'Enter' && analyzeVideo()}
                  />
                  <div className="minimal-text text-sm mt-1">
                    💡 Paste any YouTube video URL here
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <span className="text-red-700 dark:text-red-300 text-sm">{error}</span>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={analyzeVideo}
                    disabled={loading || !url.trim()}
                    className="minimal-button minimal-button-primary flex-1 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Youtube className="h-4 w-4" />
                        Analyze Video
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
            </div>

            {/* Video Info Section */}
            {videoInfo && (
              <div className="minimal-card">
                <h2 className="minimal-h2 mb-6">
                  Video Information
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Video Thumbnail */}
                  <div className="lg:col-span-1">
                    <img
                      src={videoInfo.thumbnail}
                      alt="Video thumbnail"
                      className="w-full rounded-lg shadow-sm"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNDQgNzJMMTc2IDkwTDE0NCAxMDhWNzJaIiBmaWxsPSIjOUI5QjlCIi8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QjlCIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiPllvdVR1YmUgVmlkZW88L3RleHQ+Cjwvc3ZnPgo='
                      }}
                    />
                  </div>
                  
                  {/* Video Details */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {videoInfo.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm minimal-text">
                        <span>📺 {videoInfo.channel}</span>
                        <span>👀 {videoInfo.views}</span>
                        <span>⏱️ {videoInfo.duration}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="minimal-text text-sm">
                        {videoInfo.description}
                      </p>
                    </div>
                    
                    <div>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>View on YouTube</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Download Options */}
            {videoInfo && (
              <div className="minimal-card">
                <h2 className="minimal-h2 mb-6">
                  Download Options
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {videoInfo.formats.map((format, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {format.quality}
                          </div>
                          <div className="text-sm minimal-text">
                            {format.format} • {format.size}
                          </div>
                        </div>
                        <button
                          onClick={() => downloadVideo(format)}
                          className="minimal-button minimal-button-primary"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <div className="text-yellow-600 dark:text-yellow-400 mt-0.5">⚠️</div>
                    <div className="text-sm text-yellow-700 dark:text-yellow-300">
                      <strong>Disclaimer:</strong> This is a demo interface. Actual downloading requires server-side implementation and must comply with YouTube's Terms of Service. Only download videos you have permission to download.
                    </div>
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

export default YouTubeDownloader
