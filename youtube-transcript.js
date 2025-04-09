import { YoutubeTranscript } from 'youtube-transcript';

const headers = {
  "Content-Type": ["text/plain"],
  "Access-Control-Allow-Origin": ["*"]
};

export async function handle(event, _context, _cb) {
  const authToken = event.headers['Auth-Token'];
  if (!authToken || authToken !== process.env.AUTH_TOKEN) {
    return { statusCode: 401 };
  }

  // Validate input
  if (!event.body || !event.body.includes('youtube.com/watch?v=')) {
    return { statusCode: 400 };
  }

  try {
    const captions = await YoutubeTranscript.fetchTranscript(event.body);
    const transcript = captions.map(c => c.text).join(' ');

    return {
      body: transcript,
      headers,
      statusCode: 200,
    };
  } catch (error) {
    return {
      body: `Error: ${error.message}`,
      headers,
      statusCode: 500,
    };
  }
}
