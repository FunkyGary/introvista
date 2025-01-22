'use client'

import React, { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
      </SelectContent>
    </Select>
  )
}

export default ProjectSelector
