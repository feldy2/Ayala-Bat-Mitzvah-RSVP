import { NextApiRequest, NextApiResponse } from 'next';
import { RSVPFormData } from '@/types';

interface RSVPResponse {
  success: boolean;
  message: string;
  data?: RSVPFormData;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RSVPResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'שיטה לא מותרת'
    });
  }

  try {
    const rsvpData: RSVPFormData = req.body;

    // Basic validation
    if (!rsvpData.fullName || !rsvpData.email || !rsvpData.attending) {
      return res.status(400).json({
        success: false,
        message: 'חסרים שדות חובה'
      });
    }

    // Email validation
    const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(rsvpData.email)) {
      return res.status(400).json({
        success: false,
        message: 'אימייל לא תקין'
      });
    }

    // In a real application, you would save this to a database
    console.log('אישור הגעה קבל:', rsvpData);

    // Simulate processing time
    setTimeout(() => {
      res.status(200).json({
        success: true,
        message: 'אישור הגעה נשלח בהצלחה',
        data: rsvpData
      });
    }, 1000);

  } catch (error) {
    console.error('שגיאת אישור הגעה:', error);
    res.status(500).json({
      success: false,
      message: 'שגיאת שרת פנימית'
    });
  }
}
