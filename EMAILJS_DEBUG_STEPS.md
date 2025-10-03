# EmailJS Debug Steps - Fix "Email Send Failed"

## Current Issue
EmailJS is failing to send emails even with the correct template ID `template_zqnraj`.

## Debug Steps

### Step 1: Check Browser Console
1. Open your website
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Try sending an email
5. Look for these messages:

**Expected Console Output:**
```
EmailJS Configuration: {serviceId: "service_m2zac2c", templateId: "template_zqnraj", publicKey: "FYMjXRdowosriER3r"}
Attempting to send email with params: {...}
EmailJS Error Details: [Error object with details]
```

### Step 2: Check Template Variables
The issue is likely that your "Contact Us" template expects different variable names.

**Go to your EmailJS Dashboard:**
1. Click on "Contact Us" template (template_zqnraj)
2. Look at the template content
3. Note what variables it uses (like {{name}}, {{email}}, {{message}}, etc.)

**Common template variables:**
- {{name}} or {{user_name}} or {{from_name}}
- {{email}} or {{user_email}} or {{from_email}}
- {{message}} or {{user_message}}
- {{subject}} or {{user_subject}}

### Step 3: Quick Test with EmailJS Test Feature
1. In your EmailJS dashboard
2. Go to the "Contact Us" template
3. Click "Test" button
4. See what variables it expects
5. Send a test email to verify the template works

### Step 4: Alternative - Use Auto-Reply Template
If "Contact Us" template doesn't work, try the "Auto-Reply" template:
1. Note its Template ID from your dashboard
2. Replace `template_zqnraj` with the Auto-Reply template ID

### Step 5: Check Service Connection
1. In EmailJS dashboard, go to Email Services
2. Make sure Gmail service is properly connected
3. Check if there are any error messages

## Quick Fix Options

### Option 1: Use sendForm instead of send
EmailJS has two methods:
- `emailjs.send()` - requires exact variable matching
- `emailjs.sendForm()` - more flexible with form data

### Option 2: Create New Simple Template
Create a new template with these exact variables:
- {{from_name}}
- {{from_email}}
- {{subject}}
- {{message}}

Template content:
```
Subject: New Contact from Simple Tools - {{subject}}

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}
```

### Option 3: Check CORS and Domain Settings
1. In EmailJS dashboard, check if your domain is allowed
2. Make sure there are no CORS restrictions

## Most Likely Issues

1. **Template Variable Mismatch** - Your template expects different variable names
2. **Service Not Connected** - Gmail service might have connection issues
3. **Domain Restrictions** - EmailJS might be blocking your domain
4. **Rate Limiting** - Too many requests in short time

## Next Steps

1. **Check console for exact error message**
2. **Verify template variables in EmailJS dashboard**
3. **Test the template directly in EmailJS dashboard**
4. **Try with a different/simpler template**

Once you check the console error and template variables, we can fix the exact issue! 🔧
