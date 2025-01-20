import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IntroVista',
  description: 'IntroVista',
}

export default function ProjectsPage() {
  return (
    <main className="w-full flex justify-center">
      <h1 className="text-4xl">projects list</h1>
    </main>
  )
}
