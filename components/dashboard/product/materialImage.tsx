"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import ImageUpload from "../../shared/imageUpload";
import { useFormContext } from "react-hook-form";
import { imageValidation } from "@/utils/validationRules";
import { FormHelperText } from "@mui/material";

export default function MaterialImage(): React.JSX.Element {
    const {
        formState: { errors },
    } = useFormContext();

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
                    預覽圖*
                </Typography>
                <ImageUpload name="previewImage" rules={imageValidation} />
                {errors.previewImage && (
                    <FormHelperText error>
                        {errors.previewImage.message as string}
                    </FormHelperText>
                )}
            </Grid>
        </Grid>
    );
}
