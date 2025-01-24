'use client'

import React from 'react'
import ProjectCard from './project-card'
import Link from 'next/link'
import { fakeData } from './libs'
import { Plus } from 'lucide-react'
import { ROUTES } from '@/paths'

const ProjectsList = () => {
  const projects = fakeData
  return (
    <div className="grid grid-cols-4 gap-4 w-full">
      <div className="mx-auto w-60 border border-slate-600">
        <div className="flex justify-center items-center h-full">
          <Link
            href={ROUTES.DESIGNER.PROJECTS.NEW}
            className="inline-flex gap-2 items-center text-slate-600 group hover:text-primary-400"
          >
            <Plus className="border size-6 border-slate-600 group-hover:border-primary-400" />
            <span className="cursor-pointer font-medium">新增專案</span>
          </Link>
        </div>
      </div>
      {projects.map((data) => (
        <ProjectCard key={data.id} data={data} />
      ))}
    </div>
  )
}

export default ProjectsList
