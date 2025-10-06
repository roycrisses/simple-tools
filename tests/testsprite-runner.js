// TestSprite Test Runner for Simple Tools Website
// This script runs all the tests defined in testsprite.config.js

const { chromium, firefox, webkit } = require('playwright');
const fs = require('fs');
const path = require('path');
const config = require('../testsprite.config.js');

class TestSpriteRunner {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.results = {
      passed: 0,
      failed: 0,
      total: 0,
      details: []
    };
  }

  async initialize() {
    console.log('🚀 Initializing TestSprite Runner...');
    
    // Launch browser based on config
    const browserType = config.environment.browser || 'chromium';
    const Browser = browserType === 'firefox' ? firefox : browserType === 'webkit' ? webkit : chromium;
    
    this.browser = await Browser.launch({
      headless: config.environment.headless,
      slowMo: 100 // Add slight delay for better visibility
    });

    this.context = await this.browser.newContext({
      viewport: config.environment.viewport
    });

    this.page = await this.context.newPage();
    
    // Set timeout
    this.page.setDefaultTimeout(config.environment.timeout);
    
    console.log(`✅ Browser launched: ${browserType}`);
  }

  async runAllTests() {
    console.log('\n📋 Starting comprehensive website testing...\n');
    
    const testSuites = config.testSuites;
    
    for (const [suiteName, suite] of Object.entries(testSuites)) {
      if (!suite.enabled) {
        console.log(`⏭️  Skipping ${suiteName} tests (disabled)`);
        continue;
      }

      console.log(`\n🧪 Running ${suiteName.toUpperCase()} tests:`);
      console.log('─'.repeat(50));

      switch (suiteName) {
        case 'navigation':
          await this.runNavigationTests(suite.tests);
          break;
        case 'tools':
          await this.runToolTests(suite.tests);
          break;
        case 'contact':
          await this.runContactTests(suite.tests);
          break;
        case 'darkMode':
          await this.runDarkModeTests(suite.tests);
          break;
        case 'responsive':
          await this.runResponsiveTests(suite);
          break;
        case 'performance':
          await this.runPerformanceTests(suite.tests);
          break;
        case 'accessibility':
          await this.runAccessibilityTests(suite.tests);
          break;
        case 'seo':
          await this.runSEOTests(suite.tests);
          break;
      }
    }

    await this.generateReport();
  }

  async runNavigationTests(tests) {
    for (const test of tests) {
      await this.executeTest(test, 'Navigation');
    }
  }

  async runToolTests(tests) {
    for (const test of tests) {
      await this.executeTest(test, 'Tools');
    }
  }

  async runContactTests(tests) {
    for (const test of tests) {
      await this.executeTest(test, 'Contact');
    }
  }

  async runDarkModeTests(tests) {
    for (const test of tests) {
      await this.executeTest(test, 'Dark Mode');
    }
  }

  async runResponsiveTests(suite) {
    const { viewports, tests } = suite;
    
    for (const viewport of viewports) {
      console.log(`📱 Testing ${viewport.name} (${viewport.width}x${viewport.height})`);
      
      await this.page.setViewportSize({
        width: viewport.width,
        height: viewport.height
      });

      for (const test of tests) {
        const testWithViewport = {
          ...test,
          name: `${test.name} - ${viewport.name}`
        };
        await this.executeTest(testWithViewport, 'Responsive');
      }
    }
  }

  async runPerformanceTests(tests) {
    for (const test of tests) {
      await this.executePerformanceTest(test);
    }
  }

  async runAccessibilityTests(tests) {
    for (const test of tests) {
      await this.executeAccessibilityTest(test);
    }
  }

  async runSEOTests(tests) {
    for (const test of tests) {
      await this.executeSEOTest(test);
    }
  }

  async executeTest(test, category) {
    const startTime = Date.now();
    let success = false;
    let error = null;

    try {
      console.log(`  ⏳ ${test.name}...`);
      
      // Navigate to the test URL
      await this.page.goto(`${config.baseUrl}${test.url}`);
      
      // Execute test actions
      for (const action of test.actions) {
        await this.executeAction(action);
      }
      
      success = true;
      console.log(`  ✅ ${test.name} - PASSED`);
      
    } catch (err) {
      error = err.message;
      console.log(`  ❌ ${test.name} - FAILED: ${error}`);
      
      // Take screenshot on failure
      if (config.reporting.screenshots.onFailure) {
        await this.takeScreenshot(`${category}-${test.name}-failure`);
      }
    }

    const duration = Date.now() - startTime;
    
    this.results.total++;
    if (success) {
      this.results.passed++;
    } else {
      this.results.failed++;
    }

    this.results.details.push({
      category,
      name: test.name,
      success,
      error,
      duration,
      url: test.url
    });
  }

  async executeAction(action) {
    switch (action.type) {
      case 'waitForSelector':
        await this.page.waitForSelector(action.selector, { timeout: action.timeout });
        break;
      case 'click':
        await this.page.click(action.selector);
        break;
      case 'fill':
        await this.page.fill(action.selector, action.value);
        break;
      case 'waitForURL':
        await this.page.waitForURL(`${config.baseUrl}${action.url}`);
        break;
      case 'waitForTimeout':
        await this.page.waitForTimeout(action.timeout);
        break;
      case 'goBack':
        await this.page.goBack();
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  async executePerformanceTest(test) {
    console.log(`  ⏳ ${test.name}...`);
    
    try {
      const startTime = Date.now();
      await this.page.goto(`${config.baseUrl}${test.url}`);
      
      // Wait for page to fully load
      await this.page.waitForLoadState('networkidle');
      
      const duration = Date.now() - startTime;
      const success = duration < 5000; // 5 second threshold
      
      console.log(`  ${success ? '✅' : '❌'} ${test.name} - Load time: ${duration}ms`);
      
      this.results.total++;
      if (success) this.results.passed++;
      else this.results.failed++;
      
      this.results.details.push({
        category: 'Performance',
        name: test.name,
        success,
        duration,
        url: test.url,
        loadTime: duration
      });
      
    } catch (error) {
      console.log(`  ❌ ${test.name} - FAILED: ${error.message}`);
      this.results.total++;
      this.results.failed++;
    }
  }

  async executeAccessibilityTest(test) {
    console.log(`  ⏳ ${test.name}...`);
    
    try {
      await this.page.goto(`${config.baseUrl}${test.url}`);
      
      // Basic accessibility checks
      const hasTitle = await this.page.$('title');
      const hasH1 = await this.page.$('h1');
      const hasAltTexts = await this.page.$$eval('img', imgs => 
        imgs.every(img => img.alt !== undefined)
      );
      
      const success = hasTitle && hasH1 && hasAltTexts;
      
      console.log(`  ${success ? '✅' : '❌'} ${test.name} - ${success ? 'PASSED' : 'FAILED'}`);
      
      this.results.total++;
      if (success) this.results.passed++;
      else this.results.failed++;
      
      this.results.details.push({
        category: 'Accessibility',
        name: test.name,
        success,
        url: test.url,
        checks: { hasTitle: !!hasTitle, hasH1: !!hasH1, hasAltTexts }
      });
      
    } catch (error) {
      console.log(`  ❌ ${test.name} - FAILED: ${error.message}`);
      this.results.total++;
      this.results.failed++;
    }
  }

  async executeSEOTest(test) {
    console.log(`  ⏳ ${test.name}...`);
    
    try {
      await this.page.goto(`${config.baseUrl}${test.url}`);
      
      const seoChecks = {};
      for (const check of test.checks) {
        const element = await this.page.$(check);
        seoChecks[check] = !!element;
      }
      
      const success = Object.values(seoChecks).every(Boolean);
      
      console.log(`  ${success ? '✅' : '❌'} ${test.name} - ${success ? 'PASSED' : 'FAILED'}`);
      
      this.results.total++;
      if (success) this.results.passed++;
      else this.results.failed++;
      
      this.results.details.push({
        category: 'SEO',
        name: test.name,
        success,
        url: test.url,
        checks: seoChecks
      });
      
    } catch (error) {
      console.log(`  ❌ ${test.name} - FAILED: ${error.message}`);
      this.results.total++;
      this.results.failed++;
    }
  }

  async takeScreenshot(name) {
    const screenshotPath = path.join(config.reporting.outputDir, 'screenshots', `${name}.png`);
    await fs.promises.mkdir(path.dirname(screenshotPath), { recursive: true });
    await this.page.screenshot({ path: screenshotPath });
  }

  async generateReport() {
    console.log('\n📊 Generating Test Report...\n');
    
    const report = {
      timestamp: new Date().toISOString(),
      config: {
        projectName: config.projectName,
        baseUrl: config.baseUrl,
        browser: config.environment.browser
      },
      summary: {
        total: this.results.total,
        passed: this.results.passed,
        failed: this.results.failed,
        successRate: ((this.results.passed / this.results.total) * 100).toFixed(2)
      },
      details: this.results.details
    };

    // Ensure output directory exists
    await fs.promises.mkdir(config.reporting.outputDir, { recursive: true });
    
    // Generate JSON report
    const jsonPath = path.join(config.reporting.outputDir, 'testsprite-report.json');
    await fs.promises.writeFile(jsonPath, JSON.stringify(report, null, 2));
    
    // Generate HTML report
    const htmlReport = this.generateHTMLReport(report);
    const htmlPath = path.join(config.reporting.outputDir, 'testsprite-report.html');
    await fs.promises.writeFile(htmlPath, htmlReport);
    
    // Print summary
    console.log('═'.repeat(60));
    console.log('🎯 TEST SUMMARY');
    console.log('═'.repeat(60));
    console.log(`📊 Total Tests: ${report.summary.total}`);
    console.log(`✅ Passed: ${report.summary.passed}`);
    console.log(`❌ Failed: ${report.summary.failed}`);
    console.log(`📈 Success Rate: ${report.summary.successRate}%`);
    console.log('═'.repeat(60));
    console.log(`📄 Reports generated:`);
    console.log(`   JSON: ${jsonPath}`);
    console.log(`   HTML: ${htmlPath}`);
    console.log('═'.repeat(60));
  }

  generateHTMLReport(report) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TestSprite Report - ${report.config.projectName}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .summary-card { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; }
        .summary-card h3 { margin: 0 0 10px 0; color: #333; }
        .summary-card .value { font-size: 2em; font-weight: bold; }
        .passed { color: #28a745; }
        .failed { color: #dc3545; }
        .total { color: #007bff; }
        .success-rate { color: #17a2b8; }
        .details { margin-top: 30px; }
        .test-item { background: #f8f9fa; margin: 10px 0; padding: 15px; border-radius: 8px; border-left: 4px solid #ddd; }
        .test-item.passed { border-left-color: #28a745; }
        .test-item.failed { border-left-color: #dc3545; }
        .test-name { font-weight: bold; margin-bottom: 5px; }
        .test-meta { font-size: 0.9em; color: #666; }
        .error { color: #dc3545; margin-top: 5px; font-family: monospace; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧪 TestSprite Report</h1>
            <h2>${report.config.projectName}</h2>
            <p>Generated on ${new Date(report.timestamp).toLocaleString()}</p>
            <p>Base URL: ${report.config.baseUrl} | Browser: ${report.config.browser}</p>
        </div>
        
        <div class="summary">
            <div class="summary-card">
                <h3>Total Tests</h3>
                <div class="value total">${report.summary.total}</div>
            </div>
            <div class="summary-card">
                <h3>Passed</h3>
                <div class="value passed">${report.summary.passed}</div>
            </div>
            <div class="summary-card">
                <h3>Failed</h3>
                <div class="value failed">${report.summary.failed}</div>
            </div>
            <div class="summary-card">
                <h3>Success Rate</h3>
                <div class="value success-rate">${report.summary.successRate}%</div>
            </div>
        </div>
        
        <div class="details">
            <h3>📋 Test Details</h3>
            ${report.details.map(test => `
                <div class="test-item ${test.success ? 'passed' : 'failed'}">
                    <div class="test-name">${test.success ? '✅' : '❌'} ${test.category}: ${test.name}</div>
                    <div class="test-meta">
                        URL: ${test.url} | Duration: ${test.duration}ms
                        ${test.loadTime ? ` | Load Time: ${test.loadTime}ms` : ''}
                    </div>
                    ${test.error ? `<div class="error">Error: ${test.error}</div>` : ''}
                </div>
            `).join('')}
        </div>
    </div>
</body>
</html>`;
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Main execution
async function runTests() {
  const runner = new TestSpriteRunner();
  
  try {
    await runner.initialize();
    await runner.runAllTests();
  } catch (error) {
    console.error('❌ Test execution failed:', error);
  } finally {
    await runner.cleanup();
  }
}

// Run if called directly
if (require.main === module) {
  runTests();
}

module.exports = TestSpriteRunner;
