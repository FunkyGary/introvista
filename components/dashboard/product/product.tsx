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
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";
import { ModelImage } from "./modelImage";
import { MaterialImage } from "./materialImage";
import { MaterialFile } from "./materialFile";
import { ModalFile } from "./modalFile";

const categories = [
    { value: "furnitureModel", label: "家具" },
    { value: "material", label: "材質" },
] as const;

const fileSchema = z.instanceof(File).nullable().optional();

// Define Zod schemas for ModelForm and MaterialForm
const modelSchema = z.object({
    modelName: z.string().min(1, "Name is required"),
    modelCategory: z.string().min(1, "Category is required"),
    brand: z.string().min(1, "Brand is required"),
    dimensions: z.string().min(1, "Dimensions are required"),
    weight: z.number().positive("Weight must be positive"),
    material: z.string().optional(),
    stockQuantity: z
        .number()
        .int()
        .nonnegative("Stock quantity must be non-negative"),
    price: z.number().positive("Price must be positive"),
    description: z.string().min(1, "Description is required"),
    modelFile: fileSchema,
    thumbnailImage: fileSchema,
});

const materialSchema = z.object({
    materialName: z.string().min(1, "Name is required"),
    materialPrice: z.number().positive("Price must be positive"),
    category: z.string().min(1, "Category is required"),
    materialDescription: z.string().min(1, "Description is required"),
    BaseColorMap: fileSchema,
    NormalMap: fileSchema,
    RoughnessMap: fileSchema,
    MetallicMap: fileSchema,
    AmbientOcclusionMap: fileSchema,
    HeightMap: fileSchema,
});

// Create a union type for the form data
type FormData = z.infer<typeof modelSchema> | z.infer<typeof materialSchema>;

export function Product(): React.JSX.Element {
    const [category, setCategory] = React.useState("furnitureModel");
    const methods = useForm<FormData>({
        resolver: zodResolver(
            category === "furnitureModel" ? modelSchema : materialSchema
        ),
        mode: "onBlur",
    });

    const onSubmit = (data: FormData) => {
        console.log("Form submitted with data:", data);
        // Here you can add your logic to handle the form submission
    };

    React.useEffect(() => {
        methods.reset(); // Reset form when category changes
    }, [category, methods]);

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
                        <Card>
                            <CardHeader title="檔案" />
                            <Divider />
                            <CardContent>
                                {category === "furnitureModel" ? (
                                    <ModalFile />
                                ) : (
                                    <MaterialFile />
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
