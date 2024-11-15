"use client"

import ProductForms from "@/components/dashboard/product/productForms"
import withAuthRequired from "@/components/hoc/with-auth-required"

function CreateProductPage() {
  return (
    <main className="flex flex-col justify-between items-center p-1 min-h-screen">
      <ProductForms />
    </main>
  )
}

export default withAuthRequired(CreateProductPage)
