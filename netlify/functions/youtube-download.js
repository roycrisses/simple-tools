// Real YouTube Download Function using yt-dlp
const YTDlpWrap = require('yt-dlp-wrap').default;
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

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

    // Initialize yt-dlp
    const ytDlpWrap = new YTDlpWrap();
    
    // Create temporary directory for downloads
    const tempDir = '/tmp';
    const timestamp = Date.now();
    const outputTemplate = path.join(tempDir, `%(title)s_${timestamp}.%(ext)s`);
    
    try {
      // Configure download options for HIGHEST QUALITY
      let downloadArgs = [
        url,
        '--output', outputTemplate,
        '--restrict-filenames',
        '--no-playlist',
        '--no-warnings'
      ];

      // Handle different format types for ORIGINAL QUALITY
      if (format_id === 'best') {
        // Download the absolute best quality available
        downloadArgs.push('--format', 'best');
      } else if (format_id === 'bestvideo+bestaudio/best') {
        // Download best video and audio separately, then merge
        downloadArgs.push('--format', 'bestvideo+bestaudio/best');
        downloadArgs.push('--merge-output-format', 'mp4');
      } else if (format_id === 'bestaudio' || audio_only) {
        // Download best audio quality
        downloadArgs.push('--format', 'bestaudio');
        downloadArgs.push('--extract-audio');
        downloadArgs.push('--audio-format', 'mp3');
        downloadArgs.push('--audio-quality', '0'); // Best audio quality (0 = best)
      } else {
        // Download specific format
        downloadArgs.push('--format', format_id);
      }

      // Add additional quality options
      downloadArgs.push('--embed-metadata');
      downloadArgs.push('--add-metadata');

      // Download the video/audio
      console.log('Starting ORIGINAL QUALITY download with args:', downloadArgs);
      const downloadResult = await ytDlpWrap.exec(downloadArgs);

      // Find the downloaded file
      const files = fs.readdirSync(tempDir).filter(file => 
        file.includes(timestamp.toString()) && 
        (file.endsWith('.mp4') || file.endsWith('.mp3') || file.endsWith('.webm') || file.endsWith('.m4a'))
      );

      if (files.length === 0) {
        throw new Error('Downloaded file not found');
      }

      const downloadedFile = files[0];
      const filePath = path.join(tempDir, downloadedFile);
      const fileStats = fs.statSync(filePath);
      
      // Read file as base64 for direct download
      const fileBuffer = fs.readFileSync(filePath);
      const base64Data = fileBuffer.toString('base64');
      
      // Clean up the temporary file
      fs.unlinkSync(filePath);
      
      // Return the file data
      const result = {
        success: true,
        filename: downloadedFile,
        filesize: fileStats.size,
        data: base64Data,
        mimeType: getMimeType(downloadedFile),
        message: 'Download completed successfully!'
      };

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result),
      };
      
    } catch (ytDlpError) {
      console.error('yt-dlp download error:', ytDlpError);
      
      // Clean up any partial files
      try {
        const files = fs.readdirSync(tempDir).filter(file => file.includes(timestamp.toString()));
        files.forEach(file => {
          try {
            fs.unlinkSync(path.join(tempDir, file));
          } catch (e) {
            console.error('Error cleaning up file:', e);
          }
        });
      } catch (e) {
        console.error('Error during cleanup:', e);
      }
      
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Failed to download video. The video might be private, age-restricted, or the format might not be available.',
          details: ytDlpError.message 
        }),
      };
    }
    
  } catch (error) {
    console.error('General download error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error during download' }),
    };
  }
};

// Helper function to determine MIME type
function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes = {
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mp3': 'audio/mpeg',
    '.m4a': 'audio/mp4',
    '.wav': 'audio/wav'
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

// Helper function to format file size
function formatFileSize(bytes) {
  if (!bytes) return 'Unknown size';
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}
