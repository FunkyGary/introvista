"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { ModelForm } from "./modelForm";
import { MaterialForm } from "./materialForm";
import { useForm, FormProvider } from "react-hook-form";
import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";
import ImageUpload from "./imageUpload";
import { ModelImage } from "./modelImage";
import { MaterialImage } from "./materialImage";

const categories = [
    { value: "furnitureModel", label: "家具" },
    { value: "material", label: "材質" },
] as const;

const materials = [
    { value: "furnitureModel", label: "木頭" },
    { value: "material", label: "金屬" },
] as const;

const modelCategories = [
    { value: "furnitureModel", label: "家具" },
    { value: "material", label: "材質" },
] as const;

export function Product(): React.JSX.Element {
    const [category, setCategory] = React.useState("furnitureModel");
    const methods = useForm(); // Initialize react-hook-form

    const onSubmit = (data: any) => {
        console.log(data);
    };
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Grid container spacing={4}>
                    <Grid md={4} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>新增品類</InputLabel>
                            <Select
                                label="新增品類"
                                name="category"
                                variant="outlined"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map((option) => (
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
                    <Grid sx={{ width: "100%" }}>
                        <Card>
                            <CardHeader title="屬性" />
                            <Divider />
                            <CardContent>
                                {category === "furnitureModel" ? (
                                    <ModelForm />
                                ) : (
                                    <MaterialForm />
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid sx={{ width: "100%" }}>
                        <Card>
                            <CardHeader title="圖片" />
                            <Divider />
                            <CardContent>
                                {category === "furnitureModel" ? (
                                    <ModelImage />
                                ) : (
                                    <MaterialImage />
                                )}
                            </CardContent>
                            <Divider />
                        </Card>
                    </Grid>
                    <Grid sx={{ width: "100%" }}>
                        <CardActions sx={{ justifyContent: "flex-end" }}>
                            <Button variant="contained" type="submit">
                                新增
                            </Button>
                        </CardActions>
                    </Grid>
                </Grid>
            </form>
        </FormProvider>
    );
}
