"use client"

import withAuthRequired from "@/components/hoc/with-auth-required"
import { notFound } from "next/navigation"
import { getProductByProductId } from "@/lib/actions/product"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ProductCreateDto } from "@/lib/product/product-create.dto"
import { useUser } from "@/hooks/use-user"
import ProductForms from "@/components/dashboard/product/productForms"

function ProductPage({ params }: { params: { id: string } }) {
  const productId = params.id
  const { user } = useUser()
  const [data, setData] = useState<any | null>(null)

  // fetch the product data
  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductByProductId(productId)
      setData(product)
    }
    fetchProduct()
  }, [productId])

  // Fetch the product data
  const product: ProductCreateDto = {
    modelName: "Sample Furniture",
    category: "item",
    weight: 0,
    material: "",
    modelCategory: "",
    brand: "",
    dimensions: "",
    stockQuantity: 0,
    price: 0,
    description: "",
    thumbnailImages: [],
    modelFileGLB: undefined,
    modelFileUSD: undefined,
  }

  if (!product) {
    notFound()
  }

  return (
    <main className="flex flex-col gap-4 p-4 min-h-screen">
      <ProductForms initialData={data} productId={productId} readOnly={true} />
    </main>
  )
}

export default withAuthRequired(ProductPage)
