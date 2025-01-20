import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IntroVista',
  description: 'IntroVista',
}

export default function EditProjectPage() {
  return (
    <main className="flex flex-col justify-between items-center p-1 min-h-screen">
      <h1 className="text-4xl">edit project</h1>
    </main>
  )
}
