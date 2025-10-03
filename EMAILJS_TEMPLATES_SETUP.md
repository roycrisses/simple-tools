# EmailJS Templates Configuration

## Updated Template IDs

Your EmailJS service now uses the following templates:

### 1. Contact Us Template
- **Template ID**: `template_nz8wexk`
- **Purpose**: Receives contact form submissions from website visitors
- **Recipient**: krishna21karki@gmail.com (Krishna Karki)

### 2. Auto-Reply Template  
- **Template ID**: `template_fojt0w4`
- **Purpose**: Sends automatic confirmation emails to users who submit contact forms
- **Recipient**: The user who submitted the form

## Configuration Details

### Service Configuration
```javascript
{
  serviceId: 'service_m2zac2c',
  publicKey: 'FYMjXRdowosriER3r',
  recipientEmail: 'krishna21karki@gmail.com',
  recipientName: 'Krishna Karki'
}
```

### Template Parameters

#### Contact Us Template (`template_nz8wexk`)
- `from_name`: User's email address
- `from_email`: User's email address  
- `user_email`: User's email address
- `user_name`: User's email address
- `subject`: Form subject
- `message`: Form message
- `reply_to`: User's email address
- `to_name`: Krishna Karki
- `to_email`: krishna21karki@gmail.com

#### Auto-Reply Template (`template_fojt0w4`)
- `to_name`: User's name or email
- `to_email`: User's email address
- `user_name`: User's name or email
- `user_email`: User's email address
- `subject`: Original form subject
- `original_message`: User's original message
- `reply_message`: Automated thank you message
- `from_name`: Krishna Karki
- `from_email`: krishna21karki@gmail.com

## How It Works

1. **User submits contact form** → Triggers both templates
2. **Contact Us email** → Sent to you with the user's message
3. **Auto-Reply email** → Sent to the user as confirmation
4. **Fallback handling** → If auto-reply fails, contact email still goes through

## Template Setup in EmailJS Dashboard

Make sure your EmailJS templates include these variables:

### For Contact Us Template:
```
Subject: New Contact Form Submission: {{subject}}

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
Reply to: {{reply_to}}
```

### For Auto-Reply Template:
```
Subject: Thank you for contacting us - {{subject}}

Hi {{to_name}},

{{reply_message}}

Your original message:
"{{original_message}}"

Best regards,
{{from_name}}
{{from_email}}
```

## Files Updated

- `src/components/EmailModal.jsx` - Updated to use new template IDs and auto-reply
- `src/config/emailjs.js` - New configuration file for centralized EmailJS settings

## Testing

Test both templates by:
1. Submitting a contact form
2. Checking that you receive the contact email
3. Verifying the user receives an auto-reply confirmation
