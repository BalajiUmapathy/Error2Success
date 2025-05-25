// ProjectsList.js
import { useState } from 'react';
import Filters from './Filters';
import Project from './Project';
import './ProjectsList.css'; // Optional: for styling the project list

const projects = [
  {
    title: "Flyover Construction",
    location: "Chennai Anna Nagar",
    status: "Ongoing",
    deadline: "15th October 2024",
    description: "Building a flyover to reduce traffic bottlenecks in Anna Nagar.",
    projectId: 1,
  },
  {
    title: "Metro Station Expansion",
    location: "Chennai T. Nagar",
    status: "Completed",
    deadline: "20th January 2024",
    description: "Expanding the metro station in T. Nagar to accommodate more commuters.",
    projectId: 2,
  },
  {
    title: "Road Resurfacing",
    location: "Chennai Velachery",
    status: "Pending",
    deadline: "30th June 2025",
    description: "Resurfacing roads in Velachery to improve driving conditions.",
    projectId: 3,
  },
  {
    title: "Drainage System Upgrade",
    location: "Chennai Adyar",
    status: "Ongoing",
    deadline: "10th August 2024",
    description: "Upgrading the drainage system in Adyar to prevent waterlogging during rains.",
    projectId: 4,
  },
];

export default function ProjectsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter projects based on search query and status
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="projects-list-container">
      <Filters
        onSearch={setSearchQuery}
        onStatusChange={setStatusFilter}
      />
      <div className="projects-grid">
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
            />
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
}