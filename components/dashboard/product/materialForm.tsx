"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";
import ImageUpload from "./imageUpload";
import Typography from "@mui/material/Typography";

const materials = [
    { value: "wood", label: "木頭" },
    { value: "metal", label: "金屬" },
] as const;

export function MaterialForm(): React.JSX.Element {
    const { control } = useFormContext(); // Access form context provided by the parent

    return (
        <Grid container spacing={3}>
            <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                    <InputLabel>名稱</InputLabel>
                    <Controller
                        name="materialName"
                        control={control}
                        render={({ field }) => (
                            <OutlinedInput {...field} label="名稱" />
                        )}
                    />
                </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                    <InputLabel>BaseColor路徑</InputLabel>
                    <Controller
                        name="baseColorMap"
                        control={control}
                        render={({ field }) => (
                            <OutlinedInput {...field} label="BaseColor路徑" />
                        )}
                    />
                </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
                <FormControl fullWidth>
                    <Typography variant="body2">normalMap</Typography>
                    <ImageUpload name="normalMap" />
                </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
                <FormControl fullWidth>
                    <Typography variant="body2">roughnessMap</Typography>
                    <ImageUpload name="roughnessMap" />
                </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
                <FormControl fullWidth>
                    <FormControl fullWidth>
                        <Typography variant="body2">metallicMap</Typography>
                        <ImageUpload name="metallicMap" />
                    </FormControl>
                </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
                <FormControl fullWidth>
                    <Typography variant="body2">ambientOcclusionMap</Typography>
                    <ImageUpload name="ambientOcclusionMap" />
                </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
                <FormControl fullWidth>
                    <Typography variant="body2">heightMap</Typography>
                    <ImageUpload name="heightMap" />
                </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
                <FormControl fullWidth>
                    <InputLabel>價格</InputLabel>
                    <Controller
                        name="materialPrice"
                        control={control}
                        render={({ field }) => (
                            <OutlinedInput {...field} label="價格" />
                        )}
                    />
                </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
                <FormControl fullWidth>
                    <InputLabel>描述</InputLabel>
                    <Controller
                        name="materialDescription"
                        control={control}
                        render={({ field }) => (
                            <OutlinedInput {...field} label="描述" />
                        )}
                    />
                </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
                <FormControl fullWidth>
                    <InputLabel>類別</InputLabel>
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} label="類別" variant="outlined">
                                {materials.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
}
