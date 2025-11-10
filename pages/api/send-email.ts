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
      subject: 'תודה שאישרתם את הגעתכם - לבת המצווה של אילה רחל מימון',
      html: `
        <!DOCTYPE html>
        <html dir="rtl">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            @media only screen and (max-width: 600px) {
              .event-links-table {
                width: 100% !important;
                border-spacing: 0 !important;
              }
              .event-link-cell {
                display: block !important;
                width: 100% !important;
                padding: 0 0 12px 0 !important;
              }
              .event-link-cell-last {
                padding-bottom: 0 !important;
              }
              .event-link-button {
                display: block !important;
                width: 100% !important;
                padding: 15px 0 !important;
                box-sizing: border-box !important;
                text-align: center !important;
              }
            }
          </style>
        </head>
        <body style="font-family: 'Assistant', 'Heebo', 'Inter', system-ui, -apple-system, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
        <table role="presentation" style="width: 100%; background-color: #fef7f0; direction: rtl;">
          <tr>
            <td style="padding: 10px 120px; position: relative;">
        <div style="font-family: 'Assistant', 'Heebo', 'Inter', system-ui, -apple-system, sans-serif; direction: rtl; text-align: right; width: 100%; position: relative;">
          
          <!-- Header Section -->
          <div style="text-align: center; margin-bottom: 30px; padding: 20px 0; max-width: 210px; margin-left: auto; margin-right: auto; position: relative; z-index: 1;">
            <div style="display: inline-block; width: 70px; height: 70px; margin-bottom: 15px; background: linear-gradient(135deg, #fef7f0 0%, #fffbeb 100%); border-radius: 50%; padding: 6px; box-shadow: 0 7px 12px -3px rgba(0, 0, 0, 0.09); border: 1px solid #fde68a;">
              <img src="https://raw.githubusercontent.com/feldy2/Ayala-Bat-Mitzvah-RSVP/refs/heads/main/public/logo.png" alt="Ayala Bat Mitzvah Logo" style="width: 100%; height: 100%; border-radius: 50%; object-fit: contain;" />
            </div>
            <h1 style="color: #BF7046; font-size: 28px; margin: 0;">בת המצווה של אילה רחל מימון</h1>
          </div>
          
          <!-- Main Content -->
          <div style="background: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 251, 235, 0.95)); padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); position: relative; z-index: 1;">
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
              אנו מאוד מתרגשים לחגוג איתכם!
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
                בית ספר יבנה, אליעזר אלתר 30, חיפה
              </p>
                <div style="text-align: center; background-color: #f3f4f6; padding: 30px 20px; border-radius: 8px; border: 2px solid #fde68a; margin: 20px 0;">
                  <p style="font-size: 18px; color: #BF7046; margin-bottom: 20px; font-weight: bold;">קישורים שימושיים לאירוע</p>
                  <table role="presentation" class="event-links-table" style="margin: 0 auto; border-collapse: separate; border-spacing: 15px 0;">
                    <tr>
                      <td class="event-link-cell" style="vertical-align: middle;">
                        <a href="https://maps.app.goo.gl/gw8zFeGbgLPdQsG37" 
                            class="event-link-button"
                            style="display: inline-block; background-color: #4285F4; color: white; padding: 15px 25px; text-decoration: none; border-radius: 8px; font-size: 15px; font-weight: bold;">
                          📍 Google Maps
                        </a>
                      </td>
                      <td class="event-link-cell" style="vertical-align: middle;">
                        <a href="https://waze.com/ul?ll=32.7743129,35.0121392&navigate=yes" 
                            class="event-link-button"
                            style="display: inline-block; background-color: #33CCFF; color: white; padding: 15px 25px; text-decoration: none; border-radius: 8px; font-size: 15px; font-weight: bold;">
                          🚗 Waze
                        </a>
                      </td>
                      <td class="event-link-cell event-link-cell-last" style="vertical-align: middle;">
                        <a href="https://calendar.google.com/calendar/u/0/r/eventedit?text=%D7%91%D7%AA+%D7%9E%D7%A6%D7%95%D7%95%D7%94+%D7%9C%D7%90%D7%99%D7%9C%D7%94+%D7%A8%D7%97%D7%9C+%D7%9E%D7%99%D7%9E%D7%95%D7%9F&dates=20241214T160000Z/20241214T200000Z&details=%D7%91%D7%95%D7%90%D7%95+%D7%9C%D7%97%D7%92%D7%95%D7%92+%D7%90%D7%99%D7%AA%D7%A0%D7%95+%D7%90%D7%AA+%D7%94%D7%92%D7%99%D7%A2%D7%AA%D7%94+%D7%A9%D7%9C+%D7%90%D7%99%D7%9C%D7%94+%D7%A8%D7%97%D7%9C+%D7%9C%D7%92%D7%99%D7%9C+%D7%9E%D7%A6%D7%95%D7%95%D7%AA&location=%D7%91%D7%99%D7%AA+%D7%A1%D7%A4%D7%A8+%D7%99%D7%91%D7%A0%D7%94%2C+%D7%90%D7%9C%D7%99%D7%A2%D7%96%D7%A8+%D7%90%D7%9C%D7%AA%D7%A8+30%2C+%D7%97%D7%99%D7%A4%D7%94"
                            class="event-link-button"
                            style="display: inline-block; background-color: #FBBF24; color: white; padding: 15px 25px; text-decoration: none; border-radius: 8px; font-size: 15px; font-weight: bold;">
                          🗓️ הוסף ליומן
                        </a>
                      </td>
                    </tr>
                  </table>
                  <p style="font-size: 14px; color: #6B7280; margin-top: 15px;">
                    נפגשים בשמחה! הנה כל מה שצריך
                  </p>
                </div>
              </div>
            </div>
          
          <div style="text-align: center; margin-top: 30px; color: #999; font-size: 14px; position: relative; z-index: 1;">
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

