import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Custom Hook for Intersection Observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasIntersected) {
        setIsIntersecting(true);
        setHasIntersected(true);
      }
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [options, hasIntersected]);

  return [elementRef, isIntersecting];
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [ref, isIntersecting] = useIntersectionObserver();

  useEffect(() => {
    if (!isIntersecting) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isIntersecting, end, duration]);

  return <span ref={ref}>{count}+</span>;
};

// Skill Progress Bar Component
const SkillProgressBar = ({ skill, percentage, color }) => {
  const [ref, isIntersecting] = useIntersectionObserver();
  
  return (
    <div className="skill-progress" ref={ref}>
      <div className="skill-info">
        <span className="skill-name">{skill}</span>
        <span className="skill-percentage">{percentage}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className={`progress-fill ${isIntersecting ? 'animate' : ''}`}
          style={{ 
            width: isIntersecting ? `${percentage}%` : '0%',
            backgroundColor: color 
          }}
        />
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, index }) => {
  const [ref, isIntersecting] = useIntersectionObserver();
  
  return (
    <div 
      className={`project-card ${isIntersecting ? 'animate-in' : ''}`}
      ref={ref}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="project-image">
        <div className="project-overlay">
          <div className="project-links">
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
              <span>🌐</span> Live Demo
            </a>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
              <span>📁</span> GitHub
            </a>
          </div>
        </div>
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tech">
          {project.technologies.map((tech, i) => (
            <span key={i} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ref, isIntersecting] = useIntersectionObserver();

  // Smooth scrolling for navigation
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  // Parallax effect for header
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.header');
      if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sample data - Replace with your actual information
  const skills = [
    { name: 'React.js', percentage: 95, color: '#61dafb' },
    { name: 'JavaScript', percentage: 90, color: '#f7df1e' },
    { name: 'Node.js', percentage: 85, color: '#339933' },
    { name: 'Python', percentage: 80, color: '#3776ab' },
    { name: 'TypeScript', percentage: 75, color: '#3178c6' },
    { name: 'Firebase', percentage: 85, color: '#ffca28' }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      demo: 'https://your-ecommerce-demo.com',
      github: 'https://github.com/yourusername/ecommerce-project'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management with real-time updates, drag-and-drop, and team collaboration features.',
      technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
      demo: 'https://your-task-app-demo.com',
      github: 'https://github.com/yourusername/task-app'
    },
    {
      title: 'AI Chat Application',
      description: 'Intelligent chatbot using OpenAI API with conversation history and context awareness.',
      technologies: ['React', 'OpenAI API', 'Node.js', 'Redis'],
      demo: 'https://your-ai-chat-demo.com',
      github: 'https://github.com/yourusername/ai-chat-app'
    }
  ];

  return (
    <div className="App">
      {/* Navigation */}
      <nav className={`navbar ${isIntersecting ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo" onClick={() => scrollToSection('home')}>
            AK
          </div>
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a onClick={() => scrollToSection('home')} className={activeSection === 'home' ? 'active' : ''}>Home</a>
            <a onClick={() => scrollToSection('about')} className={activeSection === 'about' ? 'active' : ''}>About</a>
            <a onClick={() => scrollToSection('experience')} className={activeSection === 'experience' ? 'active' : ''}>Experience</a>
            <a onClick={() => scrollToSection('skills')} className={activeSection === 'skills' ? 'active' : ''}>Skills</a>
            <a onClick={() => scrollToSection('projects')} className={activeSection === 'projects' ? 'active' : ''}>Projects</a>
            <a onClick={() => scrollToSection('contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
          </div>
          <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="header" ref={ref}>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="greeting">Hello, I'm</span>
              <span className="name">Atharva Khadilkar</span>
              <span className="title">Full-Stack Developer</span>
            </h1>
            <p className="hero-description">
              I craft exceptional digital experiences with modern web technologies. 
              Passionate about clean code, user experience, and innovative solutions.
            </p>
            <div className="hero-actions">
              <button onClick={() => scrollToSection('projects')} className="btn btn-primary">
                View My Work
              </button>
              <button onClick={() => scrollToSection('contact')} className="btn btn-secondary">
                Get In Touch
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-elements">
              <div className="element react">⚛️</div>
              <div className="element node">🟢</div>
              <div className="element firebase">🔥</div>
              <div className="element typescript">🔷</div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <div className="section-header">
            <h2>About Me</h2>
            <p className="section-subtitle">Get to know me better</p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a passionate software developer with a love for creating elegant, 
                user-centric solutions. With expertise in modern web technologies, 
                I specialize in building scalable applications that solve real-world problems.
              </p>
              <p>
                My journey in tech started with curiosity and has evolved into a 
                passion for clean architecture, performance optimization, and 
                creating delightful user experiences.
              </p>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number"><AnimatedCounter end={3} /></div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number"><AnimatedCounter end={25} /></div>
                  <div className="stat-label">Projects Completed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number"><AnimatedCounter end={15} /></div>
                  <div className="stat-label">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section experience-section">
        <div className="container">
          <div className="section-header">
            <h2>Professional Experience</h2>
            <p className="section-subtitle">My career journey</p>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>Senior Software Developer</h3>
                <p className="company">Tech Company • 2023 - Present</p>
                <ul>
                  <li>Led development of enterprise applications serving 100K+ users</li>
                  <li>Mentored junior developers and conducted code reviews</li>
                  <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
                  <li>Architected microservices using Node.js and Docker</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>Full-Stack Developer</h3>
                <p className="company">Startup • 2022 - 2023</p>
                <ul>
                  <li>Built MVP applications using React and Node.js</li>
                  <li>Integrated third-party APIs and payment systems</li>
                  <li>Optimized database queries improving performance by 40%</li>
                  <li>Collaborated with design team on UI/UX improvements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills-section">
        <div className="container">
          <div className="section-header">
            <h2>Technical Skills</h2>
            <p className="section-subtitle">Technologies I work with</p>
          </div>
          <div className="skills-container">
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <SkillProgressBar
                  key={skill.name}
                  skill={skill.name}
                  percentage={skill.percentage}
                  color={skill.color}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Projects</h2>
            <p className="section-subtitle">Some of my best work</p>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <div className="section-header">
            <h2>Get In Touch</h2>
            <p className="section-subtitle">Let's work together</p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <h4>Email</h4>
                  <p>atharva@example.com</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <div>
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <h4>Location</h4>
                  <p>Your City, State</p>
                </div>
              </div>
            </div>
            <div className="social-links">
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="social-link">
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-link">
                <span>GitHub</span>
              </a>
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-link">
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">AK</div>
            <p>&copy; 2024 Atharva Khadilkar. All rights reserved.</p>
            <div className="footer-links">
              <a onClick={() => scrollToSection('home')}>Home</a>
              <a onClick={() => scrollToSection('about')}>About</a>
              <a onClick={() => scrollToSection('contact')}>Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
