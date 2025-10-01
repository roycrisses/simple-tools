import React from 'react'
import { SidebarAd } from './AdSense'

const Layout = ({ children }) => {
  return (
    <div className="flex justify-center min-h-screen max-w-full">
      {/* Left Sidebar Ad */}
      <div className="hidden xl:block w-72 flex-shrink-0">
        <div className="sticky top-24 p-4">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 border-2 border-gray-300 dark:border-gray-600">
            <SidebarAd adSlot="LEFT_SIDEBAR_SLOT" className="min-h-[600px]" />
          </div>
          
          {/* Additional ad space */}
          <div className="mt-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 border-2 border-gray-300 dark:border-gray-600">
            <SidebarAd adSlot="LEFT_SIDEBAR_SLOT_2" className="min-h-[300px]" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-6xl px-6">
        {children}
      </div>

      {/* Right Sidebar Ad */}
      <div className="hidden xl:block w-72 flex-shrink-0">
        <div className="sticky top-24 p-4">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 border-2 border-gray-300 dark:border-gray-600">
            <SidebarAd adSlot="RIGHT_SIDEBAR_SLOT" className="min-h-[600px]" />
          </div>
          
          {/* Additional ad space */}
          <div className="mt-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 border-2 border-gray-300 dark:border-gray-600">
            <SidebarAd adSlot="RIGHT_SIDEBAR_SLOT_2" className="min-h-[300px]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
