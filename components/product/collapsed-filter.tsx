'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const filterOptions = [
  {
    label: '品牌',
    options: ['a', 'b', 'c', 'd', 'e'],
  },
  {
    label: '特性',
    options: ['高功率', '低功率', '可撓性', '防水', '抗UV', '隔音'],
  },
  {
    label: '佈置地點',
    options: ['廚房', '衛浴', '臥室', '客廳', '陽台', '室外'],
  },
  {
    label: '價格',
    input: true,
  },
]

const CollapsedFilter = () => {
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handlePriceSubmit = () => {
    console.log(`Price range: $${priceMin} - $${priceMax}`)
  }

  return (
    <Tabs>
      <TabsList className="grid grid-cols-4 w-[500px]">
        {filterOptions.map(({ label }, index) => (
          <TabsTrigger
            key={label}
            value={label.toLowerCase()}
            className={cn(
              'border-r border-slate-400',
              index == 3 && 'border-none'
            )}
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {filterOptions.map(({ label, options, input }) => (
        <TabsContent
          key={label}
          value={label.toLowerCase()}
          className="p-2 rounded border border-slate-100 shadow-md"
        >
          {input ? (
            <div className="mb-4">
              <div className="flex items-center ml-1 cursor-pointer">
                <h3 className="font-medium text-slate-600">價格區間</h3>
              </div>
              <div className="flex justify-between mt-2">
                <div className="inline-flex gap-2">
                  <input
                    type="number"
                    placeholder="最低價格"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="py-1 px-2 rounded-md border"
                  />
                  <input
                    type="number"
                    placeholder="最高價格"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="py-1 px-2 rounded-md border"
                  />
                </div>
                <button
                  onClick={handlePriceSubmit}
                  className="py-1 px-4 text-white rounded-md bg-primary-500"
                >
                  搜尋
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
              {options?.map((option, index) => (
                <div
                  key={option}
                  className="flex justify-center py-1 px-3 bg-white border cursor-pointer border-slate-200 hover:text-primary-400"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default CollapsedFilter
