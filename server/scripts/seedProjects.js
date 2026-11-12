
import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Project from '../models/Project.js';

const projects = [
  {
    slug: 'wanderlust',
    number: '01',
    title: 'Wanderlust',
    subtitle: 'Accommodation discovery platform',
    category: 'Full Stack',
    roleLabel: 'Individual Project',
    visual: 'wanderlust',
    symbol: 'W.',
    visualLabel: 'TRAVEL / DISCOVER',

    description:
      'An individual Airbnb-inspired accommodation listing and booking clone.',

    overview:
      'Wanderlust is an individual project inspired by accommodation booking platforms. It explores the development of a web application for discovering and presenting accommodation listings.',

    contribution:
      'Independently developed as a full-stack portfolio project.',

    highlights: [
      'Airbnb-inspired application concept',
      'Individual project development',
      'Full-stack application experience'
    ],

    technologies: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB'
    ],

    liveUrl: '',
    githubUrl: '',
    backgroundImage: '',
    isPublished: true,
    sortOrder: 1
  },

  {
    slug: 'dish-drop',
    number: '02',
    title: 'Dish Drop',
    subtitle: 'Food recommendation system',
    category: 'Recommendation',
    roleLabel: 'Team Project · 4 Members',
    visual: 'dish-drop',
    symbol: 'D.',
    visualLabel: 'DISCOVER / RECOMMEND',

    description:
      'A team-built recommendation project exploring different techniques for recommending relevant dishes.',

    overview:
      'Dish Drop is a collaborative recommendation project that explores similarity-based and matrix-factorization approaches to generate recommendations.',

    contribution:
      'Developed collaboratively as part of a four-member team. Add your exact individual responsibilities here before publishing.',

    highlights: [
      'Cosine similarity',
      'Matrix factorization',
      'Singular Value Decomposition (SVD)',
      'K-Nearest Neighbors (KNN)'
    ],

    technologies: [
      'Cosine Similarity',
      'Matrix Factorization',
      'SVD',
      'KNN'
    ],

    liveUrl: '',
    githubUrl: '',
    backgroundImage: '',
    isPublished: true,
    sortOrder: 2
  },

  {
    slug: 'trend-canvas',
    number: '03',
    title: 'Trend Canvas',
    subtitle: 'Collaborative development project',
    category: 'Web Application',
    roleLabel: 'Team Project · 3 Members',
    visual: 'trend-canvas',
    symbol: 'T.',
    visualLabel: 'CREATE / EXPLORE',

    description:
      'A collaborative project developed as part of a three-member team.',

    overview:
      'Trend Canvas is a collaborative development project. Add its actual purpose, the problem it solves and its main functionality here.',

    contribution:
      'Developed collaboratively as part of a three-member team. Add your exact individual responsibilities here before publishing.',

    highlights: [
      'Collaborative software development',
      'Team-based project experience',
      'Practical application development'
    ],

    technologies: [],

    liveUrl: '',
    githubUrl: '',
    backgroundImage: '',
    isPublished: true,
    sortOrder: 3
  }
];

const seedProjects = async () => {
  try {
    await connectDB();

    const operations = projects.map(project => ({
      updateOne: {
        filter: { slug: project.slug },
        update: { $setOnInsert: project },
        upsert: true
      }
    }));

    const result = await Project.bulkWrite(operations);

    console.log('Project migration completed.');
    console.log(`Inserted: ${result.upsertedCount}`);
    console.log(`Already existing: ${result.matchedCount}`);
  } catch (error) {
    console.error('Project migration failed:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedProjects();
