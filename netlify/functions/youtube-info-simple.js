// Simple YouTube Info Function (fallback without yt-dlp)
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

    // Extract video ID from URL
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    }

    // Use YouTube oEmbed API for basic info (no API key required)
    try {
      const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
      const response = await fetch(oembedUrl);
      const oembedData = await response.json();
      
      const result = {
        success: true,
        title: oembedData.title || `Video ${videoId}`,
        duration: 0, // oEmbed doesn't provide duration
        thumbnail: oembedData.thumbnail_url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        videoId: videoId,
        uploader: oembedData.author_name || 'Unknown',
        view_count: 0,
        formats: [
          {
            format_id: "best",
            ext: "mp4",
            quality: "🏆 ORIGINAL QUALITY (Best Available)",
            filesize: 0,
            vcodec: "best",
            acodec: "best",
            type: "video",
            priority: 1
          },
          {
            format_id: "bestvideo+bestaudio/best",
            ext: "mp4", 
            quality: "🎬 HIGHEST VIDEO + AUDIO",
            filesize: 0,
            vcodec: "best",
            acodec: "best",
            type: "video",
            priority: 2
          },
          {
            format_id: "bestaudio",
            ext: "mp3",
            quality: "🎵 BEST AUDIO QUALITY",
            filesize: 0,
            vcodec: "none",
            acodec: "best",
            type: "audio",
            priority: 3
          },
          {
            format_id: "22",
            ext: "mp4",
            quality: "📹 720p HD",
            filesize: 0,
            vcodec: "avc1",
            acodec: "mp4a",
            type: "video",
            priority: 10
          },
          {
            format_id: "18",
            ext: "mp4",
            quality: "📹 360p SD",
            filesize: 0,
            vcodec: "avc1",
            acodec: "mp4a",
            type: "video",
            priority: 11
          }
        ]
      };

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result),
      };
      
    } catch (fetchError) {
      console.error('oEmbed fetch error:', fetchError);
      
      // Fallback with basic info
      const result = {
        success: true,
        title: `YouTube Video ${videoId}`,
        duration: 0,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        videoId: videoId,
        uploader: 'Unknown',
        view_count: 0,
        formats: [
          {
            format_id: "best",
            ext: "mp4",
            quality: "🏆 ORIGINAL QUALITY (Best Available)",
            filesize: 0,
            vcodec: "best",
            acodec: "best",
            type: "video",
            priority: 1
          },
          {
            format_id: "bestaudio",
            ext: "mp3",
            quality: "🎵 BEST AUDIO QUALITY",
            filesize: 0,
            vcodec: "none",
            acodec: "best",
            type: "audio",
            priority: 3
          }
        ]
      };

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result),
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
