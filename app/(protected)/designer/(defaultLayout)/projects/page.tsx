import { Metadata } from 'next'
import ProjectsList from '@/components/project/project-list'
import ProjectFilter from '@/components/project/project-filter'

export const metadata: Metadata = {
  title: 'IntroVista',
  description: 'IntroVista',
}

export default function ProjectsPage() {
  return (
    <main className="space-y-10 p-1 mb-20">
      <ProjectFilter />
      <ProjectsList />
    </main>
  )
}
