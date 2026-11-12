
import './About.css';

const highlights = [
  {
    number: '01',
    title: 'Frontend Development',
    description:
      'Creating responsive, interactive and visually polished interfaces using modern frontend technologies.',
    tags: ['React', 'JavaScript', 'CSS']
  },
  {
    number: '02',
    title: 'Backend Development',
    description:
      'Building application logic, APIs and database-driven systems with a focus on reliability.',
    tags: ['Java', 'Node.js', 'MongoDB']
  },
  {
    number: '03',
    title: 'Problem Solving',
    description:
      'Breaking complex problems into practical solutions and continuously improving the quality of my work.',
    tags: ['Logic', 'Clean Code', 'Learning']
  }
];

function About() {
  return (
    <section id="about" className="about section">
      <div className="about__container container">

        {/* Section heading */}

        <div className="about__header">
          <p className="about__eyebrow">
            <span /> GET TO KNOW ME
          </p>

          <h2 className="about__heading">
            More than just
            <br />
            <span>writing code.</span>
          </h2>

          <p className="about__intro">
            I'm a full-stack developer who enjoys turning ideas
            into meaningful digital experiences. I love combining
            thoughtful design, clean code and practical problem-solving
            to build things that make a difference.
          </p>
        </div>

        {/* Main content */}

        <div className="about__content">

          <div className="about__story">
            <div className="about__story-top">
              <span className="about__label">A LITTLE ABOUT MY APPROACH</span>
              <span className="about__symbol">✳</span>
            </div>

            <h3>
              Curious mind.
              <br />
              Creative thinking.
              <br />
              <span>Purposeful building.</span>
            </h3>

            <p>
              I enjoy exploring how technology works, learning new
              tools and creating applications that solve real-world
              problems. For me, development is not just about making
              something work — it's about making it work well.
            </p>

            <div className="about__story-footer">
              <span>DESIGN WITH INTENT</span>
              <span>BUILD WITH PURPOSE</span>
            </div>
          </div>

          {/* Highlight cards */}

          <div className="about__highlights">
            {highlights.map((item) => (
              <article className="about__card" key={item.number}>
                <div className="about__card-top">
                  <span className="about__card-number">
                    / {item.number}
                  </span>
                  <span className="about__card-arrow">↗</span>
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <div className="about__tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>

        </div>

        {/* Bottom statement */}

        <div className="about__bottom">
          <span>ALWAYS LEARNING</span>
          <span className="about__bottom-line" />
          <span>ALWAYS BUILDING</span>
        </div>

      </div>
    </section>
  );
}

export default About;
