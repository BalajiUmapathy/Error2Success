'use client';

import React from 'react';
import styles from './requestForm.module.css';
import { useRouter } from 'next/navigation';
import { addResource } from '@/store/resourceStore';

const RequestForm: React.FC = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const name = form['resource-name'].value;
    const type = form['resource-type'].value;
    const quantity = form['quantity'].value;
    const department = form['departments'].value;

    if (!name || !type || !quantity) return;

    addResource({
      name,
      type,
      quantity: parseInt(quantity),
      status: 'Requested',
      project: '—',
      department,
    });

    router.push('/users/6831999d003c625cf21a/resources');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>Request Resource</header>

      <main className={styles.formContainer}>
        <form className={styles.requestForm} onSubmit={handleSubmit}>
          {/* Resource Name */}
          <div className={styles.formRow}>
            <label className={styles.label} htmlFor="resource-name">Resource Name</label>
            <div className={styles.inputBox}>
              <select className={styles.select} name="resource-name" id="resource-name" required>
                <option value="">Select Resource</option>
                <option value="Road Roller">Road Roller (Static & Vibratory)</option>
                <option value="Asphalt Paver Machine">Asphalt Paver Machine</option>
                <option value="Bitumen Sprayer">Bitumen Sprayer / Distributor</option>
                <option value="Milling Machine">Milling Machine</option>
                <option value="Soil Compactor">Soil Compactor</option>
                <option value="Grader">Grader / Motor Grader</option>
                <option value="Bulldozer">Bulldozer</option>
                <option value="Excavator">Excavator</option>
                <option value="Trenchers">Trenchers</option>
                <option value="Pipe Laying Crane">Pipe Laying Crane</option>
                <option value="Pipe Bending Machine">Pipe Bending Machine</option>
                <option value="Pipe Cutting Machine">Pipe Cutting Machine</option>
                <option value="JCB Backhoe Loader">JCB Backhoe Loader</option>
                <option value="Skid Steer">Skid Steer Loader</option>
                <option value="Tower Light">Tower Light / Lighting Tower</option>
                <option value="Power Generator">Power Generator</option>
                <option value="Concrete Vibrator">Concrete Vibrator</option>
                <option value="Traffic Cones">Traffic Cones</option>
                <option value="Sign Boards">Sign Boards (Work in Progress, Detour, etc.)</option>
                <option value="Safety Jackets">Reflective Safety Jackets</option>
                <option value="Barricades">Barricades / Safety Barriers</option>
              </select>
              <span className={styles.icon}>⌄</span>
            </div>
          </div>

          {/* Resource Type */}
          <div className={styles.formRow}>
            <label className={styles.label} htmlFor="resource-type">Resource Type</label>
            <div className={styles.inputBox}>
              <select className={styles.select} name="resource-type" id="resource-type" required>
                <option value="">Select Type</option>
                <option value="Machinery">Machinery</option>
                <option value="Utility Equipment">Utility Equipment</option>
                <option value="Safety Equipment">Safety Equipment</option>
                <option value="Material">Material</option>
                <option value="Tools">Tools</option>
                <option value="Manpower">Manpower</option>
                <option value="Vehicles">Vehicles</option>
              </select>
              <span className={styles.icon}>⌄</span>
            </div>
          </div>

          {/* Quantity */}
          <div className={styles.formRow}>
            <label className={styles.label} htmlFor="quantity">Quantity Needed</label>
            <div className={styles.inputBox}>
              <input
                className={styles.input}
                type="number"
                name="quantity"
                placeholder="Enter Quantity"
                required
              />
              <span className={styles.icon}>✎</span>
            </div>
          </div>

          {/* Department */}
          <div className={`${styles.formRow} ${styles.fullWidth}`}>
            <label className={styles.label} htmlFor="departments">Departments</label>
            <div className={styles.inputBox}>
              <select className={styles.select} name="departments" id="departments">
                <option value="">Select Department</option>
                <option value="PWD">PWD (Public Works Department)</option>
                <option value="MoRTH">MoRTH (Ministry of Road Transport and Highways)</option>
                <option value="MoHUA">MoHUA (Ministry of Housing and Urban Affairs)</option>
                <option value="State Rural">State Rural Development Department</option>
                <option value="Municipal">Municipal Corporation / Urban Local Bodies</option>
                <option value="Labour">Ministry of Labour and Employment</option>
                <option value="Transport">Transport Department</option>
              </select>
              <span className={styles.icon}>⌄</span>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className={styles.submitBtn}>Send</button>
        </form>
      </main>

      <footer className={styles.footer}>
        <span>© Govt of India 2025</span>
        <span>All Rights Reserved</span>
      </footer>
    </div>
  );
};

export default RequestForm;
