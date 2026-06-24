const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  extractedText: {
    type: String,
    required: true
  },
  // Connects this resume to its separate AI Analysis Report
  analysisReport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AnalysisReport'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resume', ResumeSchema);