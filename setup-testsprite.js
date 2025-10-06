// TestSprite Setup Script for Simple Tools Website
// This script installs required dependencies and sets up the testing environment

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up TestSprite for Simple Tools Website...\n');

// Install required dependencies
console.log('📦 Installing testing dependencies...');
try {
  execSync('npm install playwright cross-env --save-dev', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully\n');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message);
  process.exit(1);
}

// Install Playwright browsers
console.log('🌐 Installing Playwright browsers...');
try {
  execSync('npx playwright install', { stdio: 'inherit' });
  console.log('✅ Playwright browsers installed successfully\n');
} catch (error) {
  console.error('❌ Failed to install Playwright browsers:', error.message);
  process.exit(1);
}

// Create test results directory
const testResultsDir = path.join(__dirname, 'test-results');
if (!fs.existsSync(testResultsDir)) {
  fs.mkdirSync(testResultsDir, { recursive: true });
  fs.mkdirSync(path.join(testResultsDir, 'screenshots'), { recursive: true });
  console.log('✅ Test results directory created\n');
}

// Create .gitignore entry for test results
const gitignorePath = path.join(__dirname, '.gitignore');
let gitignoreContent = '';
if (fs.existsSync(gitignorePath)) {
  gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
}

if (!gitignoreContent.includes('test-results/')) {
  fs.appendFileSync(gitignorePath, '\n# TestSprite results\ntest-results/\n');
  console.log('✅ Added test-results to .gitignore\n');
}

console.log('🎉 TestSprite setup completed successfully!\n');
console.log('📋 Available commands:');
console.log('  npm run test          - Run all tests with browser UI');
console.log('  npm run test:headless - Run all tests in headless mode');
console.log('  npm run dev           - Start development server (required for testing)');
console.log('\n💡 Make sure to start your development server before running tests!');
console.log('   Run: npm run dev (in one terminal)');
console.log('   Then: npm run test (in another terminal)');
