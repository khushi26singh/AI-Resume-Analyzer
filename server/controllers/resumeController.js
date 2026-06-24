const Resume = require('../models/Resume');
const AnalysisReport = require('../models/AnalysisReport');
const fs = require('fs');

// @desc    Get all resumes for a user
// @route   GET /api/resumes
// @access  Private
exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id })
      .populate('analysisReport')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes
    });
  } catch (error) {
    console.error('Get resumes error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single resume
// @route   GET /api/resumes/:id
// @access  Private
exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id)
      .populate('analysisReport');

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check if user owns this resume
    if (resume.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this resume' });
    }

    res.status(200).json({
      success: true,
      resume
    });
  } catch (error) {
    console.error('Get resume error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check if user owns this resume
    if (resume.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this resume' });
    }

    // Delete file from uploads folder
    if (fs.existsSync(resume.filePath)) {
      fs.unlinkSync(resume.filePath);
    }

    // Delete associated analysis report
    if (resume.analysisReport) {
      await AnalysisReport.findByIdAndDelete(resume.analysisReport);
    }

    // Delete resume
    await Resume.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    console.error('Delete resume error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
