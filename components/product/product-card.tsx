'use client'

import React, { useState } from 'react'
import { Heart, CircleArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ROUTES } from '@/paths'
import { cn } from '@/lib/utils'

interface ProductProp {
  isListView?: boolean
  data: {
    id: string
    name: string
    price: number
  }
}

const ProductCard: React.FC<ProductProp> = ({ data, isListView }) => {
  const { id, name, price } = data

  const [isFavorite, setIsFavorite] = useState(false)
  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    // TODO: Implement favorite feature with API
  }

  if (isListView) {
    return (
      <div className="flex justify-between py-4 w-full border-b border-slate-200">
        <div className="overflow-hidden relative flex-shrink-0 size-32">
          <img
            alt="product image"
            src="https://fakeimg.pl/240/"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col justify-between ml-4 w-full">
          <div>
            <h3 className="text-lg font-medium">{name}</h3>
            <p className="text-sm text-slate-500">NT ${price} /片</p>
          </div>
          <div className="flex gap-4 items-center justify-end mt-2">
            <button onClick={handleFavorite}>
              <Heart
                className={cn(
                  'size-6 hover:text-rose-500/70 fill-white text-slate-600 hover:fill-rose-500/70',
                  isFavorite ? 'fill-rose-600 text-rose-600' : ''
                )}
              />
            </button>
            <Link href={ROUTES.DESIGNER.PRODUCTS.DETAILS(id)}>
              <CircleArrowRight className="size-6 hover:text-primary-400" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto space-y-3 w-fit">
      <div className="flex relative flex-grow justify-center items-center">
        <div className="absolute top-4 right-4">
          <button onClick={handleFavorite}>
            <Heart
              className={cn(
                'size-6 hover:text-rose-500/70 fill-white text-slate-600 hover:fill-rose-500/70',
                isFavorite ? 'fill-rose-600 text-rose-600' : ''
              )}
            />
          </button>
        </div>
        <div className="overflow-hidden w-full aspect-square">
          <img alt="prodcut image" src="https://fakeimg.pl/240/" />
        </div>
      </div>

      <div className="inline-flex justify-between items-center px-px w-full text-slate-600">
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-slate-500">NT ${price} /片</p>
        </div>
        <Link href={ROUTES.DESIGNER.PRODUCTS.DETAILS(id)}>
          <CircleArrowRight className="size-6 hover:text-primary-400" />
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
