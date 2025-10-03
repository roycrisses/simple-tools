import React, { useState } from 'react'
import { X, Send, Mail } from 'lucide-react'
import { emailService } from '../services/emailService'

const EmailModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    subject: '',
    email: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus({ type: '', message: '' })

    try {
      // Use the new EmailJS CDN service
      await emailService.sendContactEmail(formData)
      
      setStatus({
        type: 'success',
        message: 'Email sent successfully! Thank you for reaching out.'
      })
      
      // Reset form
      setFormData({ subject: '', email: '', message: '' })
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose()
        setStatus({ type: '', message: '' })
      }, 2000)
      
    } catch (error) {
      console.error('Email sending failed:', error)
      
      // Try mailto fallback
      try {
        emailService.openMailtoFallback(formData)
        setStatus({
          type: 'success',
          message: 'Opening your default email client. Please send the email from there.'
        })
        
        // Reset form
        setFormData({ subject: '', email: '', message: '' })
        
        // Close modal after 3 seconds
        setTimeout(() => {
          onClose()
          setStatus({ type: '', message: '' })
        }, 3000)
        
      } catch (fallbackError) {
        // Show error message
        let errorMessage = 'Email sending failed. '
        if (error.text) {
          errorMessage += `Error: ${error.text}`
        } else if (error.message) {
          errorMessage += `Error: ${error.message}`
        } else {
          errorMessage += 'Please try again or contact us directly.'
        }
        
        setStatus({
          type: 'error',
          message: errorMessage
        })
        
        // Close modal after 4 seconds
        setTimeout(() => {
          onClose()
          setStatus({ type: '', message: '' })
        }, 4000)
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Send Email
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="your.email@example.com"
              disabled={isLoading}
            />
          </div>

          {/* Subject Field */}
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
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="What's this about?"
              disabled={isLoading}
            />
          </div>

          {/* Message Field */}
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
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              placeholder="Tell us about your suggestion, bug report, or feedback..."
              disabled={isLoading}
            />
          </div>

          {/* Status Message */}
          {status.message && (
            <div className={`p-3 rounded-lg ${
              status.type === 'success' 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700'
                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-700'
            }`}>
              <p className="text-sm font-medium">{status.message}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !formData.email || !formData.subject || !formData.message}
              className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Email</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Note */}
        <div className="px-6 pb-6">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Your email will be sent securely. We respect your privacy and won't share your information.
          </p>
        </div>
      </div>
    </div>
  )
}

export default EmailModal
