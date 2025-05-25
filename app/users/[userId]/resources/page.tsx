'use client';

import React, { useEffect, useState } from 'react';
import styles from './resourcePage.module.css';
import { useRouter, useParams } from 'next/navigation';
import { getResources } from '@/store/resourceStore';
import Nav from '../project/components/Nav'; // Import Nav component

// Define the Resource interface
interface Resource {
  id: string;
  name: string;
  type: string;
  status: string;
  quantity: number;
  project: string;
}

const ResourcePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [resourceList, setResourceList] = useState<Resource[]>([]);
  const router = useRouter();
  const { userId } = useParams();

  console.log('ResourcePage: userId from useParams:', userId);


  useEffect(() => {
    setResourceList(getResources());
  }, []);

  const filteredResources = resourceList.filter((res) => {
    return (
      res.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === '' || res.status === statusFilter)
    );
  });

  const handleViewEdit = (resourceId: string) => {
    if (userId) {
      router.push(`/users/${userId}/resources/${resourceId}`);
    } else {
      console.error('ResourcePage: userId is not available for routing');
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Department of Public Works</h1>
          <div className={styles.headerActions}>
            <div className={styles.userIcon}>
              <svg
                className={styles.userIconSvg}
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
            <button className={styles.logoutBtn}>Logout</button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <Nav />

      {/* Main Content */}
      <main>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Resources Overview</h1>
          <button
            className={styles.requestButton}
            onClick={() => {
              if (userId) {
                router.push(`/users/${userId}/resources/request`);
              } else {
                console.error('ResourcePage: userId is not available for routing');
              }
            }}
          >
            REQUEST
          </button>
        </div>

        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Search"
            className={styles.input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.select}
          >
            <option value="">Status</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Waiting">Waiting</option>
            <option value="Requested">Requested</option>
          </select>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Resource Name</th>
                <th className={styles.th}>Resource Type</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Quantity</th>
                <th className={styles.th}>Assigned Project</th>
                <th className={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredResources.map((res, index) => (
                <tr key={res.id || index}>
                  <td className={styles.td}>{res.name}</td>
                  <td className={styles.td}>{res.type}</td>
                  <td className={styles.td}>{res.status}</td>
                  <td className={styles.td}>{res.quantity}</td>
                  <td className={styles.td}>{res.project}</td>
                  <td className={styles.td}>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleViewEdit(res.id)}
                    >
                      View And Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <p>Feedback | Complaint</p>
          <p>Help</p>
        </div>
        <p className="mt-1">Copyrights 2024 UrbanNet All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ResourcePage;