import { Metadata } from 'next'
import ProjectForm from '@/components/project/project-form'
import UploadProjectImageArea from '@/components/project/upload-project-image-area'
import EstimatedDetailsForm from '@/components/project/estimated-details-form'
import ProjectTitleInput from '@/components/project/project-title-input'

export const metadata: Metadata = {
  title: 'IntroVista',
  description: 'IntroVista',
}

export default function CreateProjectPage() {
  return (
    <div className="space-y-5 py-10 px-4">
      <div className="grid grid-cols-3 gap-3 ">
        <div>
          <div className="inline-flex items-center">製圖日期: createdtime</div>
          <div>製作者: username</div>
        </div>
        <ProjectTitleInput initialValue="Untitled Project" projectId="2" />
      </div>
      <div className="flex justify-end mt-2">navigations button</div>

      <div className="flex justify-between items-center gap-4">
        <ProjectForm />
        <UploadProjectImageArea />
      </div>

      <div>
        <EstimatedDetailsForm />
      </div>
    </div>
  )
}
