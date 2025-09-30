from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
import qrcode
from PIL import Image
import io
import os
import tempfile
import random
import yt_dlp
import aiofiles
from typing import Optional
import uuid
from pathlib import Path

app = FastAPI(title="Simple Tools API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create directories for temporary files
TEMP_DIR = Path("temp")
TEMP_DIR.mkdir(exist_ok=True)

# Serve static files
app.mount("/static", StaticFiles(directory="temp"), name="static")

@app.get("/")
async def root():
    return {"message": "Simple Tools API is running!"}

@app.post("/api/qr-generate")
async def generate_qr_code(
    text: str = Form(...),
    size: int = Form(default=10),
    border: int = Form(default=4)
):
    """Generate QR code from text"""
    try:
        # Create QR code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=size,
            border=border,
        )
        qr.add_data(text)
        qr.make(fit=True)

        # Create image
        img = qr.make_image(fill_color="black", back_color="white")
        
        # Save to temporary file
        filename = f"qr_{uuid.uuid4().hex}.png"
        filepath = TEMP_DIR / filename
        img.save(filepath)
        
        return {"success": True, "filename": filename, "url": f"/static/{filename}"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating QR code: {str(e)}")

@app.post("/api/image-resize")
async def resize_image(
    file: UploadFile = File(...),
    width: int = Form(...),
    height: int = Form(...),
    maintain_aspect: bool = Form(default=False)
):
    """Resize uploaded image"""
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read image
        contents = await file.read()
        img = Image.open(io.BytesIO(contents))
        
        # Resize image
        if maintain_aspect:
            img.thumbnail((width, height), Image.Resampling.LANCZOS)
        else:
            img = img.resize((width, height), Image.Resampling.LANCZOS)
        
        # Save resized image
        filename = f"resized_{uuid.uuid4().hex}.png"
        filepath = TEMP_DIR / filename
        img.save(filepath, "PNG")
        
        return {
            "success": True,
            "filename": filename,
            "url": f"/static/{filename}",
            "original_size": {"width": Image.open(io.BytesIO(contents)).width, "height": Image.open(io.BytesIO(contents)).height},
            "new_size": {"width": img.width, "height": img.height}
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error resizing image: {str(e)}")

@app.post("/api/youtube-info")
async def get_youtube_info(url: str = Form(...)):
    """Get YouTube video information"""
    try:
        ydl_opts = {
            'quiet': True,
            'no_warnings': True,
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            
            formats = []
            for f in info.get('formats', []):
                if f.get('vcodec') != 'none' or f.get('acodec') != 'none':
                    formats.append({
                        'format_id': f.get('format_id'),
                        'ext': f.get('ext'),
                        'quality': f.get('format_note', 'Unknown'),
                        'filesize': f.get('filesize'),
                        'vcodec': f.get('vcodec'),
                        'acodec': f.get('acodec'),
                    })
            
            return {
                "success": True,
                "title": info.get('title'),
                "duration": info.get('duration'),
                "thumbnail": info.get('thumbnail'),
                "formats": formats[:10]  # Limit to first 10 formats
            }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting video info: {str(e)}")

@app.post("/api/youtube-download")
async def download_youtube_video(
    url: str = Form(...),
    format_id: str = Form(...),
    audio_only: bool = Form(default=False)
):
    """Download YouTube video"""
    try:
        filename = f"download_{uuid.uuid4().hex}"
        filepath = TEMP_DIR / filename
        
        ydl_opts = {
            'format': format_id,
            'outtmpl': str(filepath) + '.%(ext)s',
            'quiet': True,
            'no_warnings': True,
        }
        
        if audio_only:
            ydl_opts['format'] = 'bestaudio/best'
            ydl_opts['postprocessors'] = [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }]
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
        
        # Find the downloaded file
        downloaded_files = list(TEMP_DIR.glob(f"{filename}.*"))
        if not downloaded_files:
            raise HTTPException(status_code=500, detail="Download failed")
        
        downloaded_file = downloaded_files[0]
        return {
            "success": True,
            "filename": downloaded_file.name,
            "url": f"/static/{downloaded_file.name}"
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error downloading video: {str(e)}")

@app.post("/api/coin-flip")
async def flip_coin():
    """Flip a virtual coin"""
    result = random.choice(["heads", "tails"])
    return {
        "success": True,
        "result": result,
        "timestamp": int(random.random() * 1000)  # For animation purposes
    }

@app.get("/api/download/{filename}")
async def download_file(filename: str):
    """Download a generated file"""
    filepath = TEMP_DIR / filename
    if not filepath.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(
        path=filepath,
        filename=filename,
        media_type='application/octet-stream'
    )

# Cleanup endpoint (optional, for maintenance)
@app.delete("/api/cleanup")
async def cleanup_temp_files():
    """Clean up temporary files older than 1 hour"""
    import time
    current_time = time.time()
    deleted_count = 0
    
    for file_path in TEMP_DIR.iterdir():
        if file_path.is_file():
            file_age = current_time - file_path.stat().st_mtime
            if file_age > 3600:  # 1 hour
                file_path.unlink()
                deleted_count += 1
    
    return {"success": True, "deleted_files": deleted_count}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
