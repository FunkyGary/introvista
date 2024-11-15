"use client"

import { ProductList } from "@/components/dashboard/products/productList"
import withAuthRequired from "@/components/hoc/with-auth-required"

function Home() {
  return (
    <main className="flex flex-col justify-between items-center p-1 min-h-screen">
      <ProductList />
    </main>
  )
}

export default withAuthRequired(Home)
