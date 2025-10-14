import React from 'react'

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Terms of Service
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 mb-4">
              By accessing and using Simple Tools for Daily Use ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Description of Service
            </h2>
            <p className="text-gray-700 mb-4">
              Simple Tools provides free online utilities including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>QR Code Generator</li>
              <li>Image Resizer</li>
              <li>YouTube Downloader</li>
              <li>Coin Flip Tool</li>
              <li>PDF Tools</li>
              <li>Text Tools</li>
              <li>Color Tools</li>
              <li>Unit Converter</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. User Responsibilities
            </h2>
            <p className="text-gray-700 mb-4">
              You agree to use the Service responsibly and in accordance with these terms:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Use the tools for lawful purposes only</li>
              <li>Do not upload malicious, copyrighted, or inappropriate content</li>
              <li>Do not attempt to harm or disrupt the service</li>
              <li>Respect intellectual property rights</li>
              <li>Do not use the service for spam or automated requests</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Prohibited Uses
            </h2>
            <p className="text-gray-700 mb-4">
              You may not use the Service for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Illegal activities or content</li>
              <li>Harassment, abuse, or harmful behavior</li>
              <li>Uploading viruses, malware, or malicious code</li>
              <li>Copyright infringement or piracy</li>
              <li>Commercial use without permission</li>
              <li>Reverse engineering or attempting to access source code</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Content and File Processing
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>File Handling:</strong> Files you upload are processed temporarily and automatically deleted. We do not permanently store your files.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Content Responsibility:</strong> You are solely responsible for the content you upload and process through our tools.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Copyright:</strong> Ensure you have the right to use and process any content you upload.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Service Availability
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>Free Service:</strong> The Service is provided free of charge.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>No Guarantee:</strong> We do not guarantee uninterrupted or error-free service.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Modifications:</strong> We reserve the right to modify, suspend, or discontinue the Service at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Intellectual Property
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>Service Ownership:</strong> The Service, including its design, code, and functionality, is owned by Krishna Karki.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>User Content:</strong> You retain ownership of content you upload, but grant us permission to process it for the Service.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Third-Party Content:</strong> Respect all third-party intellectual property rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Disclaimers and Limitations
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>As-Is Service:</strong> The Service is provided "as is" without warranties of any kind.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>No Liability:</strong> We are not liable for any damages arising from use of the Service.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>User Risk:</strong> You use the Service at your own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Privacy
            </h2>
            <p className="text-gray-700 mb-4">
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Termination
            </h2>
            <p className="text-gray-700 mb-4">
              We may terminate or suspend access to the Service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              11. Changes to Terms
            </h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of the Service constitutes acceptance of modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              12. Governing Law
            </h2>
            <p className="text-gray-700 mb-4">
              These Terms are governed by and construed in accordance with applicable laws. Any disputes will be resolved in the appropriate jurisdiction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              13. Contact Information
            </h2>
            <p className="text-gray-700 mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Email:</strong> krishna21karki@gmail.com</li>
              <li><strong>Developer:</strong> Krishna Karki</li>
              <li><strong>Company:</strong> Leapfrog PVT LTD</li>
            </ul>
          </section>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600">
              By using Simple Tools for Daily Use, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService
