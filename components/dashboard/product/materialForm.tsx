"use client";

import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";

const materials = [
    { value: "furnitureModel", label: "木頭" },
    { value: "material", label: "金屬" },
] as const;

const modelCategories = [
    { value: "furnitureModel", label: "家具" },
    { value: "material", label: "材質" },
] as const;

export function MaterialForm(): React.JSX.Element {
    return (
        <>
            <Grid container spacing={3}>
                <Grid md={6} xs={12}>
                    <FormControl fullWidth required>
                        <InputLabel>名稱</InputLabel>
                        <OutlinedInput label="名稱" name="materialName" />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                    <FormControl fullWidth required>
                        <InputLabel>BaseColor路徑</InputLabel>
                        <OutlinedInput
                            label="BaseColor路徑"
                            name="baseColorMap"
                        />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>NormalMap路徑</InputLabel>
                        <OutlinedInput label="NormalMap路徑" name="normalMap" />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Roughness路徑</InputLabel>
                        <OutlinedInput
                            label="Roughness路徑"
                            name="roughnessMap"
                        />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Metallic路徑</InputLabel>
                        <OutlinedInput
                            label="Metallic路徑"
                            name="MetallicMap"
                        />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>AmbientOcclusion路徑</InputLabel>
                        <OutlinedInput
                            label="AmbientOcclusion路徑"
                            name="AmbientOcclusionMap"
                        />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>HeightMap路徑</InputLabel>
                        <OutlinedInput label="HeightMap路徑" name="HeightMap" />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>價格</InputLabel>
                        <OutlinedInput label="價格" name="MaterialPrice" />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>描述</InputLabel>
                        <OutlinedInput
                            label="描述"
                            name="MaterialDescription"
                        />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>類別</InputLabel>
                        <Select label="類別" name="Category" variant="outlined">
                            {materials.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    );
}
