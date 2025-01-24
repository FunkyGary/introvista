import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IntroVista',
  description: 'IntroVista',
}

export default function CreateProjectPage() {
  return (
    <main className="">
      <div className="text-4xl">
        {/* editable input*/}
        Untitled Project
      </div>
      <div></div>
    </main>
  )
}
