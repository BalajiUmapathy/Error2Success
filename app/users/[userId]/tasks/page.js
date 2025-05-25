"use client";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Nav from '../project/components/Nav';
import Filters from '../project/components/Filters';
import Task from './components/Task';
import './tasks.css';

// Static tasks array (initial data)
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

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const router = useRouter();
  const { userId } = useParams();

  // Log userId to verify it's being retrieved correctly
  console.log('userId from useParams:', userId);

  // Function to load tasks from localStorage and merge with initialTasks
  const loadTasks = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    
    // Check for duplicates by taskId and merge initialTasks with storedTasks
    const combinedTasks = [...initialTasks];
    storedTasks.forEach((storedTask) => {
      const exists = combinedTasks.some(
        (task) => task.taskId === storedTask.taskId
      );
      if (!exists) {
        combinedTasks.push(storedTask);
      }
    });

    setTasks(combinedTasks);
  };

  // Load tasks on mount and whenever userId changes
  useEffect(() => {
    loadTasks();
  }, [userId]);

  // Listen for route changes to refresh the task list
  useEffect(() => {
    const handleRouteChange = () => {
      loadTasks();
    };

    // Subscribe to route change events
    router.events?.on('routeChangeComplete', handleRouteChange);

    // Cleanup subscription on unmount
    return () => {
      router.events?.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Handle Add Task button click
  const handleAddTask = () => {
    console.log('Attempting to navigate with userId:', userId); // Debug navigation
    if (userId) {
      router.push(`/users/${userId}/tasks/addTask`);
    } else {
      console.warn('User ID not available');
      router.push('/login');
    }
  };

  // Filter tasks based on search query and status
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="tasks-page">
      {/* Header */}
      <header className="tasks-header">
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
      <main className="tasks-main">
        <div className="tasks-actions">
          <div className="spacer"></div>
          <button className="add-task-btn" onClick={handleAddTask}>
            Add Task
          </button>
        </div>

        {/* Search and Filters */}
        <div className="tasks-filters">
          <Filters
            onSearch={setSearchQuery}
            onStatusChange={setStatusFilter}
          />
        </div>

        {/* Task Cards */}
        <div className="tasks-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <Task
                key={task.taskId}
                title={task.title}
                location={task.location}
                status={task.status}
                deadline={task.deadline}
                description={task.description}
                taskId={task.taskId}
                userId={userId}
              />
            ))
          ) : (
            <p>No tasks found.</p>
          )}
        </div>
      </main>
    </div>
  );
}