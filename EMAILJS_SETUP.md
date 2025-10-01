# EmailJS Setup Instructions

## Overview
The EmailJS functionality has been implemented with service ID `service_m2zac2c`. To complete the setup, you need to configure EmailJS with your account details.

## Steps to Complete Setup

### 1. EmailJS Account Setup
1. Go to [EmailJS.com](https://www.emailjs.com/) and create an account
2. Create a new service with ID: `service_m2zac2c`
3. Connect your email service (Gmail, Outlook, etc.)

### 2. Create Email Template
1. In your EmailJS dashboard, create a new email template
2. Use template ID: `template_default` (or update the code with your preferred ID)
3. Template variables to include:
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Email message content
   - `{{to_email}}` - Your receiving email

### 3. Update Configuration
Update the following values in `src/components/EmailModal.jsx`:

```javascript
// Line ~28-30: Update these values
const serviceId = 'service_m2zac2c'  // Keep this as is
const templateId = 'YOUR_TEMPLATE_ID'  // Replace with your template ID
const publicKey = 'YOUR_PUBLIC_KEY'    // Replace with your EmailJS public key

// Line ~34: Update with your email
to_email: 'your-email@example.com'     // Replace with your actual email
```

### 4. Get Your Public Key
1. In EmailJS dashboard, go to Account > API Keys
2. Copy your Public Key
3. Replace `YOUR_PUBLIC_KEY` in the EmailModal component

### 5. Test the Implementation
1. Run your development server: `npm run dev`
2. Navigate to the About page
3. Click "Send Email" button
4. Fill out the form and test sending

## Security Notes
- Never commit your actual EmailJS keys to version control
- Consider using environment variables for production
- The current implementation includes basic validation and error handling

## Template Example
Here's a sample EmailJS template you can use:

**Subject:** New message from {{subject}}

**Body:**
```
You have received a new message from Simple Tools website:

From: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent via Simple Tools Contact Form
```

## Troubleshooting
- Ensure your EmailJS service is active
- Check that template variables match exactly
- Verify your public key is correct
- Check browser console for any error messages
