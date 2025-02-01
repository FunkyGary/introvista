'use client'

import React from 'react'

const ProductIntro = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <img
            src="https://via.placeholder.com/500x500"
            alt="product"
            className="w-full"
          />
        </div>
        <div className="w-full md:w-1/2">
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
