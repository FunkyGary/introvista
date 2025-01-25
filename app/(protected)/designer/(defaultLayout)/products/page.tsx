import { Metadata } from 'next'
import ProductFilterBar from '@/components/product/product-filter-bar'
import ProductList from '@/components/product/product-list'
import ProductBreadcrumb from '@/components/product/product-breadcrumb'

export const metadata: Metadata = {
  title: 'IntroVista',
  description: 'IntroVista',
}

export default function ProductsPage() {
  return (
    <main className="flex flex-col space-y-4 px-2 pt-2 pb-20">
      <ProductFilterBar />
      <ProductBreadcrumb />
      <ProductList />
    </main>
  )
}
