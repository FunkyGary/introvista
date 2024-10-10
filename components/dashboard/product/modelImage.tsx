"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Unstable_Grid2";
import ImageUpload from "./imageUpload";

export function ModelImage(): React.JSX.Element {
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
                    ThumbnailImage
                </Typography>
                <ImageUpload name="ModalThumbnailImage" />
            </Grid>
        </Grid>
    );
}
