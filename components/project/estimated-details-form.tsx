'use client'

import React from 'react'

interface EstimatedDetailsFormProps {
  totalSupplies: number
  totalMaterials: number
  estimatedArea: number
  perAreaCost: number
  totalCost: number
}

const estimatedFields = [
  { name: 'totalSupplies', label: '使用廠商數量', unit: '家' },
  { name: 'totalMaterials', label: '使用產品數量', unit: '件' },
  { name: 'estimatedArea', label: '預估可裝潢坪數', unit: '坪' },
  { name: 'perAreaCost', label: '每坪裝潢單價', unit: '元' },
  { name: 'totalCost', label: '預估總價', unit: '元' },
]

const EstimatedDetailsForm = () => {
  return (
    <div className="p-5 pt-10 pb-20 w-full rounded-md border shadow-md shadow-slate-300/50 border-slate-300">
      <div className="pb-6 text-2xl font-medium text-center">預估裝潢總表</div>
      <div className="flex gap-4 justify-between items-center">
        <div className="flex flex-col p-4 px-8 space-y-4 w-1/2">
          {estimatedFields.map(({ name, label, unit }) => (
            <div
              key={name}
              className="flex gap-3 justify-between items-center w-full"
            >
              <div className="text-slate-500">{label}</div>
              <div className="text-slate-700">{unit}</div>
            </div>
          ))}
        </div>
        <div className="w-1/2">
          <div className="overflow-hidden p-2 m-auto w-4/5 h-60 rounded border bg-slate-100" />
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default EstimatedDetailsForm
