
import { useState } from 'react';
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiSpringboot,
  SiHibernate,
  SiMongodb,
  SiMysql,
  SiGit,
  SiGithub
} from 'react-icons/si';

import { DiJava } from 'react-icons/di';

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
    icon: SiHtml5,
    color: '#E34F26',
    category: 'Frontend',
    logoClass: 'skills__logo--padded',
    description: 'Building accessible and well-structured web interfaces.'
  },
  {
    name: 'CSS3',
    icon: SiCss,
    color: '#1572B6',
    category: 'Frontend',
    logoClass: 'skills__logo--padded',
    description: 'Creating responsive layouts, animations and visual systems.'
  },
  {
    name: 'JavaScript',
    icon: SiJavascript,
    color: '#F7DF1E',
    category: 'Frontend',
    logoClass: 'skills__logo--padded',
    description: 'Developing interactive applications and dynamic functionality.'
  },
  {
    name: 'React',
    icon: SiReact,
    color: '#61DAFB',
    category: 'Frontend',
    description: 'Building reusable components and modern user interfaces.'
  },
  {
    name: 'Tailwind CSS',
    icon: SiTailwindcss,
    color: '#06B6D4',
    category: 'Frontend',
    description: 'Developing consistent interfaces with utility-first styling.'
  },
  {
    name: 'Java',
    icon: DiJava,
    color: '#ED8B00',
    category: 'Backend',
    description: 'Writing object-oriented application logic and backend code.'
  },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
    color: '#5FA04E',
    category: 'Backend',
    description: 'Building server-side applications with JavaScript.'
  },
  {
    name: 'Express.js',
    icon: SiExpress,
    color: 'currentColor',
    category: 'Backend',
    description: 'Creating REST APIs and backend application routes.'
  },
  {
    name: 'Spring Boot',
    icon: SiSpringboot,
    color: '#6DB33F',
    category: 'Backend',
    description: 'Developing Java-based backend applications.'
  },
  {
    name: 'Hibernate',
    icon: SiHibernate,
    color: '#59666C',
    category: 'Backend',
    description: 'Working with Java persistence and object-relational mapping.'
  },
  {
    name: 'MongoDB',
    icon: SiMongodb,
    color: '#47A248',
    category: 'Database',
    description: 'Working with document-oriented database systems.'
  },
  {
    name: 'MySQL',
    icon: SiMysql,
    color: '#4479A1',
    category: 'Database',
    description: 'Working with relational databases and SQL.'
  },
  {
    name: 'Git',
    icon: SiGit,
    color: '#F05032',
    category: 'Tools',
    description: 'Managing source code and tracking development changes.'
  },
  {
    name: 'GitHub',
    icon: SiGithub,
    color: 'currentColor',
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

        <div className="skills__grid" aria-live="polite">
          {filteredSkills.map((skill, index) => {
            const SkillIcon = skill.icon;

            return (
              <article
                className="skills__card"
                key={skill.name}
                style={{ '--card-index': index }}
              >
                <div className="skills__card-top">
                  <span
                    className="skills__card-mark"
                    aria-label={`${skill.name} logo`}
                  >
                    <SkillIcon
                      size={36}
                      color={skill.color}
                       className={skill.logoClass || ''}
                      aria-hidden="true"
                    />
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
            );
          })}
        </div>

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
