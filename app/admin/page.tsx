import { ProductList } from '@/components/dashboard/products/productList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IntroVista',
  description: 'IntroVista',
}

function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-1">
      <ProductList />
    </main>
  )
}

export default Page
