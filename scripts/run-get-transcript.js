import { getTranscript } from '../youtube-transcript.js';

// Example YouTube video URL or ID
const videoUrl = 'https://www.youtube.com/watch?v=7-rqUHaZO6Y';

async function main() {
  try {
    const transcript = await getTranscript(videoUrl);
    console.log('Transcript:', transcript);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main(); 