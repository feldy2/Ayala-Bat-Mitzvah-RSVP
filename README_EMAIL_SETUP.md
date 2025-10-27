# Email Service Setup Instructions

## Setting Up Automatic Email Notifications

### Step 1: Create Environment Variables File

Create a file named `.env.local` in the root directory of the project with the following content:

```env
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

### Step 2: Get Gmail App Password

**Important**: You cannot use your regular Gmail password. You need to create an App Password:

1. Go to your Google Account settings
2. Click on **Security** in the left sidebar
3. Enable **2-Step Verification** (if not already enabled)
4. Scroll down and click on **App passwords** under "Signing in to Google"
5. Select **Mail** as the app and **Other (Custom name)** as the device
6. Enter "Bat Mitzvah RSVP" as the name
7. Click **Generate**
8. Copy the 16-character password (no spaces) and paste it into `.env.local`

### Step 3: Install Dependencies

Run the following command to install nodemailer:

```bash
npm install
```

### Step 4: Restart the Server

After creating the `.env.local` file, restart your Next.js development server:

```bash
npm run dev
```

## Troubleshooting

### "Invalid login" error
- Make sure you're using an App Password, not your regular Gmail password
- Verify 2-Step Verification is enabled

### "Less secure app" error
- This shouldn't happen with App Passwords, but if it does, you may need to enable "less secure app access" (not recommended)

### Email not sending
- Check that your `.env.local` file exists in the root directory
- Verify the environment variables are set correctly
- Check server console for error messages

## Alternative: Use a Different Email Service

If Gmail doesn't work for you, you can modify the transporter in `pages/api/send-email.ts` to use:
- Outlook/Office 365
- SendGrid
- Mailgun
- AWS SES
- Any SMTP service

Simply update the `transporter` configuration with the appropriate SMTP settings.

