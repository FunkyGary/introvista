'use client'

import Product from "@/components/dashboard/product/product";
import ProductForms from "@/components/dashboard/product/productForms";
import withAuthRequired from "@/components/hoc/with-auth-required";

function CreateProductPage() {

  return (
    <main className="flex flex-col justify-between items-center p-1 min-h-screen">
      {/* <Product /> */}
      <ProductForms />
    </main>
  )
}

export default withAuthRequired(CreateProductPage)
