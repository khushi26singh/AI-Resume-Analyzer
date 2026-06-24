const fs = require('fs');
const mammoth = require('mammoth');

const extractTextFromFile = async (filePath, mimeType) => {
  try {
    if (mimeType === 'application/pdf' || filePath.endsWith('.pdf')) {
      const { extractText } = await import('unpdf');
      const dataBuffer = new Uint8Array(fs.readFileSync(filePath));
      const { text } = await extractText(dataBuffer, { mergePages: true });
      return text;
    }

    if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      filePath.endsWith('.docx')
    ) {
      const docData = await mammoth.extractRawText({ path: filePath });
      return docData.value;
    }

    return fs.readFileSync(filePath, 'utf8');

  } catch (error) {
    console.error(`Text Extraction Error: ${error.message}`);
    throw error;
  }
};

module.exports = extractTextFromFile;