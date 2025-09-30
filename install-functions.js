// Script to install Netlify Functions dependencies
const { execSync } = require('child_process');
const path = require('path');

console.log('🔧 Installing Netlify Functions dependencies...');

try {
  // Change to functions directory and install dependencies
  const functionsDir = path.join(__dirname, 'netlify', 'functions');
  process.chdir(functionsDir);
  
  console.log('📦 Installing yt-dlp-wrap and dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('✅ Dependencies installed successfully!');
  console.log('🚀 Your YouTube downloader is now ready for deployment!');
  
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message);
  console.log('💡 Try running: cd netlify/functions && npm install');
}
