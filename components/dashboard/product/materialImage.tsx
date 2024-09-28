"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import ImageUpload from "./imageUpload";

export function MaterialImage(): React.JSX.Element {
    return (
        <Grid container spacing={3}>
            <Grid
                md={6}
                xs={12}
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" sx={{ paddingRight: "10px" }}>
                    NormalMap
                </Typography>
                <ImageUpload name="NormalMap" />
            </Grid>
            <Grid
                md={6}
                xs={12}
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" sx={{ paddingRight: "10px" }}>
                    RoughnessMap
                </Typography>
                <ImageUpload name="RoughnessMap" />
            </Grid>
            <Grid
                md={6}
                xs={12}
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" sx={{ paddingRight: "10px" }}>
                    AmbientOcclusionMap
                </Typography>
                <ImageUpload name="AmbientOcclusionMap" />
            </Grid>
            <Grid
                md={6}
                xs={12}
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" sx={{ paddingRight: "10px" }}>
                    MetallicMap
                </Typography>
                <ImageUpload name="MetallicMap" />
            </Grid>
            <Grid
                md={6}
                xs={12}
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" sx={{ paddingRight: "10px" }}>
                    HeightMap
                </Typography>
                <ImageUpload name="HeightMap" />
            </Grid>
            <Grid
                md={6}
                xs={12}
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" sx={{ paddingRight: "10px" }}>
                    baseColorMap
                </Typography>
                <ImageUpload name="baseColorMap" />
            </Grid>
        </Grid>
    );
}
