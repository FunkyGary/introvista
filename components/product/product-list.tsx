import React from 'react'
import ProductCard from '@/components/product/product-card'
import { fakeData } from './libs'

const ProductList = () => {
  return (
    <div className="grid grid-cols-5 gap-2 md:gap-4 py-4 w-full">
      {fakeData.map((product) => (
        <div key={product.id}>
          <ProductCard data={product} />
        </div>
      ))}
    </div>
  )
}

export default ProductList
