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
        <div className="flex flex-col justify-center text-sm">
          <div>製圖日期: createdtime</div>
          <div>製作者: username</div>
        </div>
        <ProjectTitleInput initialValue="Untitled Project" projectId="2" />
      </div>
      <ProjectNavigationButton />
      <div className="grid grid-cols-2 gap-4">
        <ProjectInfoForm />
        <UploadProjectImageArea />
        <div className="col-span-2">
          <EstimatedDetailsForm />
        </div>
      </div>
      <div className="flex gap-5 justify-end pt-10 pb-20">
        <button className="py-1 w-24 font-semibold tracking-widest text-rose-500 bg-white rounded-lg border border-rose-500 hover:text-rose-50 hover:bg-rose-500">
          取消
        </button>
        <button className="py-1 w-24 font-semibold tracking-widest text-white rounded-lg border border-primary-main bg-primary-main hover:opacity-85">
          新增
        </button>
      </div>
    </div>
  )
}

export default ProjectForm
