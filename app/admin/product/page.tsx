'use client'

import Product from "@/components/dashboard/product/productForm";
import withAuthRequired from "@/components/hoc/with-auth-required";

function CreateProductPage() {
  return (
    <main className="flex flex-col justify-between items-center p-1 min-h-screen">
      <Product />
    </main>
  )
}

export default withAuthRequired(CreateProductPage)
