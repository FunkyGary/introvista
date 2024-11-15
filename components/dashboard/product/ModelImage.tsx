"use client"

import * as React from "react"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Unstable_Grid2"
import ImageUpload from "@/components/shared/ImageUpload"
import { useFormContext } from "react-hook-form"
import { imageValidation } from "@/utils/validationRules"
import { FormHelperText } from "@mui/material"
import UploadImage from "@/components/shared/UploadImage"

export function ModelImage({
  readOnly = false,
}: {
  readOnly?: boolean
}): React.JSX.Element {
  const {
    formState: { errors },
  } = useFormContext()

  return (
    <Grid container spacing={3}>
      <Grid
        md={3}
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ paddingBottom: "10px" }}>
          縮圖*
        </Typography>
        {/* <ImageUpload name="thumbnailImage" rules={imageValidation} /> */}
        <UploadImage name="thumbnailImage" rules={imageValidation} />
        {errors.thumbnailImage && (
          <FormHelperText error>
            {errors.thumbnailImage.message as string}
          </FormHelperText>
        )}
      </Grid>
    </Grid>
  )
}
