/**
 * Parses a raw CSS string and returns an object representing the styles.
 * @param {string} rawCss - The raw CSS content.
 * @returns {Object} - Parsed CSS as an object.
 */
function parseCss(rawCss) {
    const styleObjectBySelector = {};
    let currentSelector = '';
    let currentProperty = '';
  
    const processChar = (char, accumulatedChars) => {
      switch (char) {
        case '{':
          currentSelector = accumulatedChars.trim();
          styleObjectBySelector[currentSelector] = {};
          break;
        case ':':
          currentProperty = accumulatedChars.trim();
          break;
        case ';':
          if (currentSelector && currentProperty) {
            styleObjectBySelector[currentSelector][currentProperty] = accumulatedChars.trim();
          }
          currentProperty = '';
          break;
        case '}':
          currentSelector = '';
          currentProperty = '';
          break;
        default:
          console.warn(`Encountered unexpected character: ${char}`);
      }
    };
  
    let accumulatedChars = '';
    for (const char of rawCss) {
      if (['{', ':', ';', '}'].includes(char)) {
        processChar(char, accumulatedChars);
        accumulatedChars = '';
      } else {
        accumulatedChars += char;
      }
    }
  
    return styleObjectBySelector;
  }
  
  module.exports = { parseCss };
  