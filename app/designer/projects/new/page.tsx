import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IntroVista',
  description: 'IntroVista',
}

export default function CreateProjectPage() {
  return (
    <main className="flex flex-col justify-between items-center p-1 min-h-screen">
      <h1 className="text-4xl">new project</h1>
    </main>
  )
}
