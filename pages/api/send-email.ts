import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface EmailRequest {
  to: string;
  name: string;
  attending: string;
  guests?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const { to, name, attending, guests } = req.body as EmailRequest;

    // Basic validation
    if (!to || !name || !attending) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Email validation
    const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(to)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Email credentials not configured');
      return res.status(500).json({
        success: false,
        message: 'Email service not configured. Please set up environment variables.'
      });
    }

    console.log('Using email:', process.env.EMAIL_USER);
    console.log('Password length:', process.env.EMAIL_PASSWORD?.length);

    // Create transporter with explicit settings
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Prepare email content
    const attendingText = attending === 'yes' ? 'כן' : 'לא';
    const guestsText = attending === 'yes' && guests ? ` (${guests} אנשים)` : '';
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: 'תודה שאישרתם הגעה - בת מצווה של אילה רחל מימון',
      html: `
        <!DOCTYPE html>
        <html dir="rtl">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Assistant', 'Heebo', 'Inter', system-ui, -apple-system, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
        <table role="presentation" style="width: 100%; background-color: #fef7f0; direction: rtl;">
          <tr>
            <td style="padding: 20px; position: relative;">
        <div style="font-family: 'Assistant', 'Heebo', 'Inter', system-ui, -apple-system, sans-serif; direction: rtl; text-align: right; width: 100%; background-color: #fef7f0; position: relative;">
          
          <!-- Decorative Leaves in Corners -->
          <div style="position: absolute; top: 0; left: 0; width: 200px; height: 200px; opacity: 0.3;">
            <img src="https://raw.githubusercontent.com/feldy2/Ayala-Bat-Mitzvah-RSVP/refs/heads/main/public/leaves-left-up.png" alt="Leaves" style="width: 100%; height: 100%; object-fit: contain;" />
          </div>
          <div style="position: absolute; top: 0; right: 0; width: 200px; height: 200px; opacity: 0.3;">
            <img src="https://raw.githubusercontent.com/feldy2/Ayala-Bat-Mitzvah-RSVP/refs/heads/main/public/leaves-right-up.png" alt="Leaves" style="width: 100%; height: 100%; object-fit: contain;" />
          </div>
          
          <!-- Header Section -->
          <div style="text-align: center; margin-bottom: 30px; padding: 20px 0;">
            <div style="display: inline-block; width: 80px; height: 80px; margin-bottom: 15px; background: linear-gradient(135deg, #fef7f0 0%, #fffbeb 100%); border-radius: 50%; padding: 8px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border: 1px solid #fde68a;">
              <img src="https://raw.githubusercontent.com/feldy2/Ayala-Bat-Mitzvah-RSVP/refs/heads/main/public/logo.png" alt="Ayala Bat Mitzvah Logo" style="width: 100%; height: 100%; border-radius: 50%; object-fit: contain;" />
            </div>
            <h1 style="color: #BF7046; font-size: 28px; margin: 0;">בת מצווה של אילה רחל מימון</h1>
          </div>
          
          <!-- Main Content -->
          <div style="background: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 251, 235, 0.95)); padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #BF7046; font-size: 24px; margin-top: 0; font-weight: bold;">${name}, שלום!</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #4B5563;">
              תודה רבה שאישרתם את הגעתכם לחגיגת בת המצווה של אילה רחל!
            </p>
            
            <div style="background: linear-gradient(135deg, #fef7f0 0%, #fffbeb 100%); padding: 20px; border-radius: 10px; margin: 20px 0; border: 1px solid #fde68a;">
              <h3 style="color: #BF7046; margin-top: 0;">פרטי האישור:</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin: 10px 0; font-size: 16px; color: #4B5563;">
                  <strong style="color: #BF7046;">שם:</strong> ${name}
                </li>
                <li style="margin: 10px 0; font-size: 16px; color: #4B5563;">
                  <strong style="color: #BF7046;">מגיעים:</strong> ${attendingText}${guestsText}
                </li>
              </ul>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #4B5563;">
              אנו מאוד מתרגשים לחגוג איתכם! בקרוב תקבלו פרטים נוספים על האירוע.
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #4B5563; margin-top: 30px;">
              אם יש לכם שאלות, אנא צרו קשר:
            </p>
            <div style="display: table; width: 100%; margin: 10px 0; background-color: #f9fafb; border-radius: 8px;">
              <div style="display: table-cell; width: 50%; padding: 10px; vertical-align: top;">
                <p style="font-weight: bold; margin: 5px 0; color: #BF7046;">מוריה:</p>
                <ul style="list-style: none; padding: 0; margin: 5px 0;">
                  <li style="margin: 3px 0; color: #4B5563;">📞 050-8551995</li>
                  <li style="margin: 3px 0; color: #4B5563;">✉️ feldy2@gmail.com</li>
                </ul>
              </div>
              <div style="display: table-cell; width: 50%; padding: 10px; vertical-align: top;">
                <p style="font-weight: bold; margin: 5px 0; color: #BF7046;">עדי:</p>
                <ul style="list-style: none; padding: 0; margin: 5px 0;">
                  <li style="margin: 3px 0; color: #4B5563;">📞 054-5991336</li>
                  <li style="margin: 3px 0; color: #4B5563;">✉️ mywitnes@gmail.com</li>
                </ul>
              </div>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #4B5563; margin-top: 30px;">
              מחכים לראות אתכם,<br>
              <strong style="color: #BF7046;">משפחת מימון</strong>
            </p>
            
            <div style="margin-top: 30px;">
              <h3 style="color: #BF7046; font-size: 20px; margin-bottom: 15px;">מיקום האירוע:</h3>
              <p style="font-size: 16px; color: #4B5563; margin-bottom: 15px;">
                אליעזר אלתר 30, חיפה
              </p>
              <div style="width: 100%; overflow: hidden; border-radius: 8px; margin: 10px 0;">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.6766684765826!2d35.01213920000001!3d32.7743129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151dbaea3f17951d%3A0xba0ac798a3d767ee!2z15HXmSLXoSDXoteZ16jXldeg15kg15nXkdeg15Q!5e0!3m2!1siw!2sil!4v1761556424221!5m2!1siw!2sil" 
                  width="100%" 
                  height="300" 
                  style="border:0;" 
                  allowfullscreen="" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
              <p style="text-align: center; margin-top: 10px;">
                <a href="https://maps.google.com/?q=32.7743129,35.0121392" 
                   style="color: #d97706; text-decoration: none; font-size: 14px; font-weight: bold;">
                  📍 פתח במפות Google
                </a>
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #999; font-size: 14px;">
            <p>זהו מייל אוטומטי, אנא אל תשיבו למייל זה</p>
          </div>
        </div>
            </td>
          </tr>
        </table>
        </body>
        </html>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Full error:', errorMessage);
    
    // Check for authentication error
    if (error instanceof Error && error.message.includes('Invalid login')) {
      console.error('Gmail authentication failed. Make sure you are using a Gmail App Password, not your regular password.');
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please check Gmail App Password settings.',
      error: errorMessage
    });
  }
}

