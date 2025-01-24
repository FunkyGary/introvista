'use client'

import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import UploadProjectImageArea from '@/components/project/upload-project-image-area'
import EstimatedDetailsForm from '@/components/project/estimated-details-form'
import ProjectTitleInput from '@/components/project/project-title-input'
import ProjectNavigationButton from '@/components/project/project-navigation-button'
import ProjectInfoForm from './project-info-form'

interface ProjectFormProps {
  name: string
  address: string
  floor: string
  houseAge: string
  sqm: string
  space: string
  electricity: string
  requirement: string
  numberOfPepole: number
}

const ProjectForm = () => {
  const { register, handleSubmit, control } = useForm<ProjectFormProps>()

  return (
    <div className="py-10 px-4 space-y-5">
      <div className="grid grid-cols-3 gap-3 pb-10">
        <div>
          <div className="inline-flex items-center">製圖日期: createdtime</div>
          <div>製作者: username</div>
        </div>
        <ProjectTitleInput initialValue="Untitled Project" projectId="2" />
      </div>
      <ProjectNavigationButton />
      <div className="flex gap-4 justify-between items-center">
        <ProjectInfoForm />
        <UploadProjectImageArea />
      </div>

      <div>
        <EstimatedDetailsForm />
      </div>
    </div>
  )
}

export default ProjectForm
