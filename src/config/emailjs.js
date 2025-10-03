// EmailJS Configuration
export const EMAILJS_CONFIG = {
  serviceId: 'service_m2zac2c',
  publicKey: 'FYMjXRdowosriER3r',
  templates: {
    contactUs: 'template_nzlbwsk',    // Working Contact Us template
    autoReply: 'template_fojt0w4'     // Auto-Reply template (optional)
  },
  recipientEmail: 'krishna21karki@gmail.com',
  recipientName: 'Krishna Karki'
}

// Template parameter mappings for different use cases
export const TEMPLATE_PARAMS = {
  contactUs: (formData) => ({
    from_name: formData.email,
    from_email: formData.email,
    user_email: formData.email,
    user_name: formData.email,
    subject: formData.subject,
    message: formData.message,
    reply_to: formData.email,
    to_name: EMAILJS_CONFIG.recipientName,
    to_email: EMAILJS_CONFIG.recipientEmail
  }),
  
  autoReply: (formData) => ({
    to_name: formData.name || formData.email,
    to_email: formData.email,
    user_name: formData.name || formData.email,
    user_email: formData.email,
    subject: formData.subject,
    original_message: formData.message,
    reply_message: `Thank you for contacting us! We have received your message about "${formData.subject}" and will get back to you soon.`,
    from_name: EMAILJS_CONFIG.recipientName,
    from_email: EMAILJS_CONFIG.recipientEmail
  })
}
