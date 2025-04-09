import { YoutubeTranscript } from 'youtube-transcript';
import { decode } from 'html-entities';

const headers = {
  "Content-Type": ["text/plain"],
  "Access-Control-Allow-Origin": ["*"],
  "Access-Control-Allow-Methods": ["POST", "OPTIONS"],
  "Access-Control-Allow-Headers": ["Content-Type", "Auth-Token"]
};

export async function handle(event, _context, _cb) {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  const authToken = event.headers['Auth-Token'];
  if (!authToken || authToken !== process.env.AUTH_TOKEN) {
    return { statusCode: 401 };
  }

  if (!event.body) {
    return { statusCode: 400 };
  }

  try {
    const transcript = await getTranscript(event.body);

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

export async function getTranscript(videoUrlOrId) {
  const captions = await YoutubeTranscript.fetchTranscript(videoUrlOrId);

  const encodedTranscript = captions.map(c => c.text).join(' ');
  const onceDecodedTranscript = decode(encodedTranscript);
  const twiceDecodedTranscript = decode(onceDecodedTranscript);

  return twiceDecodedTranscript;
}
