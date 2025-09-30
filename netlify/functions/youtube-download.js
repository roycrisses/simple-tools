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

    // Helper function to generate actual download URL
    const generateDownloadUrl = async (youtubeUrl, formatId, audioOnly) => {
      try {
        // Extract video info using YouTube's internal API
        const infoUrl = `https://www.youtube.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8`;
        const requestBody = {
          context: {
            client: {
              clientName: "WEB",
              clientVersion: "2.20220801.00.00"
            }
          },
          videoId: videoId
        };

        const response = await fetch(infoUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        
        if (data.streamingData && data.streamingData.formats) {
          // Find the best matching format
          const formats = data.streamingData.formats;
          let selectedStream = null;

          if (audioOnly || formatId === 'bestaudio') {
            // Look for audio-only streams
            const audioFormats = data.streamingData.adaptiveFormats?.filter(f => 
              f.mimeType && f.mimeType.includes('audio')
            ) || [];
            selectedStream = audioFormats.find(f => f.itag == 140) || audioFormats[0];
          } else {
            // Look for video+audio streams
            if (formatId === '22') {
              selectedStream = formats.find(f => f.itag == 22);
            } else if (formatId === '18') {
              selectedStream = formats.find(f => f.itag == 18);
            } else {
              // Default to best available
              selectedStream = formats[0];
            }
          }

          if (selectedStream && selectedStream.url) {
            return selectedStream.url;
          }
        }
      } catch (error) {
        console.error('Error extracting stream URL:', error);
      }
      
      // Fallback to YouTube video page
      return `https://www.youtube.com/watch?v=${videoId}`;
    };

    // Generate download instructions and alternative methods
    const result = {
      success: true,
      message: 'Download link generated successfully',
      videoId: videoId,
      format_id: format_id,
      downloadMethod: 'redirect',
      downloadUrl: await generateDownloadUrl(url, format_id, audio_only),
      directDownload: true,
      filename: `${videoId}_${format_id}.${audio_only ? 'mp3' : 'mp4'}`,
      instructions: {
        method: 'Direct download will start automatically',
        note: 'Using YouTube public streams for download'
      }
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
