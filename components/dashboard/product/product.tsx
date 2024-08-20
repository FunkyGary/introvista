"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { ModelForm } from "./modelForm";
import { MaterialForm } from "./materialForm";

import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";

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
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
            }}
        >
            <Card>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>新增品類</InputLabel>
                                <Select
                                    label="新增品類"
                                    name="category"
                                    variant="outlined"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
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
                    </Grid>
                </CardContent>
                <Divider />
                <CardContent>
                    {category === "furnitureModel" ? (
                        <ModelForm />
                    ) : (
                        <MaterialForm />
                    )}
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button variant="contained">新增</Button>
                </CardActions>
            </Card>
        </form>
    );
}
