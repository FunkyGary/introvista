'use client'

import React from 'react'

const ProductIntro = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {/* TODO: implement product image carousel */}
        <div className="">
          <img src="https://fakeimg.pl/480" alt="product" className="w-full" />
        </div>

        {/* product info */}
        <div className="">
          <h1 className="text-3xl font-bold">Product Name</h1>
          <p className="text-lg">Product Description</p>
          <p className="text-lg">Price: $100</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductIntro
