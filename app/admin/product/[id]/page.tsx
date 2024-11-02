'use client'

import withAuthRequired from '@/components/hoc/with-auth-required'
import { notFound } from 'next/navigation'
import { ProductCreateDto } from '@/lib/product/product-create.dto'
import ProductForms from '@/components/dashboard/product/productForms'

function ProductPage({ params }: { params: { id: string } }) {
  const productId = params.id

  // Fetch the product data
  const product: ProductCreateDto = {
    modelName: 'Sample Furniture',
    category: 'item',
    weight: 0,
    material: '',
    modelCategory: '',
    brand: '',
    dimensions: '',
    stockQuantity: 0,
    price: 0,
    description: '',
    thumbnailImages: [],
    modelFileGLB: undefined,
    modelFileUSD: undefined,
  }

  if (!product) {
    notFound()
  }

  return (
    <main className="flex flex-col justify-between items-center p-1 min-h-screen">
      <ProductForms initialData={product} productId={productId} />
    </main>
  )
}

export default withAuthRequired(ProductPage)
