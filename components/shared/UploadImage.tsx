import * as React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Upload } from 'antd'
import type { UploadFile, UploadProps } from 'antd'
import { message } from 'antd'

interface ImageUploadProps {
  name: string
  rules?: Record<string, any>
  maxCount?: number
  readOnly?: boolean
}

export default function UploadImage({
  name,
  rules,
  maxCount = 1,
  readOnly = false,
}: ImageUploadProps) {
  const { control, setValue, register } = useFormContext()
  const [fileList, setFileList] = React.useState<UploadFile[]>([])

  register(name, rules)
  const formValues = useFormContext().getValues(name)

  React.useEffect(() => {
    if (formValues && formValues.url) {
      setFileList([
        {
          uid: '-1',
          name: formValues.name,
          status: 'done',
          url: formValues.url,
        },
      ])
    }
  }, [formValues])

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)

    const files = newFileList.map((file) => ({
      file: file.originFileObj,
    }))
    setValue(name, files)
  }

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      message.error('You can only upload image files!')
      return false
    }

    const isLt5M = file.size / 1024 / 1024 < 5
    if (!isLt5M) {
      message.error('Image must be smaller than 5MB!')
      return false
    }

    return false
  }

  const uploadButton = (
    <div>
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
          beforeUpload={beforeUpload}
          maxCount={maxCount}
          accept="image/*"
          disabled={readOnly}
          // Customize the preview modal
          onPreview={async (file) => {
            if (!file.url && !file.preview) {
              file.preview = await new Promise((resolve) => {
                const reader = new FileReader()
                reader.readAsDataURL(file.originFileObj as File)
                reader.onload = () => resolve(reader.result as string)
              })
            }

            const image = new Image()
            image.src = file.url || file.preview || ''
            const imgWindow = window.open(file.url || file.preview)
            imgWindow?.document.write(image.outerHTML)
          }}
        >
          {fileList.length >= maxCount ? null : uploadButton}
        </Upload>
      )}
    />
  )
}
