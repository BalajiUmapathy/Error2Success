'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation'; // Added useRouter
import { useState } from 'react';
import TrainingsPage from './components/TrainingsPage'; 
import Nav from '../project/components/Nav';
import styles from './trainings.module.css';

export default function Page() {
  const { userId } = useParams();
  const userIdStr = Array.isArray(userId) ? userId[0] : userId;
  const router = useRouter(); // Initialize useRouter

  const handleLogout = () => {
    router.push('/'); // Navigate to the login page
  };

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.leftSpacer}></div> {/* Empty spacer to balance the layout */}
        <h1 className={styles.title}>Department of Public Works</h1>
        <div className={styles.profileGroup}>
          <div className={styles.avatar}>
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Navigation */}
      <Nav />

      {/* Main Content */}
      <main>
        <TrainingsPage userId={userIdStr!} />
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div>Feedback | Complaint</div>
        <div>Help</div>
      </footer>
    </div>
  );
}