import { NextApiRequest, NextApiResponse } from 'next';
import { RSVPFormData } from '@/types';

interface RSVPRequestBody extends RSVPFormData {
  submittedAt?: string;
  id?: string;
}

const NOTION_API_BASE_URL = 'https://api.notion.com/v1/pages';
const NOTION_VERSION = '2022-06-28';

type NotionRichText = Array<{
  type: 'text';
  text: {
    content: string;
  };
}>;

const buildRichText = (content?: string): NotionRichText => {
  if (!content) {
    return [];
  }

  return [
    {
      type: 'text',
      text: {
        content,
      },
    },
  ];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  const notionApiKey = process.env.NOTION_API_KEY;
  const notionDatabaseId = process.env.NOTION_DATABASE_ID;

  if (!notionApiKey || !notionDatabaseId) {
    console.error('Notion configuration missing');
    return res.status(500).json({
      success: false,
      message: 'Notion configuration is missing. Please check environment variables.',
    });
  }

  try {
    const rsvpData = req.body as RSVPRequestBody;

    const submittedAt =
      rsvpData.submittedAt ?? new Date().toISOString();

    const payload = {
      parent: {
        database_id: notionDatabaseId,
      },
      properties: {
        Name: {
          title: buildRichText(rsvpData.fullName || 'אורח ללא שם'),
        },
        Phone: {
          phone_number: rsvpData.phone || null,
        },
        Email: {
          email: rsvpData.email || null,
        },
        'Invite Sent': {
          checkbox: true, // Always true
        },
        RSVP: {
          status: rsvpData.attending === 'yes' ? 'Accepted' : 'Declined',
        },
        'Guest Count': {
          number: Number(rsvpData.guests) || 0,
        },
        Guests: {
          rich_text: buildRichText(rsvpData.guests || '0'),
        },
        'Dietary Restrictions': {
          rich_text: buildRichText(rsvpData.dietaryRestrictions || 'None'),
        },
        Message: {
          rich_text: buildRichText(rsvpData.message),
        },
        'Submitted At': {
          date: {
            start: submittedAt,
          },
        },
      },
    };

    const notionResponse = await fetch(NOTION_API_BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${notionApiKey}`,
        'Content-Type': 'application/json',
        'Notion-Version': NOTION_VERSION,
      },
      body: JSON.stringify(payload),
    });

    if (!notionResponse.ok) {
      const errorText = await notionResponse.text();
      console.error('Failed to save RSVP to Notion:', errorText);
      return res.status(500).json({
        success: false,
        message: 'Failed to save RSVP to Notion.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'RSVP saved to Notion.',
    });
  } catch (error) {
    console.error('Error saving RSVP to Notion:', error);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred while saving RSVP to Notion.',
    });
  }
}

