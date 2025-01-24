'use client'

import React from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'

const ProductFilterBar = () => {
  return (
    <div className="space-y-2 text-xs">
      {/* filter slider and search input */}
      <div className="flex justify-between items-start py-4 border-b border-slate-500">
        <div className="flex gap-3">
          <div className="mr-2">篩選器</div>
          {/* TODO: filter slider */}
          <div></div>
        </div>
        <div>
          <input
            type="text"
            placeholder="關鍵字查詢"
            className="p-2 w-52 h-7 rounded-full  border-2 border-slate-400"
          />
        </div>
      </div>

      {/* menu dropdown filter to sorted by price,  most recommended and the newest products */}
      <div className="flex gap-3 items-center">
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
