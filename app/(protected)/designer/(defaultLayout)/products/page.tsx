import { Metadata } from 'next'
import ProductList from '@/components/product/product-list'
import ProductFilterBar from '@/components/product/product-filter-bar'
import ProductBreadcrumb from '@/components/product/product-breadcrumb'

export const metadata: Metadata = {
  title: 'IntroVista',
  description: 'IntroVista',
}

export default function ProductsPage() {
  return (
    <main className="flex flex-col px-2 pt-2 pb-20 space-y-4">
      <ProductFilterBar />
      <ProductBreadcrumb />
      <ProductList />
    </main>
  )
}
