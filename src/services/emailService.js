// EmailJS Service using CDN method
import { showNotification } from '../utils/notifications';

export class EmailService {
  constructor() {
    this.serviceId = 'service_m2zac2c';
    this.templateId = 'template_nzlbwsk';
    this.publicKey = 'FYMjXRdowosriER3r';
    this.recipientEmail = 'krishna21karki@gmail.com';
    
    // Initialize EmailJS when the service is created
    this.init();
  }

  init() {
    // Check if EmailJS is available (loaded from CDN)
    if (typeof window !== 'undefined' && window.emailjs) {
      window.emailjs.init(this.publicKey);
      console.log('EmailJS initialized with CDN method');
    } else {
      console.warn('EmailJS not loaded from CDN');
    }
  }

  async sendContactEmail(formData) {
    return new Promise((resolve, reject) => {
      // Check if EmailJS is available
      if (!window.emailjs) {
        reject(new Error('EmailJS not loaded'));
        return;
      }

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name || formData.email,
        from_email: formData.email,
        user_email: formData.email,
        user_name: formData.name || formData.email,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
        to_name: 'Krishna Karki',
        to_email: this.recipientEmail
      };

      console.log('Sending email with CDN method:', templateParams);

      // Send email using CDN method
      window.emailjs.send(this.serviceId, this.templateId, templateParams)
        .then((response) => {
          console.log('Email sent successfully:', response);
          resolve(response);
        })
        .catch((error) => {
          console.error('Email sending failed:', error);
          reject(error);
        });
    });
  }

  // Method to send email using form element directly
  async sendFormEmail(formElement) {
    return new Promise((resolve, reject) => {
      if (!window.emailjs) {
        reject(new Error('EmailJS not loaded'));
        return;
      }

      window.emailjs.sendForm(this.serviceId, this.templateId, formElement)
        .then((response) => {
          console.log('Form email sent successfully:', response);
          resolve(response);
        })
        .catch((error) => {
          console.error('Form email sending failed:', error);
          reject(error);
        });
    });
  }

  // Fallback to mailto if EmailJS fails
  openMailtoFallback(formData) {
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `From: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:${this.recipientEmail}?subject=${subject}&body=${body}`;
    
    window.open(mailtoLink, '_blank');
  }
}

// Create singleton instance
export const emailService = new EmailService();
