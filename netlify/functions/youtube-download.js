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

    // Helper function to generate download URL
    const generateDownloadUrl = (youtubeUrl, formatId, audioOnly) => {
      // For demo purposes, we'll redirect to the original YouTube video
      // In a real implementation, this would generate actual download links
      if (audioOnly || formatId === 'bestaudio') {
        return `https://www.youtube.com/watch?v=${videoId}&t=0s`;
      }
      return `https://www.youtube.com/watch?v=${videoId}&t=0s`;
    };

    // Generate download instructions and alternative methods
    const result = {
      success: true,
      message: 'Download link generated successfully',
      videoId: videoId,
      format_id: format_id,
      downloadMethod: 'redirect',
      downloadUrl: generateDownloadUrl(url, format_id, audio_only),
      instructions: {
        method1: 'Click the download button to open the video in a new tab',
        method2: 'Right-click the video and select "Save video as..."',
        method3: 'Use browser extensions like Video DownloadHelper',
        note: 'Direct server-side downloading requires yt-dlp binary installation'
      },
      alternativeServices: [
        {
          name: 'SaveFrom.net',
          url: `https://savefrom.net/#url=${encodeURIComponent(url)}`,
          description: 'Online YouTube downloader service'
        },
        {
          name: 'Y2Mate',
          url: `https://www.y2mate.com/youtube/${videoId}`,
          description: 'YouTube to MP4 & MP3 converter'
        }
      ]
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
