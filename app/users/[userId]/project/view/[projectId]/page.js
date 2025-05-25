"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Nav from '../../../project/components/Nav';
import './view.css';

export default function ViewProjectPage() {
  const { userId, projectId } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);

  // Log userId and projectId to verify they're being retrieved correctly
  console.log('userId from useParams:', userId);
  console.log('projectId from useParams:', projectId);

  // Load project data from localStorage or initialProjects
  useEffect(() => {
    // Static initialProjects for reference (same as in Projects page)
    const initialProjects = [
      {
        title: "Flyover Construction",
        location: "Chennai Anna Nagar",
        status: "Ongoing",
        deadline: "15th October 2024",
        description: "Building a flyover to reduce traffic bottlenecks in Anna Nagar.",
        projectId: "1",
      },
      {
        title: "Metro Station Expansion",
        location: "Chennai T. Nagar",
        status: "Completed",
        deadline: "20th January 2024",
        description: "Expanding the metro station in T. Nagar to accommodate more commuters.",
        projectId: "2",
      },
      {
        title: "Road Resurfacing",
        location: "Chennai Velachery",
        status: "Pending",
        deadline: "30th June 2025",
        description: "Resurfacing roads in Velachery to improve driving conditions.",
        projectId: "3",
      },
      {
        title: "Drainage System Upgrade",
        location: "Chennai Adyar",
        status: "Ongoing",
        deadline: "10th August 2024",
        description: "Upgrading the drainage system in Adyar to prevent waterlogging during rains.",
        projectId: "4",
      },
    ];

    // Load projects from localStorage
    const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const allProjects = [...initialProjects, ...storedProjects];

    // Find the project with the matching projectId
    const foundProject = allProjects.find((proj) => proj.projectId === projectId);
    if (foundProject) {
      setProject(foundProject);
    } else {
      console.warn('Project not found, redirecting to Projects page');
      router.push(`/users/${userId}/projects`);
    }
  }, [projectId, userId, router]);

  // Handle Back to Projects button click
  const handleBackToProjects = () => {
    router.push(`/users/${userId}/project`);
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-project-page">
      {/* Header (same as Add Projects page) */}
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

      {/* Navigation (same as Add Projects page) */}
      <Nav />

      {/* Main Content (cube-shaped card) */}
      <main className="projects-main">
        <div className="projects-actions card">
          <h2 className="view-project-title">
            <svg className="notepad-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            View Project Details
          </h2>
          <button className="back-to-projects-btn" onClick={handleBackToProjects}>
            Back to Projects
          </button>
        </div>

        {/* Project Details (cube-shaped card, styled like the form) */}
        <div className="project-form-wrapper card">
          <div className="project-form">
            <div className="form-group">
              <label htmlFor="title">Project Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={project.title}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={project.location}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={project.status}
                disabled
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
                value={project.deadline}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={project.description}
                rows="4"
                readOnly
              ></textarea>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}