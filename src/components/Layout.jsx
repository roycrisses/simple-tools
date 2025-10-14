import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
}

export default Layout
