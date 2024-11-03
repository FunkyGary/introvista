'use client'

import GenFakeData from "@/components/dashboard/product/genFakeData";
import withAuthRequired from "@/components/hoc/with-auth-required";

function CreateProductPage() {
  return (
    <main className="flex flex-col justify-between items-center p-1 min-h-screen">
      {/* <Product /> */}
      <GenFakeData />
    </main>
  )
}

export default withAuthRequired(CreateProductPage)
