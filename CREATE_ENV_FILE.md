# Create .env.local File

You need to create a file named `.env.local` in the root directory of the project.

## Location
The file should be located here:
```
c:\Users\moriya.mimon\bat-mitzvah-rsvp-project\Ayala-Bat-Mitzvah-RSVP\.env.local
```

## File Contents

Copy and paste the following into your `.env.local` file:

```env
# Email Configuration for Bat Mitzvah RSVP
# 
# IMPORTANT: You need to replace these values with your actual credentials
#
# To get your Gmail App Password:
# 1. Go to Google Account settings (https://myaccount.google.com/)
# 2. Click on "Security" in the left sidebar
# 3. Enable "2-Step Verification" if not already enabled
# 4. Scroll down and click on "App passwords" under "Signing in to Google"
# 5. Select "Mail" as the app and "Other (Custom name)" as the device
# 6. Enter "Bat Mitzvah RSVP" as the name and click "Generate"
# 7. Copy the 16-character password and paste it below (replace YOUR_APP_PASSWORD)
#
# DO NOT use your regular Gmail password - it won't work!

EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASSWORD=YOUR_APP_PASSWORD

# Notion configuration (optional, required for logging RSVPs to Notion)
NOTION_API_KEY=your-notion-integration-secret
NOTION_DATABASE_ID=your-notion-database-id
```

## Steps to Setup

1. Create a new file in your project root directory (same level as package.json)
2. Name it exactly: `.env.local`
3. Copy the contents above into the file
4. Replace `your-gmail-address@gmail.com` with your actual Gmail address
5. Replace `YOUR_APP_PASSWORD` with the 16-character app password from Google
6. Save the file
7. Restart your Next.js server (npm run dev)

## Example

Your `.env.local` file should look something like this (with your actual credentials):

```env
EMAIL_USER=feldy2@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

**Note**: If your app password has spaces, you can include them or remove them - both work.

## Important

- This file should NEVER be committed to git (it's already in .gitignore)
- Keep your credentials private and secure
- After creating this file, restart your Next.js development server


