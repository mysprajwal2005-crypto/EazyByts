import React, { useState, useEffect } from "react";
import "../App.css";

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({});
  const [currentSection, setCurrentSection] = useState("");

  // Fetch data for all sections
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    const sections = ["projects", "skills", "achievements", "blogs", "contacts"];
    for (let section of sections) {
      const res = await fetch(`http://localhost:5000/api/${section}`);
      const data = await res.json();
      if (section === "projects") setProjects(data);
      if (section === "skills") setSkills(data);
      if (section === "achievements") setAchievements(data);
      if (section === "blogs") setBlogs(data);
      if (section === "contacts") setContacts(data);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Start editing an item
  const startEdit = (section, id, item) => {
    setCurrentSection(section);
    setFormData({ ...item, id: id });
  };

  // Handle Add or Update
  const handleSubmit = async (section) => {
    if (formData.id) {
      await fetch(`http://localhost:5000/api/${section}/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      await fetch(`http://localhost:5000/api/${section}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }
    setFormData({});
    fetchAllData();
  };

  // Handle Delete
  const handleDelete = async (section, id) => {
    await fetch(`http://localhost:5000/api/${section}/${id}`, {
      method: "DELETE",
    });
    fetchAllData();
  };

  // Render Section
  const renderSection = (title, section, items, fields) => (
    <div className="admin-section">
      <h2>{title}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(section);
        }}
      >
        {fields.map((field) => (
          <input
            key={field}
            name={field}
            value={formData[field] || ""}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          />
        ))}
        <button type="submit">
          {formData.id ? "Update" : "Add"}
        </button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.title || item.name || item.message}</span>
            <div>
              <button
                className="edit-btn"
                onClick={() => startEdit(section, item.id, item)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(section, item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      {renderSection("Projects", "projects", projects, ["title", "description", "link"])}
      {renderSection("Skills", "skills", skills, ["name", "level"])}
      {renderSection("Achievements", "achievements", achievements, ["title", "description"])}
      {renderSection("Blogs", "blogs", blogs, ["title", "content"])}
      {renderSection("Contacts", "contacts", contacts, ["name", "email", "message"])}
    </div>
  );
}
