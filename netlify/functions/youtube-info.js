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

      // Process available formats
      if (videoInfo.formats && Array.isArray(videoInfo.formats)) {
        // Filter and sort formats
        const videoFormats = videoInfo.formats
          .filter(format => format.vcodec && format.vcodec !== 'none')
          .sort((a, b) => (b.height || 0) - (a.height || 0))
          .slice(0, 5); // Top 5 video formats

        const audioFormats = videoInfo.formats
          .filter(format => format.acodec && format.acodec !== 'none' && (!format.vcodec || format.vcodec === 'none'))
          .sort((a, b) => (b.abr || 0) - (a.abr || 0))
          .slice(0, 3); // Top 3 audio formats

        // Add video formats
        videoFormats.forEach(format => {
          result.formats.push({
            format_id: format.format_id,
            ext: format.ext || 'mp4',
            quality: `${format.height || 'Unknown'}p ${format.fps ? format.fps + 'fps' : ''}`.trim(),
            filesize: format.filesize || 0,
            vcodec: format.vcodec,
            acodec: format.acodec,
            type: 'video'
          });
        });

        // Add audio formats
        audioFormats.forEach(format => {
          result.formats.push({
            format_id: format.format_id,
            ext: format.ext || 'mp3',
            quality: `Audio Only (${format.abr || 'Unknown'}kbps)`,
            filesize: format.filesize || 0,
            vcodec: 'none',
            acodec: format.acodec,
            type: 'audio'
          });
        });
      }

      // If no formats found, add default ones
      if (result.formats.length === 0) {
        result.formats = [
          {
            format_id: "best",
            ext: "mp4",
            quality: "Best Quality",
            filesize: 0,
            vcodec: "unknown",
            acodec: "unknown",
            type: "video"
          },
          {
            format_id: "bestaudio",
            ext: "mp3",
            quality: "Best Audio",
            filesize: 0,
            vcodec: "none",
            acodec: "unknown",
            type: "audio"
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
