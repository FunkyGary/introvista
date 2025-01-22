'use client'

import Sidebar from '@/components/ui/sidebar'
import React from 'react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const handleToggle = () => setIsCollapsed(!isCollapsed)

  return (
    <>
      {/* sidebar trigger */}
      <div
        className={cn(
          'fixed z-50 bottom-20 transition-all duration-300 ease-in-out delay-100',
          isCollapsed ? 'opacity-100 left-0' : 'left-48 rotate-180 '
        )}
      >
        <button
          onClick={handleToggle}
          className={cn(
            'opacity-45 hover:opacity-100 flex justify-center rounded-r-2xl  items-center cursor-pointer  h-10 w-12 m-auto transition-opacity duration-100 ease-in',
            isCollapsed
              ? 'text-primary-400 bg-primary-50 hover:bg-primary-100 border border-primary-200'
              : 'text-gray-600 hover:text-primary-400 hover:bg-primary-100'
          )}
        >
          <ArrowRight className="size-5" />
        </button>
      </div>
      <Sidebar isCollapsed={isCollapsed} />
      <main
        className={cn(
          'w-full flex-1 px-6 pt-16 transition-all duration-300 ease-in-out delay-100',
          isCollapsed ? 'ml-0' : 'ml-60'
        )}
      >
        {children}
      </main>
    </>
  )
}
