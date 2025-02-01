import { Metadata } from 'next'
import ProductIntro from '@/components/product/product-intro'

export const metadata: Metadata = {
  title: 'IntroVista',
  description: 'IntroVista',
}

export default function ProductPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-1">
      <ProductIntro />
      <h1 className="text-4xl">Product</h1>
    </main>
  )
}
