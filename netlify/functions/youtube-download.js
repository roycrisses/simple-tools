// Netlify Function for YouTube Download
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

    // Extract video ID
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    }

    // In a real implementation, you would:
    // 1. Use yt-dlp to download the video
    // 2. Store it temporarily
    // 3. Return a download URL
    
    // For now, return a demo response
    const mockDownloadResult = {
      success: true,
      filename: `${videoId}_${format_id}.${audio_only ? 'mp3' : 'mp4'}`,
      message: "This is a demo response. To enable real downloads, you need to implement yt-dlp in the Netlify function.",
      demo: true,
      note: "Real implementation would require yt-dlp binary and temporary file storage"
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(mockDownloadResult),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to download video' }),
    };
  }
};
