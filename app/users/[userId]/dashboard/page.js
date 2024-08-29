"use client";  // Ensure this is the first line in your component file

import { useRouter } from 'next/navigation';  // Correct import for App Router

export default function Dashboard() {
  const router = useRouter();  // Initialize the router

  function back() {
    router.push('/project');  // Navigate to the '/project' route
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button className="btn btn-primary" onClick={back}>Back</button>
    </main>
  );
}
