// Simple YouTube Download Function (fallback without yt-dlp)
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
    const { url, format_id, audio_only } = JSON.parse(event.body);
    
    if (!url || !format_id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'URL and format_id are required' }),
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

    // Extract video ID
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    }

    // Return information about yt-dlp requirement
    const result = {
      success: false,
      error: 'YouTube downloading requires yt-dlp installation',
      message: 'This is a simplified version. For real downloads, yt-dlp needs to be installed on the server.',
      videoId: videoId,
      format_id: format_id,
      instructions: {
        step1: 'Install yt-dlp in Netlify Functions',
        step2: 'Add yt-dlp-wrap to dependencies',
        step3: 'Use the full youtube-download.js function',
        note: 'Current version shows UI but cannot download actual files'
      },
      demo: true
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result),
    };
    
  } catch (error) {
    console.error('General download error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error during download' }),
    };
  }
};
