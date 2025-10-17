import React, { useState } from 'react'
import { Mail, MapPin, Phone, Clock, Send, Github, Linkedin, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

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
    setSubmitStatus('')

    // EmailJS configuration using your existing setup
    const serviceId = 'service_vmr226m' // Your actual EmailJS service ID
    const templateId = 'template_contact_simple' // Using your new custom template
    const publicKey = 'uDq6qlTQPyKGHcrga' // Your actual EmailJS public key

    try {
      // Initialize EmailJS
      emailjs.init(publicKey)
      
      // Prepare template parameters - using exact same format as working EmailModal
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        user_email: formData.email,
        user_name: formData.name,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
        to_name: 'Krishna Karki',
        to_email: 'kris12karki@gmail.com'
      }

      console.log('Sending email with params:', templateParams)
      
      // Send main email to you
      const result = await emailjs.send(serviceId, templateId, templateParams)
      console.log('Main email sent successfully:', result)
      
      // Send auto-reply to user - try multiple variable names
      const autoReplyParams = {
        // Common recipient field names
        to_email: formData.email,
        to_name: formData.name,
        user_email: formData.email,
        user_name: formData.name,
        email: formData.email,
        name: formData.name,
        recipient_email: formData.email,
        recipient_name: formData.name,
        // Sender info
        from_name: 'Krishna Karki',
        from_email: 'kris12karki@gmail.com',
        reply_to: 'kris12karki@gmail.com',
        subject: `Thank you for contacting Simple Tools - ${formData.subject}`,
        message: `Thank you for your message about "${formData.subject}". We'll get back to you soon!`
      }
      
      // Try to send auto-reply, but don't fail if it doesn't work
      try {
        const autoReplyResult = await emailjs.send(serviceId, 'template_v5ukpui', autoReplyParams)
        console.log('Auto-reply sent successfully:', autoReplyResult)
      } catch (autoReplyError) {
        console.warn('Auto-reply failed (not critical):', autoReplyError)
        // Don't fail the whole process if auto-reply fails
      }
      
      setSubmitStatus('success')
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      
    } catch (error) {
      console.error('Email sending failed:', error)
      console.error('Error details:', {
        message: error.message,
        text: error.text,
        status: error.status
      })
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-white max-w-2xl mx-auto">
          Have questions, suggestions, or need help? We'd love to hear from you!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="clean-card p-8">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-6">
              Get in Touch
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Mail className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-400">Email</h3>
                  <p className="text-white">krishna21karki@gmail.com</p>
                  <p className="text-sm text-white">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <MapPin className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-400">Location</h3>
                  <p className="text-white">Kathmandu, Nepal</p>
                  <p className="text-sm text-white">
                    Leapfrog PVT LTD
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Clock className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-400">Response Time</h3>
                  <p className="text-white">24-48 hours</p>
                  <p className="text-sm text-white">
                    Monday to Friday, 9 AM - 6 PM (NPT)
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <h3 className="font-semibold text-yellow-400 mb-4">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/roycrisses"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-primary-100 transition-colors"
                >
                  <Github className="w-5 h-5 text-gray-600" />
                </a>
                <button
                  onClick={() => {
                    document.getElementById('message').focus()
                    document.getElementById('message').scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-primary-100 transition-colors"
                  title="Send us a message"
                >
                  <Mail className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Developer Info */}
          <div className="clean-card p-8">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-6">
              About the Developer
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-yellow-400">Krishna Karki</h3>
                <p className="text-white">Full Stack Developer</p>
              </div>
              <div>
                <p className="text-white">
                  🎓 IT Student from Kathmandu, Nepal
                </p>
                <p className="text-white">
                  🏢 Leapfrog PVT LTD
                </p>
              </div>
              <div>
                <p className="text-sm text-white">
                  Passionate about creating useful, free tools that make daily tasks easier for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="clean-card p-8">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-6">
            Send us a Message
          </h2>
          
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-green-700 font-medium">
                  Message sent successfully!
                </p>
                <p className="text-green-600 text-sm">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div>
                <p className="text-red-700 font-medium">
                  Failed to send message
                </p>
                <p className="text-red-600 text-sm">
                  Please try again or contact us directly at krishna21karki@gmail.com
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="clean-input"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="clean-input"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="clean-input"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="clean-input"
                placeholder="Tell us more about your question or feedback..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="clean-btn clean-btn-primary w-full"
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

          <div className="mt-6 text-sm text-white">
            <p>
              * Required fields. We respect your privacy and will never share your information.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 clean-card p-8">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-yellow-400 mb-2">
              Are your tools really free?
            </h3>
            <p className="text-white text-sm">
              Yes! All our tools are completely free to use with no hidden costs or premium features.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-yellow-400 mb-2">
              Do you store my files?
            </h3>
            <p className="text-white text-sm">
              No, we process files temporarily and delete them automatically. We don't store your data.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-yellow-400 mb-2">
              Can I suggest new tools?
            </h3>
            <p className="text-white text-sm">
              Absolutely! We love hearing ideas for new tools. Send us your suggestions via the contact form.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-yellow-400 mb-2">
              Is the site mobile-friendly?
            </h3>
            <p className="text-white text-sm">
              Yes, all our tools are fully responsive and work great on mobile devices and tablets.
            </p>
          </div>
        </div>
      </div>
    </div>
      
    </div>
  )
}

export default Contact
