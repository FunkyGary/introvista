import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'IntroVista',
  description: 'IntroVista',
}

export default function Home() {
  redirect('/admin/products')
}
