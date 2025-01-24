'use client'

import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from '@/components/ui/select'
import Link from 'next/link'
import { CirclePlus } from 'lucide-react'
import { ROUTES } from '@/paths'
import { usePathname } from 'next/navigation'

const ProjectSelector = () => {
  const [selectedProject, setSelectedProject] = useState('allProjects')

  return (
    <Select>
      <SelectTrigger className="rounded-sm w-[180px]">
        <SelectValue placeholder="所有專案" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">專案1</SelectItem>
        <SelectItem value="dark">專案2</SelectItem>
        <SelectItem value="system">專案3</SelectItem>
        <SelectSeparator />

        <Link href={ROUTES.DESIGNER.PROJECTS.NEW}>
          <div className="inline-flex gap-3 items-center p-2 w-full text-sm hover:text-primary-500">
            <span>新增專案</span>
          </div>
        </Link>
      </SelectContent>
    </Select>
  )
}

export default ProjectSelector
