"use client"

import React from "react"
import { Grid, Typography } from "@mui/material"
import { FileUpload } from "@/components/shared/FileUpload"
import { useFormContext, Controller } from "react-hook-form"

export function ModelFile({ readOnly = false }: { readOnly?: boolean }) {
  const { control } = useFormContext()

  const fileTypes = [
    { name: "itemFiles.modelFileGLB", label: "Model File GLB" },
    { name: "itemFiles.modelFileUSD", label: "Model File USD" },
  ]

  return (
    <Grid container spacing={2}>
      {fileTypes.map((fileType) => (
        <Grid
          key={fileType.name}
          md={3}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ paddingBottom: "10px" }}>
            {fileType.label}
          </Typography>
          <Controller
            name={fileType.name}
            control={control}
            render={({ field }) => (
              <FileUpload
                name={fileType.name}
                label="Upload"
                accept="*"
                onChange={(file) => field.onChange(file)}
              />
            )}
          />
        </Grid>
      ))}
    </Grid>
  )
}
