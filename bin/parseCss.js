const fs = require('fs');
const path = require('path');

const { parseCss } = require('../src/parser/cssParser');

const args = process.argv.slice(2);
const inputArg = args.find(arg => arg.startsWith('--input='));
const outputArg = args.find(arg => arg.startsWith('--output='));

if (!inputArg || !outputArg) {
  console.error('Input and output file paths must be provided.');
  process.exit(1);
}

const projectRoot = path.resolve(__dirname, '..');
const inputFilePath = path.resolve(projectRoot, inputArg.split('=')[1]);
const outputFilePath = path.resolve(projectRoot, outputArg.split('=')[1]);

try {
  const rawCss = fs.readFileSync(inputFilePath, 'utf-8');
  const parsedStyles = parseCss(rawCss);

  // Check if the output directory exists, create it if not
  const outputDir = path.dirname(outputFilePath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputFilePath, JSON.stringify(parsedStyles, null, 2));
  console.log(`Parsed CSS written to ${outputFilePath}`);
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
