import React from 'react'

const HeaderComponent = () => {
  return (
    <div>
      <header>
        <nav 
          className="navbar navbar-dark bg-dark shadow-lg"
          style={{
            background: "linear-gradient(90deg, #0d47a1, #1976d2, #42a5f5)",
          }}
        >
          <a 
            className="navbar-brand mx-auto fw-bold fs-3 text-uppercase"
            href="/"
            style={{
              letterSpacing: "2px",
              color: "#fff",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            Employee Management System
          </a>
        </nav>
      </header>
    </div>
  )
}

export default HeaderComponent
