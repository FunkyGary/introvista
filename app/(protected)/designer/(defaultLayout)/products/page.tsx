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
    <main className="flex flex-col items-center p-1">
      <ProductFilterBar />
      <ProductBreadcrumb />
      <ProductList />
    </main>
  )
}
