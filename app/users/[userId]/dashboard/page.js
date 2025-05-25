"use client"
import { useState } from 'react';
import Link from 'next/link';
import Nav from './components/Nav';
// import Filters from './components/Filters';
// import Project from './components/Project';
import './projects.css';

const projects = [
  {
    title: "Flyover Construction",
    location: "Chennai Anna Nagar",
    status: "Ongoing",
    deadline: "15th October 2024",
    description: "Building a flyover to reduce traffic bottlenecks in Anna Nagar.",
  },
  {
    title: "Metro Station Expansion",
    location: "Chennai T. Nagar",
    status: "Completed",
    deadline: "20th January 2024",
    description: "Expanding the metro station in T. Nagar to accommodate more commuters.",
  },
  {
    title: "Road Resurfacing",
    location: "Chennai Velachery",
    status: "Pending",
    deadline: "30th June 2025",
    description: "Resurfacing roads in Velachery to improve driving conditions.",
  },
  {
    title: "Drainage System Upgrade",
    location: "Chennai Adyar",
    status: "Ongoing",
    deadline: "10th August 2024",
    description: "Upgrading the drainage system in Adyar to prevent waterlogging during rains.",
  },
];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter projects based on search query and status
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="projects-page">
      {/* Header */}
      <header className="projects-header">
        <div className="header-content">
          <h1 className="Spacing">Department of Public Works</h1>
          <div className="header-actions">
            <div className="user-icon">
              <svg
                className="user-icon-svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </div>
            <button className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <Nav />

      {/* Main Content */}
      <main className="projects-main">
        <div className="projects-actions">
          <div className="spacer"></div>
          <Link href="/projects/add">
            <button className="add-project-btn">Add Project</button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="projects-filters">
          <Filters
            onSearch={setSearchQuery} // Pass setSearchQuery as onSearch
            onStatusChange={setStatusFilter} // Pass setStatusFilter as onStatusChange
          />
        </div>

        {/* Project Cards */}
        <div className="projects-list">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <Project
                key={index}
                title={project.title}
                location={project.location}
                status={project.status}
                deadline={project.deadline}
                description={project.description}
                projectId={index.toString()}
              />
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </div>
      </main>
    </div>
  );
}