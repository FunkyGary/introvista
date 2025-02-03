'use client'

import React, { useState } from 'react'
import ProductCard from '@/components/product/product-card'
import { LayoutList, LayoutGrid } from 'lucide-react'
import { fakeData } from './libs'
import { cn } from '@/lib/utils'

const ProductList = () => {
  const [isListView, setIsListView] = useState(false)

  return (
    <div>
      <div className="w-full flex justify-end gap-3">
        <button onClick={() => setIsListView(false)}>
          <LayoutGrid className={cn(!isListView ? 'text-primary-400' : '')} />
        </button>

        <button
          className={cn(isListView ? 'text-primary-400' : '')}
          onClick={() => setIsListView(true)}
        >
          <LayoutList />
        </button>
      </div>
      <div
        className={cn(
          'grid grid-cols-5 gap-3 py-4 w-full md:gap-4',
          isListView ? 'grid-cols-1' : 'grid-cols-5'
        )}
      >
        {fakeData.map((product) => (
          <div key={product.id}>
            <ProductCard isListView={isListView} data={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
