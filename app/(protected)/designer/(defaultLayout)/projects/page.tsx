import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IntroVista',
  description: 'IntroVista',
}

export default function ProjectsPage() {
  return (
    <main className="flex flex-col justify-between items-center p-1 min-h-screen">
      <h1 className="text-4xl">projects list</h1>
    </main>
  )
}
