import React from 'react'

const FooterComponent = () => {
  const footerHeight = 64; // px

  return (
    <footer
      className="text-center text-white d-flex align-items-center justify-content-center"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        height: `${footerHeight}px`,
        background: 'linear-gradient(90deg, #0d47a1, #1976d2, #42a5f5)',
        boxShadow: '0 -6px 20px rgba(13,71,161,0.25)',
        zIndex: 1000,
        fontWeight: 600,
        letterSpacing: '0.6px',
      }}
      aria-label="Application footer"
    >
      <div style={{ padding: '10px 16px', width: '100%' }}>
        <span style={{ fontSize: 16 }}>
          © All Rights Reserved 2025 | <strong>EasyCoder</strong>
        </span>
      </div>
    </footer>
  )
}

export default FooterComponent
