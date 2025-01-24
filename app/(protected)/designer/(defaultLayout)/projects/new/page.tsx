import { Metadata } from 'next'
import ProjectForm from '@/components/project/project-form'

export const metadata: Metadata = {
  title: 'IntroVista',
  description: 'IntroVista',
}

export default function CreateProjectPage() {
  return <ProjectForm />
}
