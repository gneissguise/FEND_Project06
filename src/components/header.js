import React from 'react'

// Basic styled header
const Header = ({ siteTitle }) => (
  <div
    style={{
      marginBottom: '1rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1rem 0.75rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
          {siteTitle}
      </h1>
    </div>
  </div>
)

export default Header
