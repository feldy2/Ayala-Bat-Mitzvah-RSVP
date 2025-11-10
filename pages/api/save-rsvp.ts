import { NextApiRequest, NextApiResponse } from 'next';

const NOTION_API_URL = 'https://api.notion.com/v1/pages';
const NOTION_VERSION = '2022-06-28';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const notionApiKey = process.env.NOTION_API_KEY;
  const notionDatabaseId = process.env.NOTION_DATABASE_ID;

  if (!notionApiKey || !notionDatabaseId) {
    return res.status(500).json({ success: false, message: 'Notion configuration missing' });
  }

  try {
    const { fullName } = req.body;

    if (!fullName) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    const payload = {
      parent: { database_id: notionDatabaseId },
      properties: {
        Name: {
          title: [
            {
              text: { content: fullName },
            },
          ],
        },
      },
    };

    const notionResponse = await fetch(NOTION_API_URL, {
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
      console.error('Failed to save to Notion:', errorText);
      return res.status(500).json({ success: false, message: 'Failed to save to Notion' });
    }

    return res.status(200).json({ success: true, message: 'Saved to Notion successfully' });
  } catch (error) {
    console.error('Error saving to Notion:', error);
    return res.status(500).json({ success: false, message: 'Unexpected error' });
  }
}
