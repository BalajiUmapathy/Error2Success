"use client";
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Nav from '../components/Nav';
import './add.css';

export default function AddProjectPage() {
  const { userId } = useParams();
  const router = useRouter();

  // Log userId to verify it's being retrieved correctly
  console.log('userId from useParams:', userId);

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    status: 'Ongoing',
    deadline: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a new projectId (increment the highest existing ID)
    const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const newProjectId = storedProjects.length > 0
      ? (Math.max(...storedProjects.map(p => parseInt(p.projectId))) + 1).toString()
      : "1";

    // Create the new project
    const newProject = {
      ...formData,
      projectId: newProjectId,
      userId, // Include userId in the project data
    };

    // Debug: Log the new project and updated projects
    console.log('New Project to be added:', newProject);
    const updatedProjects = [...storedProjects, newProject];
    console.log('Updated Projects before saving to localStorage:', updatedProjects);

    // Add the new project to the existing projects in localStorage
    localStorage.setItem('projects', JSON.stringify(updatedProjects));

    // Redirect to the Projects page route
    router.push(`/users/${userId}/project`);
  };

  // Handle Add Another Project button click
  const handleAddAnotherProject = () => {
    console.log('Attempting to navigate with userId:', userId); // Debug navigation
    if (userId) {
      router.push(`/users/${userId}/project/addProject`);
    } else {
      console.warn('User ID not available');
      router.push('/login');
    }
  };

  return (
    <div className="add-project-page">
      {/* Header (same class as Projects page) */}
      <header className="projects-header">
        <div className="header-content">
          <h1>Department of Public Works</h1>
          <div className="header-actions">
            <div className="user-icon">
              <svg className="user-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <button className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      {/* Navigation (same as Projects page) */}
      <Nav />

      {/* Main Content (cube-shaped card) */}
      <main className="projects-main">
        <div className="projects-actions card">
          <h2 className="add-project-title">
            <svg className="notepad-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Add New Project
          </h2>
          <button className="add-another-project-btn" onClick={handleAddAnotherProject}>
            Add Another Project
          </button>
        </div>

        {/* Form (cube-shaped card) */}
        <div className="project-form-wrapper card">
          <form className="project-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Project Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter project title"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="deadline">Deadline</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter project description"
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Add Project
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}