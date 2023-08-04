import { v4 as uuid } from 'uuid'

export default function formatNumberedText(string) {
    const sentences = string?.split(/ (?=\d+\.)/);
    const sanitizedSentences = sentences?.map((s) => {
      // Replace weird symbols with a space (modify the regex as needed)
      const sanitizedSentence = s.replace(/[^\w\s.,?!]/g, ' ');
      
      return <li className='mt-2 text-sm' key={uuid()}>{sanitizedSentence}</li>;
    });
    return sanitizedSentences;
  }