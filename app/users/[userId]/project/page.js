"use client";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Nav from './components/Nav';
import Filters from './components/Filters';
import Project from './components/Project';
import './projects.css';

// Static projects array (initial data)
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

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const router = useRouter();
  const { userId } = useParams();

  // Log userId to verify it's being retrieved correctly
  console.log('userId from useParams:', userId);

  // Function to load projects from localStorage and merge with initialProjects
  const loadProjects = () => {
    const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    // Check for duplicates by projectId and merge initialProjects with storedProjects
    const combinedProjects = [...initialProjects];
    storedProjects.forEach((storedProject) => {
      const exists = combinedProjects.some(
        (proj) => proj.projectId === storedProject.projectId
      );
      if (!exists) {
        combinedProjects.push(storedProject);
      }
    });

    setProjects(combinedProjects);
  };

  // Load projects on mount and whenever userId changes
  useEffect(() => {
    loadProjects();
  }, [userId]);

  // Listen for route changes to refresh the project list
  useEffect(() => {
    const handleRouteChange = () => {
      loadProjects();
    };

    // Subscribe to route change events
    router.events?.on('routeChangeComplete', handleRouteChange);

    // Cleanup subscription on unmount
    return () => {
      router.events?.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Handle Add Project button click
  const handleAddProject = () => {
    console.log('Attempting to navigate with userId:', userId); // Debug navigation
    if (userId) {
      router.push(`/users/${userId}/project/addProject`);
    } else {
      console.warn('User ID not available');
      router.push('/login');
    }
  };

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
          <button className="add-project-btn" onClick={handleAddProject}>
            Add Project
          </button>
        </div>

        {/* Search and Filters */}
        <div className="projects-filters">
          <Filters
            onSearch={setSearchQuery}
            onStatusChange={setStatusFilter}
          />
        </div>

        {/* Project Cards */}
        <div className="projects-list">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Project
                key={project.projectId}
                title={project.title}
                location={project.location}
                status={project.status}
                deadline={project.deadline}
                description={project.description}
                projectId={project.projectId}
                userId={userId} // Pass userId to Project component
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