"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import ImageUpload from "./imageUpload";

export function MaterialImage(): React.JSX.Element {
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
                    NormalMap
                </Typography>
                <ImageUpload name="NormalMap" />
            </Grid>
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
                    RoughnessMap
                </Typography>
                <ImageUpload name="RoughnessMap" />
            </Grid>
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
                    AmbientOcclusionMap
                </Typography>
                <ImageUpload name="AmbientOcclusionMap" />
            </Grid>
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
                    MetallicMap
                </Typography>
                <ImageUpload name="MetallicMap" />
            </Grid>
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
                    HeightMap
                </Typography>
                <ImageUpload name="HeightMap" />
            </Grid>
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
                    BaseColorMap
                </Typography>
                <ImageUpload name="baseColorMap" />
            </Grid>
        </Grid>
    );
}
