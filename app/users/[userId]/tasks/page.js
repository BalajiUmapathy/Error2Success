"use client";
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Nav from '../project/components/Nav';
import Filters from '../project/components/Filters';
import Task from './components/Task';
import './tasks.css';

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
  {
    title: "Assess Bridge Structural Integrity",
    location: "Chennai Saidapet",
    status: "Pending",
    deadline: "5th September 2025",
    description: "Perform an assessment of the structural integrity of the bridge near Saidapet.",
    taskId: "5",
  },
  {
    title: "Finalize Tender for Bypass Road",
    location: "Chennai Tambaram",
    status: "Ongoing",
    deadline: "28th July 2024",
    description: "Finalize the tender documents and vendor selection for Tambaram bypass road project.",
    taskId: "6",
  },
  {
    title: "Evaluate Stormwater System",
    location: "Chennai Perambur",
    status: "Completed",
    deadline: "12th March 2024",
    description: "Evaluate the newly installed stormwater system in Perambur for functionality and compliance.",
    taskId: "7",
  },
  {
    title: "Plan Pedestrian Skywalk",
    location: "Chennai Guindy",
    status: "Pending",
    deadline: "22nd December 2025",
    description: "Plan the design and execution strategy for a pedestrian skywalk in Guindy.",
    taskId: "8",
  },
];


export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const router = useRouter();
  const { userId } = useParams();
  const searchParams = useSearchParams();

  // Log userId to verify it's being retrieved correctly
  console.log('TasksPage: userId from useParams:', userId);

  // Function to load tasks from localStorage and merge with initialTasks
  const loadTasks = useCallback(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      console.log('TasksPage: Stored tasks from localStorage:', storedTasks); // Debug
      
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

      console.log('TasksPage: Combined tasks:', combinedTasks); // Debug
      setTasks(combinedTasks);
    } catch (error) {
      console.error('TasksPage: Error loading tasks from localStorage:', error);
      setTasks([...initialTasks]); // Fallback to initialTasks
    }
  }, []);

  // Load tasks on mount and whenever userId changes
  useEffect(() => {
    console.log('TasksPage: Initial load or userId changed, loading tasks');
    loadTasks();
  }, [userId, loadTasks]);

  // Listen for route changes to refresh the task list
  useEffect(() => {
    const handleRouteChange = () => {
      console.log('TasksPage: Route change detected, reloading tasks');
      loadTasks();
    };

    // Subscribe to route change events
    router.events?.on('routeChangeComplete', handleRouteChange);

    // Cleanup subscription on unmount
    return () => {
      router.events?.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, loadTasks]);

  // Reload tasks if the 'refresh' query parameter is present
  useEffect(() => {
    const refresh = searchParams.get('refresh');
    console.log('TasksPage: Refresh query parameter:', refresh); // Debug
    if (refresh === 'true') {
      console.log('TasksPage: Refresh query parameter detected, reloading tasks');
      loadTasks();
    }
  }, [searchParams, loadTasks]);

  // Handle Add Task button click
  const handleAddTask = () => {
    console.log('TasksPage: Attempting to navigate with userId:', userId); // Debug navigation
    if (userId) {
      router.push(`/users/${userId}/tasks/addTask`);
    } else {
      console.warn('TasksPage: User ID not available');
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