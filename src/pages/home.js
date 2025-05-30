import { useUser } from "../auth/context";

export default function Home() {
 
    const { username } = useUser();

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
            }}
        >
            <div
                style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                    borderRadius: '24px',
                    padding: '48px 36px',
                    maxWidth: '100%',
                    width: '100%',
                    textAlign: 'center',
                    border: '1px solid #e0e7ff',
                }}
            >
                <h2
                    style={{
                        color: '#6366f1',
                        fontSize: '2.5rem',
                        marginBottom: '16px',
                        fontWeight: 700,
                        letterSpacing: '1px',
                        textShadow: '0 2px 8px #e0e7ff',
                    }}
                >
                    Welcome to the CRUD Application {username ? `, ${username}` : 'My Guest'}! ❤️
                </h2>
                <div style={{ color: '#374151', fontSize: '1.1rem', lineHeight: 1.7 }}>
                    <p style={{ marginBottom: '12px' }}>
                        This application allows you to <b>create</b>, <b>read</b>, <b>update</b>, and <b>delete</b> records with ease.
                    </p>
                    <p style={{ marginBottom: '12px' }}>
                        Use the navigation bar above to access different functionalities.
                    </p>
                    <p style={{ marginBottom: '12px' }}>
                        Feel free to explore and test the features!
                    </p>
                    <p style={{ marginBottom: '12px' }}>
                        For any issues or feedback, please contact the support team.
                    </p>
                    <p style={{ color: '#10b981', fontWeight: 600, fontSize: '1.15rem' }}>
                        Happy CRUDing! <span role="img" aria-label="sparkles">✨</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

// import React from 'react';
// import './Home.css';

// export default function Home() {
//   return (
//     <div style={{width: '100%'}} className="slideshow-container">
//       <div className="slide slide-1"></div>
//       <div className="slide slide-2"></div>
//       <div className="slide slide-3"></div>
//       <div className="slide slide-4"></div>
//       <div className="content">
//         <h1>Welcome to the Home Page</h1>
//         <p>Explore our site with a seamless slideshow background.</p>
//       </div>
//     </div>
//   );
// }