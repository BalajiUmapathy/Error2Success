// app/users/[userId]/project/components/Filters.js
"use client";
import { useState } from 'react';
import '../Filters.css';

export default function Filters({ onSearch, onStatusChange }) {
  const [status, setStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const statusOptions = ['All', 'Ongoing', 'Completed', 'Pending'];

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Pass search query to parent
  };

  // Handle status filter change
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onStatusChange(newStatus); // Pass status to parent
  };

  return (
    <div className="filters-container">
      <div className="search-bar">
        <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input
          type="text"
          placeholder="Search by location"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="status-filter">
        <select
          value={status}
          onChange={handleStatusChange}
          className="status-dropdown"
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
      <button className="calendar-btn">
        <svg className="calendar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      </button>
    </div>
  );
}