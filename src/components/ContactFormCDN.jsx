import React, { useEffect, useRef, useState } from 'react';
import { Send, Mail, User, MessageSquare } from 'lucide-react';
import { showNotification } from '../utils/notifications';

const ContactFormCDN = () => {
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailJSReady, setIsEmailJSReady] = useState(false);

  // EmailJS Configuration
  const SERVICE_ID = 'service_m2zac2c';
  const TEMPLATE_ID = 'template_nzlbwsk';
  const PUBLIC_KEY = 'FYMjXRdowosriER3r';

  useEffect(() => {
    // Check if EmailJS is loaded and initialize
    const initEmailJS = () => {
      if (window.emailjs) {
        window.emailjs.init(PUBLIC_KEY);
        setIsEmailJSReady(true);
        console.log('EmailJS initialized successfully');
      } else {
        console.warn('EmailJS not loaded from CDN');
        // Retry after a short delay
        setTimeout(initEmailJS, 1000);
      }
    };

    initEmailJS();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isEmailJSReady) {
      showNotification('Email service not ready. Please try again.', 'error');
      return;
    }

    setIsLoading(true);

    // Use EmailJS sendForm method directly with the form element
    window.emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current)
      .then((response) => {
        console.log('Email sent successfully:', response);
        showNotification('Message sent successfully!', 'success');
        
        // Reset form
        formRef.current.reset();
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        showNotification('Failed to send message. Please try again.', 'error');
        
        // Fallback to mailto
        const formData = new FormData(formRef.current);
        const subject = encodeURIComponent(formData.get('subject') || 'Contact Form Message');
        const message = encodeURIComponent(
          `From: ${formData.get('from_name')} (${formData.get('from_email')})\n\nMessage:\n${formData.get('message')}`
        );
        const mailtoLink = `mailto:krishna21karki@gmail.com?subject=${subject}&body=${message}`;
        
        setTimeout(() => {
          window.open(mailtoLink, '_blank');
          showNotification('Opening your default email client...', 'info');
        }, 2000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Contact Us
        </h2>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="from_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <User className="inline h-4 w-4 mr-1" />
            Your Name *
          </label>
          <input
            type="text"
            id="from_name"
            name="from_name"
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Your full name"
            disabled={isLoading}
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="from_email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Mail className="inline h-4 w-4 mr-1" />
            Your Email *
          </label>
          <input
            type="email"
            id="from_email"
            name="from_email"
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
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="What's this about?"
            disabled={isLoading}
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <MessageSquare className="inline h-4 w-4 mr-1" />
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            placeholder="Tell us about your suggestion, bug report, or feedback..."
            disabled={isLoading}
          />
        </div>

        {/* Hidden fields for EmailJS template */}
        <input type="hidden" name="to_name" value="Krishna Karki" />
        <input type="hidden" name="to_email" value="krishna21karki@gmail.com" />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !isEmailJSReady}
          className="w-full inline-flex items-center justify-center space-x-2 px-4 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </>
          )}
        </button>

        {/* Status indicator */}
        <div className="text-center">
          <p className={`text-xs ${isEmailJSReady ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
            {isEmailJSReady ? '✓ Email service ready' : '⏳ Loading email service...'}
          </p>
        </div>
      </form>

      {/* Footer Note */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Your email will be sent securely. We respect your privacy and won't share your information.
        </p>
      </div>
    </div>
  );
};

export default ContactFormCDN;
