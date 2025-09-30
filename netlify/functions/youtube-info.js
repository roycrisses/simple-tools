// Real YouTube Info Function using yt-dlp
const YTDlpWrap = require('yt-dlp-wrap').default;

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { url } = JSON.parse(event.body);
    
    if (!url) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'URL is required' }),
      };
    }

    // Basic YouTube URL validation
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    if (!youtubeRegex.test(url)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid YouTube URL' }),
      };
    }

    // Initialize yt-dlp
    const ytDlpWrap = new YTDlpWrap();
    
    try {
      // Get video info using yt-dlp
      const videoInfo = await ytDlpWrap.getVideoInfo(url);
      
      // Extract relevant information
      const result = {
        success: true,
        title: videoInfo.title || 'Unknown Title',
        duration: videoInfo.duration || 0,
        thumbnail: videoInfo.thumbnail || `https://img.youtube.com/vi/${videoInfo.id}/maxresdefault.jpg`,
        videoId: videoInfo.id,
        uploader: videoInfo.uploader || 'Unknown',
        view_count: videoInfo.view_count || 0,
        formats: []
      };

      // Process available formats with priority for ORIGINAL QUALITY
      if (videoInfo.formats && Array.isArray(videoInfo.formats)) {
        // Add BEST QUALITY options first (these will download original quality)
        result.formats.push({
          format_id: "best",
          ext: "mp4",
          quality: "🏆 ORIGINAL QUALITY (Best Available)",
          filesize: 0,
          vcodec: "best",
          acodec: "best",
          type: "video",
          priority: 1
        });
        
        result.formats.push({
          format_id: "bestvideo+bestaudio/best",
          ext: "mp4", 
          quality: "🎬 HIGHEST VIDEO + AUDIO",
          filesize: 0,
          vcodec: "best",
          acodec: "best",
          type: "video",
          priority: 2
        });

        // Filter and sort video formats by quality (HIGHEST FIRST)
        const videoFormats = videoInfo.formats
          .filter(format => format.vcodec && format.vcodec !== 'none' && format.height)
          .sort((a, b) => {
            // Sort by resolution first, then by fps, then by filesize
            if (b.height !== a.height) return (b.height || 0) - (a.height || 0);
            if (b.fps !== a.fps) return (b.fps || 0) - (a.fps || 0);
            return (b.filesize || 0) - (a.filesize || 0);
          })
          .slice(0, 8); // Top 8 video formats

        // Filter and sort audio formats by quality (HIGHEST FIRST)
        const audioFormats = videoInfo.formats
          .filter(format => format.acodec && format.acodec !== 'none' && (!format.vcodec || format.vcodec === 'none'))
          .sort((a, b) => (b.abr || 0) - (a.abr || 0))
          .slice(0, 5); // Top 5 audio formats

        // Add specific video formats with quality indicators
        videoFormats.forEach((format, index) => {
          const quality = format.height >= 2160 ? '4K UHD' :
                         format.height >= 1440 ? '1440p QHD' :
                         format.height >= 1080 ? '1080p FHD' :
                         format.height >= 720 ? '720p HD' :
                         format.height >= 480 ? '480p SD' :
                         format.height >= 360 ? '360p' :
                         format.height >= 240 ? '240p' : `${format.height}p`;
          
          const fps = format.fps ? ` ${format.fps}fps` : '';
          const codec = format.vcodec ? ` (${format.vcodec.split('.')[0].toUpperCase()})` : '';
          
          result.formats.push({
            format_id: format.format_id,
            ext: format.ext || 'mp4',
            quality: `📹 ${quality}${fps}${codec}`,
            filesize: format.filesize || 0,
            vcodec: format.vcodec,
            acodec: format.acodec,
            type: 'video',
            priority: index + 10
          });
        });

        // Add best audio option
        result.formats.push({
          format_id: "bestaudio",
          ext: "mp3",
          quality: "🎵 BEST AUDIO QUALITY",
          filesize: 0,
          vcodec: "none",
          acodec: "best",
          type: "audio",
          priority: 3
        });

        // Add specific audio formats
        audioFormats.forEach((format, index) => {
          result.formats.push({
            format_id: format.format_id,
            ext: format.ext || 'mp3',
            quality: `🎧 Audio Only (${format.abr || 'Unknown'}kbps)`,
            filesize: format.filesize || 0,
            vcodec: 'none',
            acodec: format.acodec,
            type: 'audio',
            priority: index + 20
          });
        });
        
        // Sort formats by priority (best quality first)
        result.formats.sort((a, b) => (a.priority || 999) - (b.priority || 999));
      }

      // If no formats found, add default high-quality ones
      if (result.formats.length === 0) {
        result.formats = [
          {
            format_id: "best",
            ext: "mp4",
            quality: "🏆 Best Quality Available",
            filesize: 0,
            vcodec: "best",
            acodec: "best",
            type: "video",
            priority: 1
          },
          {
            format_id: "bestvideo+bestaudio/best",
            ext: "mp4",
            quality: "🎬 Best Video + Audio Merge",
            filesize: 0,
            vcodec: "best",
            acodec: "best",
            type: "video",
            priority: 2
          },
          {
            format_id: "bestaudio",
            ext: "mp3",
            quality: "🎵 Best Audio Quality",
            filesize: 0,
            vcodec: "none",
            acodec: "best",
            type: "audio",
            priority: 3
          }
        ];
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result),
      };
      
    } catch (ytDlpError) {
      console.error('yt-dlp error:', ytDlpError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Failed to get video information. The video might be private, age-restricted, or unavailable.',
          details: ytDlpError.message 
        }),
      };
    }
    
  } catch (error) {
    console.error('General error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

// Helper function to format file size
function formatFileSize(bytes) {
  if (!bytes) return 'Unknown size';
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}
