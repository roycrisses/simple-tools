# Simple Tools for Daily Use

A modern, responsive multi-tool website built with React and FastAPI. Provides essential utilities like QR code generation, image resizing, YouTube downloading, and coin flipping - all completely free and privacy-focused.

## 🚀 Features

### Available Tools
- **QR Code Generator** - Convert text, URLs, or messages into QR codes
- **Image Resizer** - Resize images to custom dimensions with quality preservation
- **YouTube Downloader** - Download videos and audio in various formats
- **Coin Flip** - Virtual coin flip with statistics tracking

### Key Benefits
- ✅ **Completely Free** - No hidden costs or premium features
- ✅ **Privacy First** - No data collection, local processing
- ✅ **Mobile Responsive** - Works perfectly on all devices
- ✅ **Dark/Light Mode** - Automatic theme switching
- ✅ **Fast & Reliable** - Optimized for speed and performance
- ✅ **No Registration** - Use immediately without signing up

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **Tailwind CSS** - Utility-first styling
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client

### Backend
- **FastAPI** - High-performance Python API
- **Pillow** - Advanced image processing
- **yt-dlp** - YouTube download capabilities
- **qrcode** - QR code generation
- **uvicorn** - ASGI server

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+ and pip

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd simple-tools-website
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   cd ..
   ```

### Development

1. **Start the backend server**
   ```bash
   cd backend
   python main.py
   ```
   Backend will run on http://localhost:8000

2. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   Frontend will run on http://localhost:3000

3. **Open your browser**
   Navigate to http://localhost:3000 to see the application

## 📁 Project Structure

```
simple-tools-website/
├── src/                    # React frontend source
│   ├── components/         # Reusable components
│   │   └── Navbar.jsx     # Navigation component
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Landing page
│   │   ├── QRGenerator.jsx # QR code tool
│   │   ├── ImageResizer.jsx # Image resize tool
│   │   ├── YouTubeDownloader.jsx # YouTube tool
│   │   ├── CoinFlip.jsx   # Coin flip tool
│   │   └── About.jsx      # About page
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── backend/               # FastAPI backend
│   ├── main.py           # API server
│   ├── requirements.txt  # Python dependencies
│   └── temp/            # Temporary file storage
├── public/               # Static assets
├── package.json         # Frontend dependencies
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
└── README.md           # This file
```

## 🔧 API Endpoints

### QR Code Generator
- `POST /api/qr-generate` - Generate QR code from text

### Image Resizer
- `POST /api/image-resize` - Resize uploaded image

### YouTube Downloader
- `POST /api/youtube-info` - Get video information
- `POST /api/youtube-download` - Download video/audio

### Coin Flip
- `POST /api/coin-flip` - Flip virtual coin

### Utilities
- `GET /api/download/{filename}` - Download generated files
- `DELETE /api/cleanup` - Clean temporary files

## 🎨 Customization

### Colors
The app uses a warm beige theme with orange/blue accents. Colors can be customized in `tailwind.config.js`:

```javascript
colors: {
  primary: { /* Orange shades */ },
  secondary: { /* Blue shades */ },
  beige: { /* Beige shades */ }
}
```

### Adding New Tools
1. Create a new page component in `src/pages/`
2. Add the route in `src/App.jsx`
3. Update the navigation in `src/components/Navbar.jsx`
4. Add the tool card to `src/pages/Home.jsx`
5. Implement the backend API endpoint in `backend/main.py`

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
```
Deploy the `dist` folder to your hosting provider.

### Backend (Railway/Heroku)
The FastAPI backend can be deployed to any Python hosting service. Make sure to:
1. Set environment variables if needed
2. Configure CORS origins for production
3. Set up file cleanup for temporary files

### Environment Variables
- `CORS_ORIGINS` - Allowed origins for CORS (production)
- `TEMP_CLEANUP_INTERVAL` - Cleanup interval for temp files

## 🔒 Privacy & Security

- **No Data Collection** - We don't store or track user data
- **Local Processing** - Files processed temporarily and deleted
- **No Authentication** - No user accounts or personal information
- **Secure Headers** - CORS and security headers configured
- **File Validation** - Input validation and file type checking

## 🤝 Contributing

We welcome contributions! Please feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Development Guidelines
- Follow React best practices
- Use Tailwind CSS for styling
- Maintain responsive design
- Add proper error handling
- Write clean, documented code

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Fonts by [Google Fonts](https://fonts.google.com/)
- Built with [React](https://reactjs.org/) and [FastAPI](https://fastapi.tiangolo.com/)

## 📞 Support

If you encounter any issues or have suggestions:
- Open an issue on GitHub
- Email us at contact@simpletools.com
- Check the documentation

---

Made with ❤️ for the community. Keep it simple, keep it free!
