"use client";

import React from "react";
import { Grid, Typography } from "@mui/material";
import { FileUpload } from "../../shared/fileUpload";
import { useFormContext, Controller } from "react-hook-form";

export function ModelFile() {
    const { control } = useFormContext();

    const fileTypes = [
        { name: "modelFileGLB", label: "ModelFileGLB" },
        { name: "modelFileUSD", label: "ModelFileUSD" },
    ];

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
                                label={`Upload ${fileType.label}`}
                                accept="*"
                                onChange={(file) => field.onChange(file)}
                            />
                        )}
                    />
                </Grid>
            ))}
        </Grid>
    );
}
