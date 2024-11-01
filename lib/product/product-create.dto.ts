import { z } from "zod";


const FileType = typeof File !== "undefined" ? File : Object;

export const fileSchema = z.instanceof(FileType).nullable().optional();
export const uploadImageFileSchema = z.array(
    z.object({ file: z.instanceof(FileType) })
);

// Define Zod schemas for ModelForm and MaterialForm
export const modelProductSchema = z.object({
    modelName: z.string().min(1, "Name is required"),
    modelCategory: z.string().min(1, "Category is required"),
    category: z.string().min(1, "Category is required"),
    brand: z.string().min(1, "Brand is required"),
    dimensions: z.string().min(1, "Dimensions are required"),
    weight: z.number().positive("Weight must be positive"),
    material: z.string(),
    stockQuantity: z
        .number()
        .int()
        .nonnegative("Stock quantity must be non-negative"),
    price: z.number().positive("Price must be positive"),
    description: z.string().min(1, "Description is required"),
    modelFileGLB: fileSchema,
    modelFileUSD: fileSchema,
    thumbnailImages: uploadImageFileSchema,
});

export const materialProductSchema = z.object({
    materialName: z.string().min(1, "Name is required"),
    materialPrice: z.number().positive("Price must be positive"),
    category: z.string().min(1, "Category is required"),
    materialDescription: z.string().min(1, "Description is required"),
    thumbnailImages: uploadImageFileSchema,
    baseColorMap: fileSchema,
    normalMap: fileSchema,
    roughnessMap: fileSchema,
    metallicMap: fileSchema,
    ambientOcclusionMap: fileSchema,
    heightMap: fileSchema,
});


export type ModelProductCreateDto = z.infer<typeof modelProductSchema>;
export type MaterialProductCreateDto = z.infer<typeof materialProductSchema>;

// Create a union type for the form data
export type ProductCreateDto = ModelProductCreateDto | MaterialProductCreateDto;
