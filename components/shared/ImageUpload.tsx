import * as React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import ImageUploading from 'react-images-uploading'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr/Image'
import Image from 'next/image'

interface ImageUploadProps {
  name: string
  rules?: Record<string, any>
}

export default function ImageUpload({ name, rules }: ImageUploadProps) {
  const { control, setValue, register, watch } = useFormContext()

  // Register the field with validation rules
  register(name, rules)

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <ImageUploading
          multiple={false}
          value={field.value ? [{ data_url: field.value }] : []}
          onChange={(imageList) => {
            setValue(name, imageList[0]?.data_url || null)
          }}
          maxNumber={1}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <Box>
              {imageList.length > 0 && imageList[0].data_url ? (
                <Box
                  sx={{
                    border: '1px solid #D9D9D9',
                    width: '200px',
                    height: '200px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '20px',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={imageList[0].data_url}
                    alt="Product thumbnail"
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    background: '#D9D9D9',
                    width: '200px',
                    height: '200px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '20px',
                    cursor: 'pointer',
                  }}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <ImageIcon size={150} color="white" />
                </Box>
              )}
              <Box
                sx={{
                  width: '100%',
                  textAlign: 'center',
                  paddingTop: '10px',
                }}
              >
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() =>
                    imageList.length ? onImageUpdate(0) : onImageUpload()
                  }
                  sx={{ marginRight: '10px' }}
                >
                  上傳
                </Button>
                {imageList.length > 0 && (
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => onImageRemove(0)}
                  >
                    刪除
                  </Button>
                )}
              </Box>
            </Box>
          )}
        </ImageUploading>
      )}
    />
  )
}
