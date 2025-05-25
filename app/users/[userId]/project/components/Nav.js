"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../Nav.css';

export default function Nav() {
  const router = useRouter();
  const links = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Tasks', href: '/tasks' },
    { name: 'Resources', href: '/resources' },
    { name: 'Discussion Forum', href: '/discussion-forum' },
    { name: 'Trainings', href: '/trainings' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <>
      {/* Header Section (from Navbar) */}
      {/* <header className="header-bar">
        <h1 className="header-title">BuildVerse</h1>
        <div className="header-actions">
          <Link href="/dashboard">
            <button className="header-btn">Dashboard</button>
          </Link>
          <Link href="/projects">
            <button className="header-btn">Projects</button>
          </Link>
          <button className="header-btn logout-btn">Logout</button>
        </div>
      </header> */}

      {/* Navigation Tabs (from Nav) */}
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