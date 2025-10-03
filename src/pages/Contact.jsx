import React, { useState } from 'react'
import { Mail, MapPin, Phone, Clock, Send, Github, Linkedin } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission (you can integrate with EmailJS or other service)
    setTimeout(() => {
      setSubmitStatus('success')
      setIsSubmitting(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 2000)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Have questions, suggestions, or need help? We'd love to hear from you!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Get in Touch
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">krishna21karki@gmail.com</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Location</h3>
                  <p className="text-gray-600 dark:text-gray-300">Kathmandu, Nepal</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Leapfrog PVT LTD
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Response Time</h3>
                  <p className="text-gray-600 dark:text-gray-300">24-48 hours</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Monday to Friday, 9 AM - 6 PM (NPT)
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/roycrisses"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
                >
                  <Github className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </a>
                <a
                  href="mailto:krishna21karki@gmail.com"
                  className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
                >
                  <Mail className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Developer Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              About the Developer
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Krishna Karki</h3>
                <p className="text-gray-600 dark:text-gray-300">Full Stack Developer</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300">
                  🎓 IT Student from Kathmandu, Nepal
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  🏢 Leapfrog PVT LTD
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Passionate about creating useful, free tools that make daily tasks easier for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Send us a Message
          </h2>
          
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 rounded-lg">
              <p className="text-green-700 dark:text-green-300">
                Thank you for your message! We'll get back to you soon.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Tell us more about your question or feedback..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            <p>
              * Required fields. We respect your privacy and will never share your information.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Are your tools really free?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Yes! All our tools are completely free to use with no hidden costs or premium features.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Do you store my files?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              No, we process files temporarily and delete them automatically. We don't store your data.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Can I suggest new tools?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Absolutely! We love hearing ideas for new tools. Send us your suggestions via the contact form.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Is the site mobile-friendly?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Yes, all our tools are fully responsive and work great on mobile devices and tablets.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
