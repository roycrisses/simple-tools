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
      // Configure download options
      const downloadOptions = {
        format: format_id,
        output: outputTemplate,
        restrictFilenames: true,
        noPlaylist: true,
        extractFlat: false
      };

      // Add audio-specific options if needed
      if (audio_only || format_id.includes('audio') || format_id === 'bestaudio') {
        downloadOptions.extractAudio = true;
        downloadOptions.audioFormat = 'mp3';
        downloadOptions.audioQuality = '192K';
      }

      // Download the video/audio
      console.log('Starting download with options:', downloadOptions);
      const downloadResult = await ytDlpWrap.exec([
        url,
        '--format', format_id,
        '--output', outputTemplate,
        '--restrict-filenames',
        '--no-playlist',
        ...(audio_only ? ['--extract-audio', '--audio-format', 'mp3', '--audio-quality', '192K'] : [])
      ]);

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
