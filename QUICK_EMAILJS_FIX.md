# Quick EmailJS Fix - Create Template Now

## The Issue
You're being redirected to Outlook because the EmailJS template `template_contact` doesn't exist yet, causing EmailJS to fail and fall back to mailto.

## Quick Solution - Create the Template

### Step 1: Go to EmailJS Dashboard
1. Visit [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Login with your account
3. Navigate to **Email Templates**

### Step 2: Create New Template
1. Click **"Create New Template"**
2. Set **Template ID:** `template_contact` (exactly this)
3. Set **Template Name:** "Simple Tools Contact Form"

### Step 3: Template Content
**Subject Line:**
```
New message from Simple Tools - {{subject}}
```

**Email Body:**
```
Hello Krishna,

You have received a new contact message from Simple Tools:

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from Simple Tools Contact Form
https://simple-tools.netlify.app
```

### Step 4: Save Template
1. Click **"Save"**
2. The template ID should be exactly: `template_contact`

## Test After Creating Template
1. Go to your website
2. Click any email icon/link
3. Fill out the modal form
4. Click "Send Email"
5. Should work without redirecting to Outlook!

## Alternative: Use Default Template
If you have any existing template in your EmailJS account, you can also:
1. Go to your EmailJS templates
2. Copy the Template ID of any existing template
3. Replace `template_contact` with that ID in the code

## Debug Information
The updated EmailModal now includes console logging. After creating the template:
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Try sending an email
4. Check the console messages for success/error details

## Expected Console Output (Success):
```
EmailJS Configuration: {serviceId: "service_m2zac2c", templateId: "template_contact", publicKey: "FYMjXRdowosriER3r"}
Attempting to send email with params: {from_name: "user@email.com", ...}
EmailJS Success: {status: 200, text: "OK"}
```

## Expected Console Output (Template Missing):
```
EmailJS Configuration: {serviceId: "service_m2zac2c", templateId: "template_contact", publicKey: "FYMjXRdowosriER3r"}
Attempting to send email with params: {from_name: "user@email.com", ...}
Template error, trying with default template: Error: Template not found
EmailJS Error (all attempts failed): Error: Template not found
```

Once you create the template with ID `template_contact`, the EmailJS modal should work perfectly without any redirects! 🚀
