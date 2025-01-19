import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IntroVista',
  description: 'IntroVista',
}

export default function ProjectPage() {
  return (
    <main className="flex flex-col justify-between items-center p-1 min-h-screen">
      <h1 className="text-4xl">project details</h1>
    </main>
  )
}
