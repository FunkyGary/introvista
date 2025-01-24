'use client'

import React from 'react'

const ProjectFilter = () => {
  return (
    <div className="flex justify-between items-center py-12 px-5">
      <h1 className="text-4xl">專案管理</h1>
      <div className="inline-flex gap-4 justify-between items-center">
        <button className="py-1 px-8 font-semibold tracking-wider rounded-full border border-slate-500 text-slate-500 hover:border-primary-500 hover:bg-primary-100 hover:text-primary-500">
          日期近/遠
        </button>

        <button className="py-1 px-6 font-semibold tracking-wider rounded-full border border-slate-500 text-slate-500 hover:border-primary-500 hover:bg-primary-100 hover:text-primary-500">
          專案狀態
        </button>

        <button className="py-1 px-6 font-semibold tracking-wider rounded-full border border-slate-500 text-slate-500 hover:border-primary-500 hover:bg-primary-100 hover:text-primary-500">
          標註星號
        </button>

        {/* search input*/}
        <div>
          <input
            type="text"
            placeholder="專案查詢"
            className="p-3 w-60 h-8 rounded-full border border-slate-500 focus:outline-primary-500"
          />
        </div>
      </div>
    </div>
  )
}

export default ProjectFilter
