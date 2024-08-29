"use client";

import React from 'react';
import Link from 'next/link';
import styles from './NavBar.module.css';  // Importing CSS module for styles

export default function NavBar() {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li className={styles.navItem}><Link href="/" className={styles.navLink}>Home</Link></li>
                <li className={styles.navItem}><Link href="/projects" className={styles.navLink}>Projects</Link></li>
                <li className={styles.navItem}><Link href="/tasks" className={styles.navLink}>Tasks</Link></li>
                <li className={styles.navItem}><Link href="/resources" className={styles.navLink}>Resources</Link></li>
                <li className={styles.navItem}><Link href="/forum" className={styles.navLink}>Discussion Forum</Link></li>
                <li className={styles.navItem}><Link href="/trainings" className={styles.navLink}>Trainings</Link></li>
                <li className={styles.navItem}><Link href="/support" className={styles.navLink}>Support</Link></li>
            </ul>
        </nav>
    );
}
