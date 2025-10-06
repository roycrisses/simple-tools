// TestSprite Configuration for Simple Tools Website
// Comprehensive testing setup for all pages and functionality

module.exports = {
  // Project Information
  projectName: "Simple Tools Website",
  version: "1.0.0",
  baseUrl: "http://127.0.0.1:5173", // Vite dev server default
  
  // Test Environment Settings
  environment: {
    browser: "chromium", // chromium, firefox, webkit
    headless: false, // Set to true for CI/CD
    viewport: {
      width: 1280,
      height: 720
    },
    timeout: 30000,
    retries: 2
  },

  // Test Suites Configuration
  testSuites: {
    // Core Navigation Tests
    navigation: {
      enabled: true,
      tests: [
        {
          name: "Homepage Navigation",
          url: "/",
          actions: [
            { type: "waitForSelector", selector: "h1" },
            { type: "click", selector: "a[href='/tools']" },
            { type: "waitForURL", url: "/tools" }
          ]
        },
        {
          name: "All Navigation Links",
          url: "/",
          actions: [
            { type: "click", selector: "a[href='/about']" },
            { type: "waitForURL", url: "/about" },
            { type: "goBack" },
            { type: "click", selector: "a[href='/contact']" },
            { type: "waitForURL", url: "/contact" }
          ]
        }
      ]
    },

    // Tool Functionality Tests
    tools: {
      enabled: true,
      tests: [
        {
          name: "QR Generator Tool",
          url: "/qr-generator",
          actions: [
            { type: "waitForSelector", selector: "textarea[data-testid='qr-text-input'], input[type='text'], textarea" },
            { type: "fill", selector: "textarea[data-testid='qr-text-input'], textarea", value: "Test QR Code" },
            { type: "click", selector: "button:has-text('GENERATE QR')" },
            { type: "waitForSelector", selector: "canvas, img", timeout: 5000 }
          ]
        },
        {
          name: "Image Resizer Tool",
          url: "/image-resizer",
          actions: [
            { type: "waitForSelector", selector: "input[data-testid='image-file-input'], input[type='file']" },
            { type: "waitForSelector", selector: "input[type='number']" }
          ]
        },
        {
          name: "Coin Flip Tool",
          url: "/coin-flip",
          actions: [
            { type: "waitForSelector", selector: "button" },
            { type: "click", selector: "button:has-text('Flip')" },
            { type: "waitForTimeout", timeout: 2000 }
          ]
        },
        {
          name: "Text Tools",
          url: "/text-tools",
          actions: [
            { type: "waitForSelector", selector: "textarea" },
            { type: "fill", selector: "textarea", value: "Test text for processing" },
            { type: "waitForSelector", selector: "button" }
          ]
        },
        {
          name: "Color Tools",
          url: "/color-tools",
          actions: [
            { type: "waitForSelector", selector: "input[type='color'], input[type='text']" }
          ]
        },
        {
          name: "Unit Converter",
          url: "/unit-converter",
          actions: [
            { type: "waitForSelector", selector: "select, input[type='number']" }
          ]
        },
        {
          name: "PDF Tools",
          url: "/pdf-tools",
          actions: [
            { type: "waitForSelector", selector: "input[data-testid='pdf-file-input'], input[type='file']" }
          ]
        },
        {
          name: "YouTube Downloader",
          url: "/youtube-downloader",
          actions: [
            { type: "waitForSelector", selector: "input[type='url'], input[type='text']" }
          ]
        }
      ]
    },

    // Contact Form Tests
    contact: {
      enabled: true,
      tests: [
        {
          name: "Contact Form Validation",
          url: "/contact",
          actions: [
            { type: "waitForSelector", selector: "form" },
            { type: "click", selector: "button[type='submit']" },
            { type: "waitForSelector", selector: "input:invalid" }
          ]
        },
        {
          name: "Contact Form Fill Test",
          url: "/contact",
          actions: [
            { type: "fill", selector: "input[name='name']", value: "Test User" },
            { type: "fill", selector: "input[name='email']", value: "test@example.com" },
            { type: "fill", selector: "input[name='subject']", value: "Test Subject" },
            { type: "fill", selector: "textarea[name='message']", value: "This is a test message for TestSprite validation." },
            // Note: Don't actually submit to avoid sending test emails
            { type: "waitForSelector", selector: "button[type='submit']:not([disabled])" }
          ]
        }
      ]
    },

    // Dark Mode Tests
    darkMode: {
      enabled: true,
      tests: [
        {
          name: "Dark Mode Toggle",
          url: "/",
          actions: [
            { type: "waitForSelector", selector: "button[aria-label*='dark'], button[title*='dark'], button:has-text('🌙'), button:has-text('☀️')" },
            { type: "click", selector: "button[aria-label*='dark'], button[title*='dark'], button:has-text('🌙'), button:has-text('☀️')" },
            { type: "waitForTimeout", timeout: 500 },
            { type: "waitForSelector", selector: ".dark, [class*='dark']" }
          ]
        }
      ]
    },

    // Responsive Design Tests
    responsive: {
      enabled: true,
      viewports: [
        { width: 375, height: 667, name: "Mobile" },
        { width: 768, height: 1024, name: "Tablet" },
        { width: 1920, height: 1080, name: "Desktop" }
      ],
      tests: [
        {
          name: "Homepage Responsive",
          url: "/",
          actions: [
            { type: "waitForSelector", selector: "h1" },
            { type: "waitForSelector", selector: "nav" }
          ]
        },
        {
          name: "Tools Page Responsive",
          url: "/tools",
          actions: [
            { type: "waitForSelector", selector: ".grid, [class*='grid']" }
          ]
        }
      ]
    },

    // Performance Tests
    performance: {
      enabled: true,
      metrics: ["FCP", "LCP", "CLS", "FID"],
      thresholds: {
        FCP: 2000, // First Contentful Paint
        LCP: 3000, // Largest Contentful Paint
        CLS: 0.1,  // Cumulative Layout Shift
        FID: 100   // First Input Delay
      },
      tests: [
        { name: "Homepage Performance", url: "/" },
        { name: "Tools Page Performance", url: "/tools" },
        { name: "Contact Page Performance", url: "/contact" }
      ]
    },

    // Accessibility Tests
    accessibility: {
      enabled: true,
      standards: ["WCAG2A", "WCAG2AA"],
      tests: [
        { name: "Homepage Accessibility", url: "/" },
        { name: "Contact Form Accessibility", url: "/contact" },
        { name: "QR Generator Accessibility", url: "/qr-generator" },
        { name: "Image Resizer Accessibility", url: "/image-resizer" }
      ]
    },

    // SEO Tests
    seo: {
      enabled: true,
      tests: [
        {
          name: "Homepage SEO",
          url: "/",
          checks: [
            "title",
            "meta[name='description']",
            "h1",
            "meta[property='og:title']",
            "meta[property='og:description']"
          ]
        },
        {
          name: "Tools Page SEO",
          url: "/tools",
          checks: [
            "title",
            "meta[name='description']",
            "h1"
          ]
        }
      ]
    }
  },

  // Reporting Configuration
  reporting: {
    formats: ["html", "json", "junit"],
    outputDir: "./test-results",
    screenshots: {
      onFailure: true,
      onSuccess: false
    },
    video: {
      enabled: true,
      onFailure: true
    }
  },

  // CI/CD Integration
  ci: {
    enabled: false,
    webhook: null,
    notifications: {
      slack: null,
      email: null
    }
  }
}
