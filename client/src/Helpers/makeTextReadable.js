import replaceWierdText from "./replaceWierdText";
import { v4 as uuid } from 'uuid'


export default function makeTextReadable(text) {
    if (!text) return '';

    const cleanedText = replaceWierdText(text)
  
    // Split the cleanedText into an array of substrings using the bullet point symbol ('•') as the separator
    const parts = cleanedText?.split('•');
  
    // If the first part is empty (i.e., the cleanedText started with a bullet point), remove it
    if (parts.length > 0 && parts[0].trim() === '') {
      parts.shift();
    }
  
    return parts.map((l, index) => {
      // Add line breaks before each subsequent bullet point
      if (index > 0) {
        return <li className='text-sm m-2' key={uuid()}>{l}</li>;
      }
      return <span className='text-sm m-2' key={uuid()}>{l}</span>; // First string without bullet point
    });
  }