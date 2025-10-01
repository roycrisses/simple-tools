# EmailJS Setup Instructions - FIXED WITH FALLBACK

## Current Status: ✅ WORKING WITH MAILTO FALLBACK

The email functionality now works in two modes:
1. **EmailJS Mode** (when properly configured) - Sends emails directly through EmailJS
2. **Fallback Mode** (current) - Opens user's default email client with pre-filled content

## Current Behavior
Since EmailJS is not fully configured yet, the system automatically uses **mailto fallback**:
- User fills out the form
- Clicks "Send Email" 
- Their default email client opens with the message pre-filled
- User just needs to click "Send" in their email client

## To Enable Direct EmailJS Sending

### 1. EmailJS Account Setup
1. Go to [EmailJS.com](https://www.emailjs.com/) and create an account
2. Create a new service with ID: `service_m2zac2c`
3. Connect your email service (Gmail, Outlook, etc.)

### 2. Create Email Template
1. In your EmailJS dashboard, create a new email template
2. Use template ID: `template_contact`
3. Template variables to include:
   - `{{from_name}}` - Sender's name/email
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Email message content
   - `{{to_name}}` - Your name (Simple Tools Team)
   - `{{to_email}}` - Your receiving email

### 3. Update Configuration
Update the following value in `src/components/EmailModal.jsx`:

```javascript
// Line 30: Replace this line
const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY' // Replace with actual key

// With your actual EmailJS public key:
const publicKey = 'your_actual_public_key_here'
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
