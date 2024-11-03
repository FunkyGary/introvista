'use client'

import React from 'react'
import { Grid, Typography } from '@mui/material'
import { FileUpload } from '@/components/shared/FileUpload'
import { useFormContext, Controller } from 'react-hook-form'
import { FormHelperText } from '@mui/material'
import { FileValidation } from '@/utils/validationRules'

export default function MaterialFile(): React.JSX.Element {
  const {
    formState: { errors },
    control,
  } = useFormContext()

  const fileFields = [
    {
      name: 'textureMaps.baseColorMap',
      label: 'BaseColorMap*',
      required: true,
    },
    { name: 'textureMaps.normalMap', label: 'Normal Map*', required: true },
    {
      name: 'textureMaps.roughnessMap',
      label: 'Roughness Map*',
      required: true,
    },
    {
      name: 'textureMaps.metallicMap',
      label: 'MetallicMap',
      required: false,
    },
    {
      name: 'textureMaps.ambientOcclusionMap',
      label: 'AmbientOcclusionMap',
      required: false,
    },
    { name: 'textureMaps.heightMap', label: 'HeightMap', required: false },
  ]

  return (
    <Grid container spacing={3}>
      {fileFields.map((field) => (
        <Grid
          key={field.name}
          md={3}
          xs={12}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ paddingBottom: '10px' }}>
            {field.label}
          </Typography>
          <Controller
            name={field.name}
            control={control}
            defaultValue={null}
            rules={field.required ? FileValidation : undefined}
            render={({ field: { onChange, value } }) => (
              <FileUpload
                name={field.name}
                label="Upload"
                accept="*"
                onChange={onChange}
                rules={field.required ? FileValidation : undefined}
              />
            )}
          />
          {errors[field.name] && (
            <FormHelperText error>
              {errors[field.name]?.message as string}
            </FormHelperText>
          )}
        </Grid>
      ))}
    </Grid>
  )
}
