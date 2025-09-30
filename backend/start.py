#!/usr/bin/env python3
"""
Simple Tools Backend Server
Start script for the FastAPI application
"""

import uvicorn
import os
from pathlib import Path

if __name__ == "__main__":
    # Ensure temp directory exists
    temp_dir = Path("temp")
    temp_dir.mkdir(exist_ok=True)
    
    # Get port from environment or default to 8000
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    
    print(f"🚀 Starting Simple Tools API server...")
    print(f"📍 Server will be available at: http://{host}:{port}")
    print(f"📁 Temporary files directory: {temp_dir.absolute()}")
    print(f"🔧 Environment: {'Production' if os.getenv('ENVIRONMENT') == 'production' else 'Development'}")
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=os.getenv("ENVIRONMENT") != "production",
        log_level="info"
    )
