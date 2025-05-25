"use client";
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import '../Nav.css';

export default function Nav() {
  const router = useRouter();
  const { userId } = useParams(); // Get userId from URL params

  // Log userId to verify it's being retrieved correctly
  console.log('Nav: userId from useParams:', userId);

  // Define the navigation links with dynamic href values
  const links = [
    { name: 'Home', href: userId ? `/users/${userId}/dashboard`   : '/dashboard' },
    { name: 'Projects', href: userId ? `/users/${userId}/project` : '/projects' },
    { name: 'Tasks', href: userId ? `/users/${userId}/tasks` : '/tasks' },
    { name: 'Resources', href: userId ? `/users/${userId}/resources` : '/resources' },
    // { name: 'Discussion Forum', href: userId ? `/users/${userId}/discussion-forum` : '/discussion-forum' },
    { name: 'Trainings', href: userId ? `/users/${userId}/trainings` : '/trainings' },
    // { name: 'Dashboard', href: userId ? `/users/${userId}/dashboard` : '/dashboard' },
  ];

  // If userId is not available, redirect to login (optional)
  if (!userId) {
    console.warn('Nav: userId not available, redirecting to login');
    router.push('/login');
    return null; // Prevent rendering until redirect
  }

  return (
    <>
      {/* Navigation Tabs */}
      <nav className="nav-bar">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`nav-link ${
              router.pathname === link.href ? 'nav-link-active' : ''
            } ${link.name === 'Dashboard' ? 'nav-link-dashboard' : ''}`}
          >
            {link.name.toUpperCase()}
          </Link>
        ))}
      </nav>
    </>
  );
}