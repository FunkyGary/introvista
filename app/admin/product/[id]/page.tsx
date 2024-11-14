"use client"

import withAuthRequired from "@/components/hoc/with-auth-required"
import { notFound } from "next/navigation"
import { getProductByProductId } from "@/lib/actions/product"
import { useEffect, useState } from "react"
import Link from "next/link"
import ProductForms from "@/components/dashboard/product/productForms"

function ProductPage({ params }: { params: { id: string } }) {
  const productId = params.id
  const [data, setData] = useState<any | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductByProductId(productId)
      setData(product)
    }
    fetchProduct()
  }, [productId])

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <main className="flex flex-col gap-4 p-4 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{data.modelName}</h1>
        <Link
          href={`/admin/product/${productId}/edit`}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          編輯商品
        </Link>
      </div>

      <ProductForms initialData={data} productId={productId} readOnly={true} />
    </main>
  )
}

export default withAuthRequired(ProductPage)
