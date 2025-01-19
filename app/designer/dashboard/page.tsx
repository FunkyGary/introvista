import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IntroVista',
  description: 'IntroVista',
}

export default function DesignerDashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-1">
      <h1 className="text-4xl">dashboard</h1>
    </main>
  )
}
