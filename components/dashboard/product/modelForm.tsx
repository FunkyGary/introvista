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

export function ModelForm(): React.JSX.Element {
    return (
        <>
            <Grid container spacing={3}>
                <Grid md={6} xs={12}>
                    <FormControl fullWidth required>
                        <InputLabel>名稱</InputLabel>
                        <OutlinedInput label="名稱" name="modelName" />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                    <FormControl fullWidth required>
                        <InputLabel>類別</InputLabel>
                        <Select
                            label="類別"
                            name="modelCategorㄗ"
                            variant="outlined"
                        >
                            {modelCategories.map((option) => (
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
                <Grid md={6} xs={12}>
                    <FormControl fullWidth required>
                        <InputLabel>品牌名稱</InputLabel>
                        <OutlinedInput label="品牌名稱" name="brand" />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                    <FormControl fullWidth required>
                        <InputLabel>描述</InputLabel>
                        <OutlinedInput label="描述" name="description" />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>GLB路徑</InputLabel>
                        <OutlinedInput label="GLB路徑" name="fileGLB" />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                    <FormControl fullWidth required>
                        <InputLabel>USD路徑</InputLabel>
                        <OutlinedInput label="USD路徑" name="fileUSD" />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                    <FormControl fullWidth required>
                        <InputLabel>尺寸</InputLabel>
                        <OutlinedInput label="尺寸" name="dimensions" />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                    <FormControl fullWidth required>
                        <InputLabel>重量</InputLabel>
                        <OutlinedInput label="重量" name="weight" />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>材質</InputLabel>
                        <Select label="材質" name="material" variant="outlined">
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
                <Grid md={6} xs={12}>
                    <FormControl fullWidth required>
                        <InputLabel>庫存數量</InputLabel>
                        <OutlinedInput label="庫存數量" name="stockQuantity" />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                    <FormControl fullWidth required>
                        <InputLabel>價格</InputLabel>
                        <OutlinedInput label="價格" name="price" />
                    </FormControl>
                </Grid>
            </Grid>
        </>
    );
}
