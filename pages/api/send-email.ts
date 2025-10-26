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

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
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
        <div style="font-family: 'Assistant', 'Heebo', Arial, sans-serif; direction: rtl; text-align: right; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fef7f0;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #8d4634; font-size: 28px; margin: 0;">בת מצווה של אילה רחל מימון</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #8d4634; font-size: 24px; margin-top: 0;">${name}, שלום!</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              תודה רבה שאישרתם את הגעתכם לחגיגת בת המצווה של אילה רחל!
            </p>
            
            <div style="background-color: #fef7f0; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #8d4634; margin-top: 0;">פרטי האישור:</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin: 10px 0; font-size: 16px;">
                  <strong>שם:</strong> ${name}
                </li>
                <li style="margin: 10px 0; font-size: 16px;">
                  <strong>מגיעים:</strong> ${attendingText}${guestsText}
                </li>
              </ul>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              אנו מאוד מתרגשים לחגוג איתכם! בקרוב תקבלו פרטים נוספים על האירוע.
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 30px;">
              אם יש לכם שאלות, אנא צרו קשר:
            </p>
            <ul style="list-style: none; padding: 0; margin: 10px 0;">
              <li style="margin: 5px 0;">📞 050-8551995</li>
              <li style="margin: 5px 0;">✉️ feldy2@gmail.com</li>
            </ul>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 30px;">
              מחכים לראות אתכם,<br>
              <strong>משפחת מימון</strong>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #999; font-size: 14px;">
            <p>זהו מייל אוטומטי, אנא אל תשיבו למייל זה</p>
          </div>
        </div>
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
    res.status(500).json({
      success: false,
      message: 'Failed to send email'
    });
  }
}

