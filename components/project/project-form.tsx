'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import UploadProjectImageArea from '@/components/project/upload-project-image-area'
import EstimatedDetailsForm from '@/components/project/estimated-details-form'
import ProjectTitleInput from '@/components/project/project-title-input'
import ProjectNavigationButton from '@/components/project/project-navigation-button'
import ProjectInfoForm from './project-info-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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

      {/* Tabs */}
      <Tabs defaultValue="project-info" className="w-full">
        <TabsList className="grid grid-cols-3 w-full my-4">
          <TabsTrigger value="project-info" className="text-xl">
            專案概要
          </TabsTrigger>
          <TabsTrigger value="project-image" className="text-xl">
            平面圖
          </TabsTrigger>
          <TabsTrigger value="estimated-details" className="text-xl">
            預估裝潢總表
          </TabsTrigger>
        </TabsList>

        <TabsContent value="project-info">
          <ProjectInfoForm />
        </TabsContent>

        <TabsContent value="project-image">
          <UploadProjectImageArea />
        </TabsContent>

        <TabsContent value="estimated-details">
          <EstimatedDetailsForm />
        </TabsContent>
      </Tabs>

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
