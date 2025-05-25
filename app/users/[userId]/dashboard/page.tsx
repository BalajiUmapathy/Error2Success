import Head from "next/head";
import HomePage from "./components/homepage";
import "./page.css"; // Import the new page.css

export default function Home() {
  return (
    <>
      <header className="projects-header">
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
            {/* <button className="logout-btn" >Logout</button> */}
          </div>
        </div>
      </header>
      <Head>
        <title>UrbanNet Dashboard</title>
      </Head>
      <HomePage />
    </>
  );
}