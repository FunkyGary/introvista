"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { FileUpload } from "./FileUpload";
import { MaterialFile } from "./materialFile";
import { Card, CardContent, Typography } from "@mui/material";
import { stringValidation, numberValidation } from "./validationRules";

const materials = [
    { value: "wood", label: "木頭" },
    { value: "metal", label: "金屬" },
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
                        rules={stringValidation}
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
                        rules={stringValidation}
                        render={({ field }) => (
                            <OutlinedInput {...field} label="品牌名稱" />
                        )}
                    />
                </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                    <InputLabel>尺寸</InputLabel>
                    <Controller
                        name="dimensions"
                        control={control}
                        rules={stringValidation}
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
                        rules={numberValidation}
                        render={({ field }) => (
                            <OutlinedInput
                                {...field}
                                label="重量"
                                type="number"
                                onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                }
                            />
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
                        rules={numberValidation}
                        render={({ field }) => (
                            <OutlinedInput
                                {...field}
                                label="庫存數量"
                                type="number"
                                onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                }
                            />
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
                        rules={numberValidation}
                        render={({ field }) => (
                            <OutlinedInput
                                {...field}
                                label="價格"
                                type="number"
                                onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                }
                            />
                        )}
                    />
                </FormControl>
            </Grid>
            <Grid xs={12}>
                <FormControl fullWidth>
                    <Controller
                        name="description"
                        control={control}
                        rules={stringValidation}
                        render={({ field }) => (
                            <TextField
                                required
                                label="描述"
                                multiline
                                maxRows={4}
                                minRows={2}
                                {...field}
                            />
                        )}
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
}
