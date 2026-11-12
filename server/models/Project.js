
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    // Unique identifier corresponding to your existing project IDs.
      slug: {
      type: String,
      required: [true, 'Project ID is required'],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: [80, 'Project ID cannot exceed 80 characters'],
      match: [
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'Project ID can contain only lowercase letters, numbers and hyphens'
    ]
      },

    number: {
      type: String,
      required: true,
      trim: true,
      maxlength: [20, 'Project number cannot exceed 20 characters']
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
      trim: true,
      maxlength: [80, 'Role label cannot exceed 80 characters']
    },

    visual: {
      type: String,
      trim: true,
      maxlength: [100, 'Visual cannot exceed 100 characters']
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
        type: [
          {
            type: String,
            trim: true,
            maxlength: [200, 'Each highlight cannot exceed 200 characters']
          }
        ],
        default: [],
      validate: {
        validator: (items) => items.length <= 20,
        message: 'A project cannot have more than 20 highlights'
      }
    },

    technologies: {
      type: [
        {
          type: String,
          trim: true,
          maxlength: [60, 'Technology name cannot exceed 60 characters']
        }
      ],
      default: [],
      validate: {
        validator: (items) => items.length <= 30,
        message: 'A project cannot have more than 30 technologies'
      }
    },

    liveUrl: {
      type: String,
      trim: true,
      default: '',
      maxlength: [2048, 'Live URL is too long'],
      validate: {
        validator: (value) =>
          !value || /^https?:\/\/.+/i.test(value),
        message: 'Live URL must start with http:// or https://'
      }
    },

      githubUrl: {
        type: String,
        trim: true,
        default: '',
        maxlength: [2048, 'GitHub URL is too long'],
        validate: {
          validator: (value) =>
            !value || /^https?:\/\/.+/i.test(value),
          message: 'GitHub URL must start with http:// or https://'
        }
      },

    // Project card background image URL (e.g. Cloudinary URL).
      backgroundImage: {
        type: String,
        trim: true,
        default: '',
        maxlength: [2048, 'Background image URL is too long'],
        validate: {
          validator: (value) =>
            !value || /^https:\/\/.+/i.test(value),
          message: 'Background image must use a secure HTTPS URL'
        }
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
