import React, { useEffect, useState } from 'react';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data));

    fetch('http://localhost:5000/api/skills')
      .then(res => res.json())
      .then(data => setSkills(data));

    fetch('http://localhost:5000/api/achievements')
      .then(res => res.json())
      .then(data => setAchievements(data));

    fetch('http://localhost:5000/api/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data));

    fetch('http://localhost:5000/api/contacts')
      .then(res => res.json())
      .then(data => setContacts(data));
  }, []);

  return (
    <div className="home">
      {/* Projects Section */}
      <h1>📂 Projects</h1>
      <div className="card-container">
        {projects.map(p => (
          <div key={p.id} className="card">
            <h2>{p.title}</h2>
            <p>{p.description}</p>
            <p><strong>Tech Stack:</strong> {p.tech_stack}</p>
            <a href={p.link} target="_blank" rel="noopener noreferrer">Visit</a>
          </div>
        ))}
      </div>

      {/* Skills Section */}
      <h1>🧠 Skills</h1>
      <div className="card-container">
        {skills.map(skill => (
          <div key={skill.id} className="card-item">
            <h4>{skill.name}</h4>
          </div>
        ))}
      </div>

      {/* Achievements Section */}
      <h1>🏆 Achievements</h1>
      <div className="card-container">
        {achievements.map(achievement => (
          <div key={achievement.id} className="card-item">
            <h4>{achievement.title}</h4>
          </div>
        ))}
      </div>

      {/* Blogs Section */}
      <h1>📝 Blogs</h1>
      <div className="card-container">
        {blogs.map(blog => (
          <div key={blog.id} className="card">
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <p><strong>Date:</strong> {new Date(blog.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      {/* Contacts Section */}
      <h1>📬 Contact Messages</h1>
      <div className="card-container">
        {contacts.map(contact => (
          <div key={contact.id} className="card">
            <h3>{contact.name}</h3>
            <p><strong>Email:</strong> {contact.email}</p>
            <p>{contact.message}</p>
            <p><small>{new Date(contact.created_at).toLocaleDateString()}</small></p>
          </div>
        ))}
      </div>
    </div>
  );
}
