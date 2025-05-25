"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Nav from '../../../project/components/Nav';
import './view.css';

export default function ViewTaskPage() {
  const { userId, taskId } = useParams();
  const router = useRouter();
  const [task, setTask] = useState(null);

  // Log userId and taskId to verify they're being retrieved correctly
  console.log('userId from useParams:', userId);
  console.log('taskId from useParams:', taskId);

  // Load task data from localStorage or initialTasks
  useEffect(() => {
    // Static initialTasks for reference (same as in Tasks page)
    const initialTasks = [
      {
        title: "Inspect Flyover Construction",
        location: "Chennai Anna Nagar",
        status: "Ongoing",
        deadline: "15th October 2024",
        description: "Conduct a site inspection for the flyover construction in Anna Nagar.",
        taskId: "1",
      },
      {
        title: "Review Metro Station Plans",
        location: "Chennai T. Nagar",
        status: "Completed",
        deadline: "20th January 2024",
        description: "Review the architectural plans for the metro station expansion in T. Nagar.",
        taskId: "2",
      },
      {
        title: "Schedule Road Resurfacing",
        location: "Chennai Velachery",
        status: "Pending",
        deadline: "30th June 2025",
        description: "Plan and schedule the road resurfacing project in Velachery.",
        taskId: "3",
      },
      {
        title: "Monitor Drainage Upgrade",
        location: "Chennai Adyar",
        status: "Ongoing",
        deadline: "10th August 2024",
        description: "Monitor the progress of the drainage system upgrade in Adyar.",
        taskId: "4",
      },
    ];

    // Load tasks from localStorage
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const allTasks = [...initialTasks, ...storedTasks];

    // Find the task with the matching taskId
    const foundTask = allTasks.find((t) => t.taskId === taskId);
    if (foundTask) {
      setTask(foundTask);
    } else {
      console.warn('Task not found, redirecting to Tasks page');
      router.push(`/users/${userId}/tasks`);
    }
  }, [taskId, userId, router]);

  // Handle Back to Tasks button click
  const handleBackToTasks = () => {
    router.push(`/users/${userId}/tasks`);
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-task-page">
      {/* Header (same as Add Task page) */}
      <header className="tasks-header">
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

      {/* Navigation (same as Add Task page) */}
      <Nav />

      {/* Main Content (cube-shaped card) */}
      <main className="tasks-main">
        <div className="tasks-actions card">
          <h2 className="view-task-title">
            <svg className="notepad-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            View Task Details
          </h2>
          <button className="back-to-tasks-btn" onClick={handleBackToTasks}>
            Back to Tasks
          </button>
        </div>

        {/* Task Details (cube-shaped card, styled like the form) */}
        <div className="task-form-wrapper card">
          <div className="task-form">
            <div className="form-group">
              <label htmlFor="title">Task Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={task.title}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={task.location}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={task.status}
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
                value={task.deadline}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={task.description}
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