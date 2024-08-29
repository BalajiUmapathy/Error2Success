import React from 'react';

export default function Footer() {
    let yr = new Date().getFullYear();

    return (
        <footer className="footer d-flex flex-row  p-3">
<h1 className="col-4 text-start" style={{ fontSize: "20px",fontWeight:"500" }}>Complaints | Feedback</h1>
<p className="col-8 text-center f-p">© {yr} UrbanNet. All Rights Reserved.</p>
        </footer>
    );
}
