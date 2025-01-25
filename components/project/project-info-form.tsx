'use client'

import React from 'react'
import { useForm, Controller } from 'react-hook-form'

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

const formFields = [
  { name: 'name', label: '姓名', type: 'text' },
  { name: 'address', label: '地址', type: 'text' },
  { name: 'floor', label: '樓層', type: 'text' },
  { name: 'houseAge', label: '屋齡', type: 'text' },
  { name: 'sqm', label: '坪數', type: 'text' },
  { name: 'space', label: '空間', type: 'text' },
  { name: 'electricity', label: '電力', type: 'text' },
  { name: 'numberOfPepole', label: '人數', type: 'number' },
  { name: 'requirement', label: '需求', type: 'textarea' },
]

const ProjectInfoForm = () => {
  const { register, handleSubmit, control } = useForm<ProjectFormProps>()

  const renderInput = (field: any) => {
    return (
      <div className="inline-flex gap-4 justify-center items-center w-full">
        <label htmlFor={field.name}>{field.label}</label>
        {field.type === 'textarea' ? (
          <textarea
            name={field.name}
            id={field.name}
            className="p-3 w-2/3 h-24 rounded-md border resize-none border-slate-600"
          />
        ) : (
          <input
            type={field.type}
            name={field.name}
            id={field.name}
            className="py-1 px-3 w-2/3 rounded-md border border-slate-600"
          />
        )}
      </div>
    )
  }

  return (
    <div className="p-5 pt-10 pb-20 w-full rounded-md border shadow-md shadow-slate-300/50 border-slate-300">
      <div className="pb-6 text-2xl font-medium text-center">專案概要</div>
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        {formFields.map((field) => renderInput(field))}
      </div>
    </div>
  )
}

export default ProjectInfoForm
