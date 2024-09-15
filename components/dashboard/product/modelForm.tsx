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
import { CloudArrowUp as CloudUploadIcon } from "@phosphor-icons/react/dist/ssr/CloudArrowUp";
import { styled } from "@mui/material/styles";

const materials = [
    { value: "furnitureModel", label: "木頭" },
    { value: "material", label: "金屬" },
] as const;

const modelCategories = [
    { value: "furnitureModel", label: "家具" },
    { value: "material", label: "材質" },
] as const;

export function ModelForm(): React.JSX.Element {
    const { control } = useFormContext(); // Access the form context provided by the parent

    return (
        <Grid container spacing={3}>
            <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                    <InputLabel>名稱</InputLabel>
                    <Controller
                        name="modelName"
                        control={control}
                        render={({ field }) => (
                            <OutlinedInput {...field} label="名稱" />
                        )}
                    />
                </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                    <InputLabel>類別</InputLabel>
                    <Controller
                        name="modelCategory"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} label="類別" variant="outlined">
                                {modelCategories.map((option) => (
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
            <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                    <InputLabel>品牌名稱</InputLabel>
                    <Controller
                        name="brand"
                        control={control}
                        render={({ field }) => (
                            <OutlinedInput {...field} label="品牌名稱" />
                        )}
                    />
                </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                    <InputLabel>描述</InputLabel>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <OutlinedInput {...field} label="描述" />
                        )}
                    />
                </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
                <Typography variant="h6">fileGLB</Typography>
                <ImageUpload name="fileGLB" />
            </Grid>
            <Grid md={6} xs={12}>
                <Typography variant="h6">ModelFileUSD</Typography>
                <ImageUpload name="ModelFileUSD" />
            </Grid>
            <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                    <InputLabel>尺寸</InputLabel>
                    <Controller
                        name="dimensions"
                        control={control}
                        render={({ field }) => (
                            <OutlinedInput {...field} label="尺寸" />
                        )}
                    />
                </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                    <InputLabel>重量</InputLabel>
                    <Controller
                        name="weight"
                        control={control}
                        render={({ field }) => (
                            <OutlinedInput {...field} label="重量" />
                        )}
                    />
                </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
                <FormControl fullWidth>
                    <InputLabel>材質</InputLabel>
                    <Controller
                        name="material"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} label="材質" variant="outlined">
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
            <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                    <InputLabel>庫存數量</InputLabel>
                    <Controller
                        name="stockQuantity"
                        control={control}
                        render={({ field }) => (
                            <OutlinedInput {...field} label="庫存數量" />
                        )}
                    />
                </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                    <InputLabel>價格</InputLabel>
                    <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                            <OutlinedInput {...field} label="價格" />
                        )}
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
}
