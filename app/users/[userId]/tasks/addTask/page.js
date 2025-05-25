"use client";
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Nav from '../../project/components/Nav';
import './add.css';

export default function AddTaskPage() {
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
    
    // Generate a new taskId (increment the highest existing ID)
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const newTaskId = storedTasks.length > 0
      ? (Math.max(...storedTasks.map(t => parseInt(t.taskId))) + 1).toString()
      : "1";

    // Create the new task
    const newTask = {
      ...formData,
      taskId: newTaskId,
      userId, // Include userId in the task data
    };

    // Debug: Log the new task and updated tasks
    console.log('New Task to be added:', newTask);
    const updatedTasks = [...storedTasks, newTask];
    console.log('Updated Tasks before saving to localStorage:', updatedTasks);

    // Add the new task to the existing tasks in localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Redirect to the Tasks page route
    router.push(`/users/${userId}/tasks`);
  };

  // Handle Add Another Task button click
  const handleAddAnotherTask = () => {
    console.log('Attempting to navigate with userId:', userId); // Debug navigation
    if (userId) {
      router.push(`/users/${userId}/tasks/addTask`);
    } else {
      console.warn('User ID not available');
      router.push('/login');
    
    }
  };

  return (
    <div className="add-task-page">
      {/* Header (same class as Tasks page) */}
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

      {/* Navigation (same as Tasks page) */}
      <Nav />

      {/* Main Content (cube-shaped card) */}
      <main className="tasks-main">
        <div className="tasks-actions card">
          <h2 className="add-task-title">
            <svg className="notepad-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Add New Task
          </h2>
          <button className="add-another-task-btn" onClick={handleAddAnotherTask}>
            Add Another Task
          </button>
        </div>

        {/* Form (cube-shaped card) */}
        <div className="task-form-wrapper card">
          <form className="task-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Task Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title"
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
                placeholder="Enter task description"
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Add Task
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}