// app/users/[userId]/project/addProject/page.js
export default function AddProjectPage({ params }) {
  const { userId } = params;
  return (
    <div className="add-project-page">
      <h1>Add Project for User {userId}</h1>
      <p>Form to create a new project will go here.</p>
      {/* Add your project creation form here */}
    </div>
  );
}