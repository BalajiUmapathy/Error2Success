"use client";
import { useRouter } from 'next/navigation';
import './Task.css';

export default function Task({ title, location, status, deadline, description, taskId, userId }) {
  const router = useRouter();

  const handleViewTask = () => {
    console.log('Navigating to view task with taskId:', taskId, 'and userId:', userId);
    if (userId) {
      router.push(`/users/${userId}/tasks/view/${taskId}`);
    } else {
      console.warn('User ID not available');
      router.push('/login');
    }
  };

  return (
    <div className="task-card">
      <div className="task-details">
        <h3 className="task-title">{title}</h3>
        <div className="task-location">
          <svg className="location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.243l-4.243-4.243m0 0L9.172 7.757M13.414 12l4.243 4.243"></path>
          </svg>
          <span>{location}</span>
        </div>
        <p className="task-deadline">Deadline: {deadline}</p>
        <p className="task-description">{description}</p>
      </div>
      <div className="task-actions">
        <span className="task-status">{status}</span>
        <button className="view-btn" onClick={handleViewTask}>
          View
        </button>
      </div>
    </div>
  );
}