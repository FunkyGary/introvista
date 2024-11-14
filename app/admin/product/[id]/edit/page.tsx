"use client"

import withAuthRequired from "@/components/hoc/with-auth-required"
import { notFound } from "next/navigation"
import { getProductByProductId } from "@/lib/actions/product"
import { useEffect, useState } from "react"
import { useUser } from "@/hooks/use-user"
import ProductForms from "@/components/dashboard/product/productForms"
import { ProductCreateDto } from "@/lib/product/product-create.dto"

function ProductEditPage({ params }: { params: { id: string } }) {
  const productId = params.id
  const { user } = useUser()
  const [data, setData] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // fetch the product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductByProductId(productId)
        setData(product)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProduct()
  }, [productId])

  if (!isLoading && !data) {
    notFound()
  }

  return (
    <main className="flex flex-col justify-between items-center p-1 min-h-screen">
      <ProductForms initialData={data} productId={productId} />
    </main>
  )
}

export default withAuthRequired(ProductEditPage)
