
import { useState } from 'react';
import './Skills.css';

const filters = [
  'All',
  'Frontend',
  'Backend',
  'Database',
  'Tools'
];

const skills = [
  {
    name: 'HTML5',
    mark: 'H5',
    category: 'Frontend',
    description: 'Building accessible and well-structured web interfaces.'
  },
  {
    name: 'CSS3',
    mark: 'C3',
    category: 'Frontend',
    description: 'Creating responsive layouts, animations and visual systems.'
  },
  {
    name: 'JavaScript',
    mark: 'JS',
    category: 'Frontend',
    description: 'Developing interactive applications and dynamic functionality.'
  },
  {
    name: 'React',
    mark: 'RE',
    category: 'Frontend',
    description: 'Building reusable components and modern user interfaces.'
  },
  {
    name: 'Tailwind CSS',
    mark: 'TW',
    category: 'Frontend',
    description: 'Developing consistent interfaces with utility-first styling.'
  },
  {
    name: 'Java',
    mark: 'JV',
    category: 'Backend',
    description: 'Writing object-oriented application logic and backend code.'
  },
  {
    name: 'Node.js',
    mark: 'ND',
    category: 'Backend',
    description: 'Building server-side applications with JavaScript.'
  },
  {
    name: 'Express.js',
    mark: 'EX',
    category: 'Backend',
    description: 'Creating REST APIs and backend application routes.'
  },
  {
    name: 'Spring Boot',
    mark: 'SB',
    category: 'Backend',
    description: 'Developing Java-based backend applications.'
  },
  {
    name: 'Hibernate',
    mark: 'HB',
    category: 'Backend',
    description: 'Working with Java persistence and object-relational mapping.'
  },
  {
    name: 'MongoDB',
    mark: 'MG',
    category: 'Database',
    description: 'Working with document-oriented database systems.'
  },
  {
    name: 'MySQL',
    mark: 'MY',
    category: 'Database',
    description: 'Working with relational databases and SQL.'
  },
  {
    name: 'Git',
    mark: 'GT',
    category: 'Tools',
    description: 'Managing source code and tracking development changes.'
  },
  {
    name: 'GitHub',
    mark: 'GH',
    category: 'Tools',
    description: 'Managing repositories and collaborating on code.'
  }
];

function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter(
          skill => skill.category === activeCategory
        );

  return (
    <section id="skills" className="skills section">
      <div className="skills__container container">

        {/* Section heading */}

        <div className="skills__header">
          <p className="skills__eyebrow">
            <span />
            MY TECHNICAL EXPERTISE
          </p>

          <div className="skills__heading-row">
            <h2 className="skills__heading">
              Tools of my
              <br />
              <span>craft.</span>
            </h2>

            <p className="skills__intro">
              Technologies and tools I use to transform ideas
              into functional, scalable and meaningful digital
              experiences.
            </p>
          </div>
        </div>

        {/* Skill category filters */}

        <div className="skills__toolbar">
          <div
            className="skills__filters"
            role="group"
            aria-label="Filter skills by category"
          >
            {filters.map(filter => (
              <button
                key={filter}
                type="button"
                className={`skills__filter ${
                  activeCategory === filter
                    ? 'skills__filter--active'
                    : ''
                }`}
                onClick={() => setActiveCategory(filter)}
                aria-pressed={activeCategory === filter}
              >
                {filter}
              </button>
            ))}
          </div>

          <span
            className="skills__count"
            aria-live="polite"
          >
            {String(filteredSkills.length).padStart(2, '0')}
            <span> TECHNOLOGIES</span>
          </span>
        </div>

        {/* Skills grid */}

        <div className="skills__grid" aria-live="polite">
          {filteredSkills.map((skill, index) => (
            <article
              className="skills__card"
              key={skill.name}
              style={{ '--card-index': index }}
            >
              <div className="skills__card-top">
                <span className="skills__card-mark">
                  {skill.mark}
                </span>

                <span className="skills__card-category">
                  {skill.category}
                </span>
              </div>

              <div className="skills__card-content">
                <h3>{skill.name}</h3>
                <p>{skill.description}</p>
              </div>

              <div className="skills__card-footer">
                <span>TECHNOLOGY</span>
                <span className="skills__card-arrow">↗</span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom statement */}

        <div className="skills__bottom">
          <span>THE RIGHT TOOL FOR THE RIGHT PROBLEM</span>
          <span className="skills__bottom-line" />
          <span>ALWAYS EVOLVING</span>
        </div>

      </div>
    </section>
  );
}

export default Skills;
