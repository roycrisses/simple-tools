import React, { useState } from 'react'
import { X, Send, Mail } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG, TEMPLATE_PARAMS } from '../config/emailjs'

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

    // Check if EmailJS is properly configured
    const { serviceId, publicKey, templates, recipientEmail } = EMAILJS_CONFIG
    
    console.log('EmailJS Configuration:', { serviceId, templates, publicKey })
    
    // If EmailJS is not configured, use mailto fallback
    if (publicKey === 'YOUR_EMAILJS_PUBLIC_KEY') {
      // Fallback to mailto link
      const subject = encodeURIComponent(formData.subject)
      const body = encodeURIComponent(
        `From: ${formData.email}\n\nMessage:\n${formData.message}`
      )
      const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`
      
      window.open(mailtoLink, '_blank')
      
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
      
      setIsLoading(false)
      return
    }

    try {
      // Initialize EmailJS with your public key first
      emailjs.init(publicKey)
      
      // Send main contact email
      const contactParams = TEMPLATE_PARAMS.contactUs(formData)
      console.log('Sending contact email with params:', contactParams)
      
      const contactResult = await emailjs.send(serviceId, templates.contactUs, contactParams)
      console.log('Contact Email Success:', contactResult)
      
      // Try to send auto-reply email (optional)
      if (templates.autoReply) {
        try {
          const autoReplyParams = TEMPLATE_PARAMS.autoReply(formData)
          console.log('Sending auto-reply with params:', autoReplyParams)
          
          const autoReplyResult = await emailjs.send(serviceId, templates.autoReply, autoReplyParams)
          console.log('Auto-Reply Success:', autoReplyResult)
          
          setStatus({
            type: 'success',
            message: 'Email sent successfully! You should receive a confirmation email shortly.'
          })
        } catch (autoReplyError) {
          console.warn('Auto-reply failed, but main email was sent:', autoReplyError)
          setStatus({
            type: 'success',
            message: 'Email sent successfully! Thank you for reaching out.'
          })
        }
      } else {
        setStatus({
          type: 'success',
          message: 'Email sent successfully! Thank you for reaching out.'
        })
      }
      
      // Reset form
      setFormData({ subject: '', email: '', message: '' })
      
      // Close modal after 3 seconds
      setTimeout(() => {
        onClose()
        setStatus({ type: '', message: '' })
      }, 3000)
      
    } catch (error) {
      console.error('EmailJS Error Details:', error)
      
      // Show specific error message
      let errorMessage = 'Email sending failed. '
      if (error.text) {
        errorMessage += `Error: ${error.text}`
      } else if (error.message) {
        errorMessage += `Error: ${error.message}`
      } else {
        errorMessage += 'Please check your internet connection and try again.'
      }
      
      setStatus({
        type: 'error',
        message: errorMessage
      })
      
      // Reset form
      setFormData({ subject: '', email: '', message: '' })
      
      // Close modal after 3 seconds
      setTimeout(() => {
        onClose()
        setStatus({ type: '', message: '' })
      }, 3000)
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
