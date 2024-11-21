import { z } from "zod"

const getFileDataSchema = z.object({
  name: z.string(),
  url: z.string(),
})

// Define a custom file schema that only uses `File` in the browser
export const fileSchema =
  typeof window !== "undefined"
    ? z.instanceof(File).nullable().or(getFileDataSchema)
    : z.any().nullable()

export const uploadImageFileSchema = z
  .array(z.object({ file: fileSchema }))
  .or(getFileDataSchema)

// Define Zod schemas for ModelForm and MaterialForm
export const modelFormSchema = z.object({
  type: z.literal("models").optional(),
  userId: z.string(),
  categoryID: z.string().min(1, "Category ID is required"),
  isPublished: z.boolean().default(false),
  itemName: z.string().min(1, "Model name is required"),
  itemDescription: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
  dimensions: z.object({
    length: z.number().min(0),
    width: z.number().min(0),
    height: z.number().min(0),
  }),
  weight: z.number().min(0),
  itemFiles: z
    .object({
      modelFileGLB: fileSchema,
      modelFileUSD: fileSchema,
    })
    .optional(),
  thumbnailImage: uploadImageFileSchema,
})

export const materialFormSchema = z.object({
  type: z.literal("materials").optional(),
  userId: z.string(),
  categoryID: z.string().min(1, "Category ID is required"),
  isPublished: z.boolean().default(false),
  materialName: z.string().min(1, "Material name is required"),
  materialDescription: z.string().min(1, "Description is required"),
  materialPrice: z.number().min(0, "Price must be positive"),
  dimensions: z
    .object({
      length: z.number().min(0),
      width: z.number().min(0),
      height: z.number().min(0),
    })
    .optional(),
  weight: z.number().min(0).optional(),
  textureMaps: z
    .object({
      baseColorMap: fileSchema,
      normalMap: fileSchema,
      roughnessMap: fileSchema,
      metallicMap: fileSchema,
      ambientOcclusionMap: fileSchema,
      heightMap: fileSchema,
    })
    .optional(),
  previewImage: uploadImageFileSchema,
})

export type ModelFormValues = z.infer<typeof modelFormSchema>
export type MaterialFormValues = z.infer<typeof materialFormSchema>

export type ProductFormValues = ModelFormValues | MaterialFormValues

export const modelInitialData = {
  categoryID: "",
  isPublished: false,
  itemName: "",
  itemDescription: "",
  price: 0,
  dimensions: {
    length: 0,
    width: 0,
    height: 0,
  },
  weight: 0,
  itemFiles: {
    modelFileGLB: null,
    modelFileUSD: null,
  },
  thumbnailImage: undefined,
}

export const materialInitialData = {
  categoryID: "",
  isPublished: false,
  materialName: "",
  materialDescription: "",
  materialPrice: 0,
  dimensions: {
    length: 0,
    width: 0,
    height: 0,
  },
  weight: 0,
  textureMaps: {
    baseColorMap: null,
    normalMap: null,
    roughnessMap: null,
    metallicMap: null,
    ambientOcclusionMap: null,
    heightMap: null,
  },
  previewImage: undefined,
}
