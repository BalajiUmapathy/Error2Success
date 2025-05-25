"use client";
import { useRouter } from 'next/navigation';
import '../Project.css';

export default function Project({ title, location, status, deadline, description, projectId, userId }) {
  const router = useRouter();

  const handleViewProject = () => {
    console.log('Navigating to view project with projectId:', projectId, 'and userId:', userId);
    if (userId) {
      router.push(`/users/${userId}/project/view/${projectId}`);
    } else {
      console.warn('User ID not available');
      router.push('/login');
    }
  };

  return (
    <div className="project-card">
      <div className="project-details">
        <h3 className="project-title">{title}</h3>
        <div className="project-location">
          <svg className="location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.243l-4.243-4.243m0 0L9.172 7.757M13.414 12l4.243 4.243"></path>
          </svg>
          <span>{location}</span>
        </div>
        <p className="project-deadline">Deadline: {deadline}</p>
        <p className="project-description">{description}</p>
      </div>
      <div className="project-actions">
        <span className="project-status">{status}</span>
        <button className="view-btn" onClick={handleViewProject}>
          View
        </button>
      </div>
    </div>
  );
}