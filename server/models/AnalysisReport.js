const mongoose = require('mongoose');

const AnalysisReportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true
  },
  atsScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  summary: {
    type: String,
    required: [true, 'Analysis summary is required']
  },
  strengths: {
    type: [String],
    default: []
  },
  weaknesses: {
    type: [String],
    default: []
  },
  improvements: {
    type: [String],
    default: []
  },
  keywordSuggestions: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AnalysisReport', AnalysisReportSchema);