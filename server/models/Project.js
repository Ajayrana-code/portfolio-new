
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    // Unique identifier corresponding to your existing project IDs.
    slug: {
      type: String,
      required: [true, 'Project ID is required'],
      unique: true,
      trim: true,
      lowercase: true
    },

    number: {
      type: String,
      required: true,
      trim: true
    },

    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: 100
    },

    subtitle: {
      type: String,
      trim: true,
      maxlength: 150
    },

    category: {
      type: String,
      required: true,
      enum: [
        'Full Stack',
        'Recommendation',
        'Web Application'
      ]
    },

    roleLabel: {
      type: String,
      trim: true
    },

    visual: {
      type: String,
      trim: true
    },

    symbol: {
      type: String,
      trim: true
    },

    visualLabel: {
      type: String,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500
    },

    overview: {
      type: String,
      trim: true,
      maxlength: 2000
    },

    contribution: {
      type: String,
      trim: true,
      maxlength: 1500
    },

    highlights: {
      type: [String],
      default: []
    },

    technologies: {
      type: [String],
      default: []
    },

    liveUrl: {
      type: String,
      trim: true,
      default: ''
    },

    githubUrl: {
      type: String,
      trim: true,
      default: ''
    },

    // Project card background image URL (e.g. Cloudinary URL).
    backgroundImage: {
      type: String,
      trim: true,
      default: ''
    },

    isPublished: {
      type: Boolean,
      default: true
    },

    sortOrder: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
