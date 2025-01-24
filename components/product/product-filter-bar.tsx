'use client'

import React from 'react'
import CollapsedFilter from './collapsed-filter'

const ProductFilterBar = () => {
  return (
    <div className="space-y-4 text-xs">
      {/* filter and search input */}
      <div className="flex justify-between items-start py-4 border-b border-slate-500">
        <div className="flex gap-3 w-5/6">
          <div className="mr-4 mt-2">篩選器</div>
          <CollapsedFilter />
        </div>
        <div>
          <input
            type="text"
            placeholder="關鍵字查詢"
            className="p-2 w-52 h-7 rounded-full  border-2 border-slate-400"
          />
        </div>
      </div>

      {/* filter button to sorted by price,  most recommended and the newest products */}
      <div className="flex gap-3 items-center ">
        <div className="mr-2">商品排列</div>
        <button className="py-1 px-4 font-medium tracking-wider rounded-full border border-slate-500 text-slate-500">
          價格高/低
        </button>
        <button className="py-1 px-4 font-medium tracking-wider rounded-full border border-slate-500 text-slate-500">
          最新產品
        </button>
        <button className="py-1 px-4 font-medium tracking-wider rounded-full border border-slate-500 text-slate-500">
          人氣推薦
        </button>
      </div>
    </div>
  )
}

export default ProductFilterBar
