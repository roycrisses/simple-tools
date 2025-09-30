// Netlify Function for YouTube Info
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

    // Mock video info (in real implementation, you'd use yt-dlp or YouTube API)
    const mockVideoInfo = {
      success: true,
      title: `Video ${videoId} - Sample Title`,
      duration: 180,
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      videoId: videoId,
      formats: [
        {
          format_id: "22",
          ext: "mp4",
          quality: "720p HD",
          filesize: 50000000,
          vcodec: "avc1",
          acodec: "mp4a"
        },
        {
          format_id: "18",
          ext: "mp4", 
          quality: "360p",
          filesize: 25000000,
          vcodec: "avc1",
          acodec: "mp4a"
        },
        {
          format_id: "140",
          ext: "m4a",
          quality: "Audio Only (128kbps)",
          filesize: 15000000,
          vcodec: "none",
          acodec: "mp4a"
        }
      ]
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(mockVideoInfo),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to get video information' }),
    };
  }
};
