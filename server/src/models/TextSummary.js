import mongoose from 'mongoose';

// MongoDB schema for summary documents.
const textSummarySchema = new mongoose.Schema(
  {
    summaryID: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    originalText: {
      type: String,
      required: true,
      trim: true
    },
    summary: {
      type: String,
      required: true,
      trim: true
    },
    timestamp: {
      type: String,
      default: () => new Date().toISOString()
    },
    keywords: {
      type: [String],
      default: []
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    wordCount: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    versionKey: false
  }
);

// Collection model for summary data.
const TextSummary = mongoose.model('TextSummary', textSummarySchema);

export default TextSummary;