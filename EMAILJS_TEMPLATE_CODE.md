# EmailJS Template Code

## 📧 Template for Your EmailJS Dashboard

### **Template Settings:**
- **Template Name:** Simple Tools Contact Form
- **Template ID:** `template_contact_simple` (you can use this ID)

### **Subject Line:**
```
New Contact from Simple Tools - {{subject}}
```

### **Email Body (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f97316; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { background-color: white; padding: 10px; border-radius: 4px; margin-top: 5px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Contact from Simple Tools</h2>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="label">From:</div>
                <div class="value">{{from_name}} ({{from_email}})</div>
            </div>
            
            <div class="field">
                <div class="label">Subject:</div>
                <div class="value">{{subject}}</div>
            </div>
            
            <div class="field">
                <div class="label">Message:</div>
                <div class="value">{{message}}</div>
            </div>
            
            <div class="field">
                <div class="label">Reply To:</div>
                <div class="value">{{reply_to}}</div>
            </div>
        </div>
        
        <div class="footer">
            <p>This message was sent through the Simple Tools contact form.</p>
            <p>Website: <a href="https://simple-tools.netlify.app">Simple Tools</a></p>
        </div>
    </div>
</body>
</html>
```

### **Email Body (Plain Text Alternative):**
```
New Contact from Simple Tools

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

Reply To: {{reply_to}}

---
This message was sent through the Simple Tools contact form.
Website: https://simple-tools.netlify.app
```

## 🔧 How to Create This Template

### **Step 1: Go to EmailJS Dashboard**
1. Visit [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Login with your kris12karki@gmail.com account
3. Navigate to **"Email Templates"**

### **Step 2: Create New Template**
1. Click **"Create New Template"**
2. Set **Template ID:** `template_contact_simple`
3. Set **Template Name:** "Simple Tools Contact Form"

### **Step 3: Add Template Content**
1. **Subject:** Copy the subject line above
2. **Content:** Copy the HTML body above
3. **Variables Used:**
   - `{{from_name}}` - Sender's name/email
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Email message
   - `{{reply_to}}` - Reply-to email

### **Step 4: Save Template**
1. Click **"Save"**
2. Make sure it's **Active/Published**
3. Note the Template ID: `template_contact_simple`

## 🚀 Update Code After Creating Template

Once you create this template, I'll update your EmailJS service to use:
```javascript
this.templateId = 'template_contact_simple';
```

## ✅ Template Variables

This template expects these variables (which your code already sends):
- `from_name` ✅
- `from_email` ✅  
- `subject` ✅
- `message` ✅
- `reply_to` ✅

## 📋 Benefits of This Template

- **Professional Design** - Clean, branded appearance
- **All Information** - Shows sender, subject, message clearly
- **Reply-Ready** - Easy to reply directly to sender
- **Responsive** - Works on all email clients
- **Branded** - Includes your Simple Tools branding

Create this template in your EmailJS dashboard, then let me know when it's ready and I'll update the code to use `template_contact_simple`! 🎯
