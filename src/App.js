import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Header Section */}
      <header className="header">
        <div className="container">
          <h1 className="name">Atharva Khadilkar</h1>
          <p className="title">Software Developer & Web Engineer</p>
          <div className="contact-info">
            <span>📧 atharva@example.com</span>
            <span>📱 +1 (555) 123-4567</span>
            <span>📍 Your City, State</span>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="section">
        <div className="container">
          <h2>About Me</h2>
          <p>
            I'm a passionate software developer with expertise in modern web technologies. 
            I love building user-friendly applications and solving complex problems through code. 
            Currently focused on React, Node.js, and cloud technologies.
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section">
        <div className="container">
          <h2>Professional Experience</h2>
          
          <div className="experience-item">
            <h3>Software Developer</h3>
            <p className="company">Company Name • 2023 - Present</p>
            <ul>
              <li>Developed and maintained web applications using React and Node.js</li>
              <li>Collaborated with cross-functional teams to deliver high-quality software</li>
              <li>Implemented responsive design principles and modern UI/UX patterns</li>
            </ul>
          </div>

          <div className="experience-item">
            <h3>Junior Developer</h3>
            <p className="company">Previous Company • 2022 - 2023</p>
            <ul>
              <li>Built frontend components and backend APIs</li>
              <li>Participated in code reviews and agile development processes</li>
              <li>Worked with databases and cloud services</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section">
        <div className="container">
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend</h3>
              <ul>
                <li>React.js</li>
                <li>JavaScript (ES6+)</li>
                <li>HTML5 & CSS3</li>
                <li>TypeScript</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Backend</h3>
              <ul>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>Python</li>
                <li>RESTful APIs</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Tools & Others</h3>
              <ul>
                <li>Git & GitHub</li>
                <li>Firebase</li>
                <li>Docker</li>
                <li>AWS</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section">
        <div className="container">
          <h2>Featured Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <h3>E-Commerce Platform</h3>
              <p>A full-stack e-commerce solution built with React, Node.js, and MongoDB</p>
              <div className="project-links">
                <a href="#" target="_blank" rel="noopener noreferrer">Live Demo</a>
                <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
            <div className="project-card">
              <h3>Task Management App</h3>
              <p>A collaborative task management application with real-time updates</p>
              <div className="project-links">
                <a href="#" target="_blank" rel="noopener noreferrer">Live Demo</a>
                <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="section">
        <div className="container">
          <h2>Education</h2>
          <div className="education-item">
            <h3>Bachelor of Science in Computer Science</h3>
            <p className="school">University Name • 2018 - 2022</p>
            <p>GPA: 3.8/4.0</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <h2>Get In Touch</h2>
          <div className="contact-links">
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="mailto:atharva@example.com">Email Me</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Atharva Khadilkar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
