import { getTranscript } from '../youtube-transcript.js';

const videoUrl = process.argv[2];

async function main() {
  try {
    const transcript = await getTranscript(videoUrl);
    console.log('Transcript:', transcript);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main(); 