import React, { useState } from 'react'
import { Download, Youtube, ExternalLink, RotateCcw } from 'lucide-react'
import SEOHead from '../components/SEOHead'

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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "YouTube Downloader",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "description": "Download YouTube videos in various formats and qualities. Fast analysis, multiple format options, and easy-to-use interface. Free YouTube video downloader tool.",
    "url": "https://simple-tools.netlify.app/youtube-downloader",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Multiple video formats",
      "HD quality downloads",
      "Fast video analysis",
      "Audio extraction",
      "Multiple quality options",
      "Free to use",
      "No registration required"
    ]
  }

  return (
    <>
      <SEOHead
        title="YouTube Downloader - Free Online Video Downloader"
        description="Download YouTube videos in various formats and qualities with ease. Fast analysis, multiple format options, HD quality, and audio extraction. Free YouTube video downloader."
        keywords="YouTube downloader, video downloader, YouTube video download, free YouTube downloader, YouTube MP4, YouTube MP3, video download, YouTube converter, online video downloader"
        canonical="/youtube-downloader"
        structuredData={structuredData}
      />
      <div className="max-w-6xl mx-auto p-4">
      {/* Modern Hero Section */}
      <div className="hero-modern mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="icon-container mx-auto mb-6">
            <Youtube className="h-8 w-8" />
          </div>
          <h1 className="heading-1 text-white mb-4">
            YouTube Downloader
          </h1>
          <p className="text-xl text-white/90 mb-6">
            Download YouTube videos in various formats and qualities with ease
          </p>
          <div className="glass-modern rounded-xl p-4 inline-block">
            <p className="text-white/80 text-sm">
              ✨ Multiple formats • HD quality • Fast analysis • Audio extraction
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Input Section */}
        <div className="modern-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="icon-container w-12 h-12">
              <Youtube className="h-6 w-6" />
            </div>
            <h2 className="heading-3 mb-0">
              Enter YouTube URL
            </h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                YouTube Video URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="input-modern"
                onKeyPress={(e) => e.key === 'Enter' && analyzeVideo()}
              />
              <div className="flex items-center gap-2 mt-2">
                <span className="text-blue-500">💡</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Paste any YouTube video URL here and press Enter
                </span>
              </div>
            </div>

            {error && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <span className="text-red-600 dark:text-red-400">⚠️</span>
                  <span className="text-red-700 dark:text-red-300 text-sm font-medium">{error}</span>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={analyzeVideo}
                disabled={loading || !url.trim()}
                className="btn-modern btn-modern-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="spinner-modern"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Youtube className="h-5 w-5" />
                    <span>Analyze Video</span>
                  </>
                )}
              </button>

              <button
                onClick={clearAll}
                className="btn-modern btn-modern-secondary"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Video Info Section */}
        {videoInfo && (
          <div className="modern-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="icon-container w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500">
                <Youtube className="h-6 w-6" />
              </div>
              <h2 className="heading-3 mb-0">
                Video Information
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Video Thumbnail */}
              <div className="lg:col-span-1">
                <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                  <img
                    src={videoInfo.thumbnail}
                    alt="Video thumbnail"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNDQgNzJMMTc2IDkwTDE0NCAxMDhWNzJaIiBmaWxsPSIjOUI5QjlCIi8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QjlCIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiPllvdVR1YmUgVmlkZW88L3RleHQ+Cjwvc3ZnPgo='
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>
              </div>
              
              {/* Video Details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {videoInfo.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <span className="text-blue-500">📺</span>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Channel</div>
                        <div className="font-medium text-gray-800 dark:text-gray-200">{videoInfo.channel}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <span className="text-green-500">👀</span>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Views</div>
                        <div className="font-medium text-gray-800 dark:text-gray-200">{videoInfo.views}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <span className="text-purple-500">⏱️</span>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Duration</div>
                        <div className="font-medium text-gray-800 dark:text-gray-200">{videoInfo.duration}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {videoInfo.description}
                  </p>
                </div>
                
                <div>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-modern btn-modern-secondary inline-flex"
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
          <div className="modern-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="icon-container w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500">
                <Download className="h-6 w-6" />
              </div>
              <h2 className="heading-3 mb-0">
                Download Options
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videoInfo.formats.map((format, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">
                          {format.quality.includes('Audio') ? '🎧' : '🎥'}
                        </span>
                        <div className="font-bold text-gray-900 dark:text-white text-lg">
                          {format.quality}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full text-xs font-medium">
                          {format.format}
                        </span>
                        <span className="ml-2">• {format.size}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadVideo(format)}
                      className="btn-modern btn-modern-primary ml-4"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="icon-container w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 flex-shrink-0">
                  <span className="text-white text-sm">⚠️</span>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Important Disclaimer</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 leading-relaxed">
                    This is a demo interface. Actual downloading requires server-side implementation and must comply with YouTube's Terms of Service. Only download videos you have permission to download.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  )
}

export default YouTubeDownloader
