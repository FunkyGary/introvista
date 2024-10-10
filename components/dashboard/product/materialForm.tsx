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
import TextField from "@mui/material/TextField";
import { stringValidation, numberValidation } from "./validationRules";

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
                        rules={stringValidation}
                        control={control}
                        render={({ field }) => (
                            <OutlinedInput {...field} label="名稱" />
                        )}
                    />
                </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
                <FormControl fullWidth>
                    <InputLabel>價格</InputLabel>
                    <Controller
                        name="materialPrice"
                        rules={numberValidation}
                        control={control}
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
            <Grid md={12}>
                <FormControl fullWidth>
                    <Controller
                        name="materialDescription"
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
