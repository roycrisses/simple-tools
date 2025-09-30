const { onRequest } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

// Initialize Firebase Admin
admin.initializeApp();

// YouTube Info Function
exports.getYouTubeInfo = onRequest(async (req, res) => {
  return cors(req, res, async () => {
    try {
      const { url } = req.body;
      
      if (!url) {
        return res.status(400).json({ error: 'URL is required' });
      }

      // Basic YouTube URL validation
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
      if (!youtubeRegex.test(url)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
      }

      // In a real implementation, you would use yt-dlp here
      // For now, return mock data
      const mockVideoInfo = {
        success: true,
        title: "Sample Video Title",
        duration: 180,
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        formats: [
          {
            format_id: "22",
            ext: "mp4",
            quality: "720p",
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
          }
        ]
      };

      // Log the request for monitoring
      logger.info("YouTube info requested", { url });

      res.json(mockVideoInfo);
    } catch (error) {
      logger.error("Error getting YouTube info", error);
      res.status(500).json({ error: 'Failed to get video information' });
    }
  });
});

// YouTube Download Function
exports.downloadYouTube = onRequest(async (req, res) => {
  return cors(req, res, async () => {
    try {
      const { url, format_id, audio_only } = req.body;
      
      if (!url || !format_id) {
        return res.status(400).json({ error: 'URL and format_id are required' });
      }

      // In a real implementation, you would:
      // 1. Use yt-dlp to download the video
      // 2. Upload to Firebase Storage
      // 3. Generate a download URL
      // 4. Return the download link

      // For now, return mock success
      const mockDownloadResult = {
        success: true,
        filename: `video_${Date.now()}.${audio_only ? 'mp3' : 'mp4'}`,
        url: "https://example.com/mock-download-url",
        message: "This is a demo response. Real implementation would download from YouTube."
      };

      logger.info("YouTube download requested", { url, format_id, audio_only });

      res.json(mockDownloadResult);
    } catch (error) {
      logger.error("Error downloading YouTube video", error);
      res.status(500).json({ error: 'Failed to download video' });
    }
  });
});

// Health check function
exports.healthCheck = onRequest((req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    message: 'Simple Tools Firebase Functions are running!'
  });
});
