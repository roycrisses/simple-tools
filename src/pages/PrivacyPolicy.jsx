import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Simple Tools is designed with privacy in mind. We collect minimal information to provide our services:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
              <li><strong>Usage Data:</strong> We may collect anonymous usage statistics to improve our services</li>
              <li><strong>Files:</strong> Files you upload are processed temporarily and automatically deleted</li>
              <li><strong>Cookies:</strong> We use essential cookies for site functionality and analytics</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
              <li>To provide and maintain our tools and services</li>
              <li>To improve user experience and site functionality</li>
              <li>To analyze usage patterns and optimize performance</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Data Processing and Storage
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Local Processing:</strong> Most tools process data locally in your browser when possible.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Temporary Storage:</strong> Files uploaded to our servers are processed immediately and deleted automatically. We do not permanently store your files.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>No Personal Data:</strong> We do not require registration or collect personal information like names, emails, or addresses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Third-Party Services
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our website may use third-party services that have their own privacy policies:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
              <li><strong>Google AdSense:</strong> For displaying advertisements (see Google's Privacy Policy)</li>
              <li><strong>Analytics Services:</strong> For understanding site usage patterns</li>
              <li><strong>CDN Services:</strong> For faster content delivery</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Cookies and Tracking
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We use cookies and similar technologies for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
              <li>Remembering your theme preferences (dark/light mode)</li>
              <li>Analytics and performance monitoring</li>
              <li>Advertising (through Google AdSense)</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You can control cookies through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Data Security
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We implement appropriate security measures to protect your data:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
              <li>HTTPS encryption for all data transmission</li>
              <li>Automatic deletion of temporary files</li>
              <li>Regular security updates and monitoring</li>
              <li>No permanent storage of user files</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Your Rights
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Since we don't collect personal data, most data protection rights don't apply. However:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
              <li>You can disable cookies in your browser</li>
              <li>You can contact us with any privacy concerns</li>
              <li>You can stop using our services at any time</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. Children's Privacy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              9. Changes to This Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              10. Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
              <li><strong>Email:</strong> krishna21karki@gmail.com</li>
              <li><strong>Website:</strong> Simple Tools for Daily Use</li>
              <li><strong>Developer:</strong> Krishna Karki</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
