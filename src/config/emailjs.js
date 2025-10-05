// EmailJS Configuration
export const EMAILJS_CONFIG = {
  serviceId: 'service_vmr226m',
  publicKey: 'uDq6qlTQPyKGHcrga',
  templates: {
    contact: 'template_contact_simple',
    autoReply: 'template_v5ukpui'
  },
  recipientEmail: 'kris12karki@gmail.com',
  recipientName: 'Krishna Karki'
}

// Template parameter mappings for different use cases
export const TEMPLATE_PARAMS = {
  contact: (formData) => ({
    from_name: formData.name,
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
