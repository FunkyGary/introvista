'use client'

import React from 'react'
import { ChevronRight } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { ROUTES } from '@/paths'

const ProductBreadcrumb = () => {
  return (
    <div className="pt-2 flex justify-between items-center">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>main category</BreadcrumbItem>

          <BreadcrumbSeparator>
            <ChevronRight className="size-4" />
          </BreadcrumbSeparator>

          <BreadcrumbItem>sub category</BreadcrumbItem>

          <BreadcrumbSeparator>
            <ChevronRight className="size-4" />
          </BreadcrumbSeparator>

          <BreadcrumbItem>product tags </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default ProductBreadcrumb
