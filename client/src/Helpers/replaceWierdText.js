export default function replaceWierdText(string){

    if(!string) return ''

    const symbolsMap = {
        'â¢': '•',
        'â': "'",
      };
    
      // Replace the weird symbols with their appropriate counterparts
      let cleanedText = string;
      for (const [weirdSymbol, readableSymbol] of Object.entries(symbolsMap)) {
        cleanedText = cleanedText.split(weirdSymbol).join(readableSymbol);
      }
      return cleanedText
}