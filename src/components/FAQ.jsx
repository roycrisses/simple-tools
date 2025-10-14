import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQ = () => {
  const [openItems, setOpenItems] = useState({})

  const faqs = [
    {
      question: "What is Simple Tools and how does it work?",
      answer: "Simple Tools is a comprehensive collection of 120+ free online utilities designed to boost your productivity. Our tools include QR code generators, image processors, PDF tools, SEO analyzers, text utilities, and more. All tools work directly in your browser without requiring registration or downloads."
    },
    {
      question: "Are all the tools really free to use?",
      answer: "Yes, absolutely! All 120+ tools on Simple Tools are completely free to use. There are no hidden costs, premium subscriptions, or usage limits. We believe in providing valuable productivity tools that are accessible to everyone."
    },
    {
      question: "Do I need to create an account to use the tools?",
      answer: "No account creation is required! You can start using any tool immediately without providing personal information or creating an account. This ensures your privacy and allows for instant access to all our utilities."
    },
    {
      question: "How do you ensure user privacy and data security?",
      answer: "Privacy is our top priority. Most tools process data locally in your browser, meaning your files never leave your device. For tools that require server processing, files are automatically deleted after processing. We don't collect, store, or track personal information."
    },
    {
      question: "What types of tools are available on Simple Tools?",
      answer: "We offer tools across multiple categories: Image Processing (QR generator, image resizer, compressor), Document Management (PDF tools), SEO & Marketing (domain authority checker, backlink analyzer, keyword research), Text & Writing (grammar checker, plagiarism detector), Media Tools (YouTube downloader), and Utility Tools (unit converter, coin flip)."
    },
    {
      question: "Can I use these tools for commercial purposes?",
      answer: "Yes, you can use our tools for both personal and commercial purposes. However, please ensure you comply with the terms of service and respect intellectual property rights when using any downloaded or processed content."
    },
    {
      question: "How often are new tools added to the platform?",
      answer: "We continuously work on adding new tools and improving existing ones based on user feedback and emerging needs. Our development team regularly releases updates to enhance functionality and add new features."
    },
    {
      question: "What file formats are supported by the tools?",
      answer: "Our tools support a wide range of formats. Image tools support JPG, PNG, GIF, WebP, and more. PDF tools handle various document formats. Text tools work with plain text, and our media tools support multiple video and audio formats. Check individual tool pages for specific format support."
    },
    {
      question: "Is there a limit on file size for uploads?",
      answer: "File size limits vary by tool to ensure optimal performance. Most image tools support files up to 10MB, while document tools can handle larger files. Check the specific tool page for exact limits and recommendations."
    },
    {
      question: "How can I contact support or report issues?",
      answer: "You can reach us at krishna21karki@gmail.com for support, bug reports, or feature requests. We typically respond within 24 hours and appreciate feedback that helps us improve our tools."
    },
    {
      question: "Are the tools mobile-friendly?",
      answer: "Yes! All our tools are fully responsive and work seamlessly on desktop, tablet, and mobile devices. The interface automatically adapts to your screen size for optimal user experience across all platforms."
    },
    {
      question: "Do you offer API access for developers?",
      answer: "Currently, we focus on providing direct web-based access to our tools. However, we're exploring API options for developers. If you're interested in API access, please contact us with your specific requirements."
    }
  ]

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="award-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="award-heading-2 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about Simple Tools
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="modern-card">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors rounded-xl"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {openItems[index] ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {openItems[index] && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-3">
                Still have questions?
              </h3>
              <p className="text-blue-700 mb-4">
                Can't find the answer you're looking for? We're here to help!
              </p>
              <a
                href="mailto:krishna21karki@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
