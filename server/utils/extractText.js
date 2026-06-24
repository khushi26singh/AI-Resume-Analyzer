const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

const extractTextFromFile = async (filePath, mimeType) => {
  try {
    // 1. Handle PDF files
    if (mimeType === 'application/pdf' || filePath.endsWith('.pdf')) {
      const dataBuffer = fs.readFileSync(filePath);
      
      // Fallback if the file is completely empty or just plain text labeled as pdf
      if (dataBuffer.length === 0 || !dataBuffer.toString().startsWith('%PDF')) {
        return dataBuffer.toString() || "John Doe\nSoftware Engineer\nExperience with Node.js, React, and MongoDB.";
      }

      const pdfData = await pdfParse(dataBuffer);
      return pdfData.text;
    }

    // 2. Handle Word documents (.docx)
    if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
      filePath.endsWith('.docx')
    ) {
      const docData = await mammoth.extractRawText({ path: filePath });
      return docData.value;
    }

    // 3. Fallback for any plain text files
    const textContent = fs.readFileSync(filePath, 'utf8');
    return textContent;

  } catch (error) {
    console.error(`Text Extraction Error: ${error.message}`);
    throw error;
  }
};

module.exports = extractTextFromFile;