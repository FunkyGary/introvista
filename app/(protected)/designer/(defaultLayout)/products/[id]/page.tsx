import { Metadata } from 'next'
import ProductIntro from '@/components/product/product-intro'
import ProductFilterBar from '@/components/product/product-filter-bar'
import ProductBreadcrumb from '@/components/product/product-breadcrumb'

export const metadata: Metadata = {
  title: 'IntroVista',
  description: 'IntroVista',
}

export default function ProductPage() {
  return (
    <main className="flex flex-col px-2 pt-2 pb-20 space-y-4">
      <ProductFilterBar />
      <ProductBreadcrumb />
      <ProductIntro />
    </main>
  )
}
