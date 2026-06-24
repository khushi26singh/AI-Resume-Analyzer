const fs = require('fs');
const Resume = require('../models/Resume');
const AnalysisReport = require('../models/AnalysisReport');
const extractTextFromFile = require('../utils/extractText');
const { GoogleGenerativeAI } = require('@google/generative-ai'); // Ensure this package is installed or use your preferred AI SDK

const buildFallbackAnalysis = (resumeText) => {
  const normalizedText = resumeText.toLowerCase();
  const sections = [
    ['skills', 'skills'],
    ['experience', 'experience'],
    ['projects', 'project'],
    ['education', 'education'],
    ['contact', 'email']
  ];

  const detectedSections = sections
    .filter(([, keyword]) => normalizedText.includes(keyword))
    .map(([label]) => label);

  const wordCount = resumeText.trim().split(/\s+/).filter(Boolean).length;
  const atsScore = Math.max(35, Math.min(85, 35 + detectedSections.length * 10 + Math.floor(wordCount / 50)));

  return {
    atsScore,
    summary: detectedSections.length
      ? `Resume includes ${detectedSections.join(', ')} sections and appears reasonably structured.`
      : 'Resume text was extracted successfully, but the structure is limited and could be improved.',
    strengths: detectedSections.length
      ? detectedSections.map((section) => `Contains a ${section} section`)
      : ['Text extraction succeeded'],
    weaknesses: detectedSections.length >= 3 ? [] : ['Add clearer section headings to improve ATS readability'],
    improvements: [
      'Add measurable achievements and action verbs',
      'Use consistent section headings like Experience, Skills, and Education',
      'Include more role-specific keywords'
    ],
    keywordSuggestions: ['JavaScript', 'Node.js', 'React', 'MongoDB', 'REST APIs']
  };
};

/**
 * @desc    Upload a resume and analyze it using AI
 * @route   POST /api/analyze
 * @access  Private (Assuming user is authenticated)
 */
const analyzeResume = async (req, res) => {
  try {
    // 1. Check if file exists
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a resume file' });
    }

    const filePath = req.file.path;
    const mimeType = req.file.mimetype;

    // 2. Extract Text from File
    const extractedText = await extractTextFromFile(filePath, mimeType);

    if (!extractedText || extractedText.trim() === '') {
      return res.status(400).json({ message: 'Failed to extract text from the resume' });
    }

    // 3. Setup AI Analysis Prompt
    // Initialize Gemini API (Make sure GEMINI_API_KEY is in your .env)
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: 'Gemini API key is not configured' });
    }

    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';
    const model = ai.getGenerativeModel({ model: modelName });
    const prompt = `
      You are an expert ATS (Applicant Tracking System) optimizer and professional resume reviewer.
      Analyze the following resume text deeply and return a strict JSON response. 
      The JSON object must match this schema exactly without markdown formatting around it:
      {
        "atsScore": number (0 to 100),
        "summary": "string summarising overall quality",
        "strengths": ["string"],
        "weaknesses": ["string"],
        "improvements": ["string"],
        "keywordSuggestions": ["string"]
      }

      Resume Text:
      ${extractedText}
    `;

    // 4. Generate Content from AI
    let parsedAnalysis;
    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.text().trim();

      const jsonText = responseText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '');

      // Parse the structured JSON response from the AI
      parsedAnalysis = JSON.parse(jsonText);
    } catch (analysisError) {
      console.error(`AI analysis unavailable, using fallback analysis: ${analysisError.message}`);
      parsedAnalysis = buildFallbackAnalysis(extractedText);
    }

    parsedAnalysis = {
      atsScore: Number(parsedAnalysis.atsScore) || 0,
      summary: parsedAnalysis.summary || 'Analysis completed.',
      strengths: Array.isArray(parsedAnalysis.strengths) ? parsedAnalysis.strengths : [],
      weaknesses: Array.isArray(parsedAnalysis.weaknesses) ? parsedAnalysis.weaknesses : [],
      improvements: Array.isArray(parsedAnalysis.improvements) ? parsedAnalysis.improvements : [],
      keywordSuggestions: Array.isArray(parsedAnalysis.keywordSuggestions) ? parsedAnalysis.keywordSuggestions : []
    };

    // 5. Save to Database
    // Use the authenticated user from middleware
    const userId = req.user._id; 

    const newResume = new Resume({
      user: userId,
      fileName: req.file.originalname,
      filePath: filePath,
      extractedText: extractedText
    });

    const savedResume = await newResume.save();

    const newReport = new AnalysisReport({
      user: userId,
      resume: savedResume._id,
      atsScore: parsedAnalysis.atsScore,
      summary: parsedAnalysis.summary,
      strengths: parsedAnalysis.strengths,
      weaknesses: parsedAnalysis.weaknesses,
      improvements: parsedAnalysis.improvements,
      keywordSuggestions: parsedAnalysis.keywordSuggestions
    });

    const savedReport = await newReport.save();

    // Link the report back to the resume document
    savedResume.analysisReport = savedReport._id;
    await savedResume.save();

    // 6. Return response to front-end
    return res.status(201).json({
      message: 'Resume analyzed successfully',
      resumeId: savedResume._id,
      report: savedReport
    });

  } catch (error) {
    console.error(`Analysis Controller Error: ${error.message}`);
    // Clean up uploaded file if database process fails
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({ message: 'Server error during resume analysis' });
  }
};

module.exports = {
  analyzeResume
};