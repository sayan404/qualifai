// /pages/api/textToSpeech.js
import { createClient } from '@deepgram/sdk';
import { pipeline } from 'stream/promises';

export async function GET(req, res) {
  const text = 'Deepgram is great for real-time conversations… and also, you can build apps for things like customer support, logistics, and more. What do you think of the voices?';
  const deepgramApiKey = process.env.DEEPGRAM_API_KEY; // Server-side environment variable
  const deepgram = createClient(deepgramApiKey);

  try {
    const response = await deepgram.speak.request(
      { text },
      { model: 'aura-asteria-en' }
    );

    const stream = await response.getStream();
    if (stream) {
      res.setHeader('Content-Type', 'audio/mp3');
      await pipeline(stream, res); // Stream directly to the response
    } else {
      res.status(500).json({ error: 'Error generating audio' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
