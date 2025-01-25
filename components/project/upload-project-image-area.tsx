'use client'

import React from 'react'

const UploadProjectImageArea = () => {
  return (
    <div className="p-5 pt-10 pb-20 w-full rounded-md border shadow-md shadow-slate-300/50 border-slate-300">
      <div className="pb-6 text-2xl font-medium text-center">平面圖</div>
      <div className="flex flex-col gap-4 justify-between items-center w-full">
        <div className="w-5/6 border aspect-square rounded-md bg-slate-50"></div>
        <div className="inline-flex items-center">
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default UploadProjectImageArea
