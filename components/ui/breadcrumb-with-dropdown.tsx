'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const BreadcrumbWithDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className="absolute left-0 -top-16  w-full">
      <div className="relative">
        <Breadcrumb>
          <BreadcrumbList className="flex justify-center">
            <BreadcrumbItem className="h-16 z-50">
              <button
                onMouseEnter={() => setIsDropdownOpen(true)}
                className="font-medium"
              >
                所有產品
              </button>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div
          onMouseLeave={() => setIsDropdownOpen(false)}
          className={cn(
            'z-30 w-full h-[380px] bg-white/80 backdrop-filter backdrop-blur-sm border-b border-slate-300 p-4 fixed',
            isDropdownOpen ? 'block' : 'hidden'
          )}
        >
          <div className="grid grid-cols-4 gap-4">
            <div>col1</div>
            <div>col2</div>
            <div>col3</div>
            <div>col4</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BreadcrumbWithDropdown
