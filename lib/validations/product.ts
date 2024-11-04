import { z } from 'zod'

export const fileSchema = z.instanceof(File).nullable().optional()
export const uploadImageFileSchema = z.array(
  z.object({ file: z.instanceof(File) })
)

// Define Zod schemas for ModelForm and MaterialForm
export const modelFormSchema = z.object({
  type: z.literal('models'),
  userId: z.string(),
  categoryID: z.string().min(1, 'Category ID is required'),
  isPublished: z.boolean().default(false),
  modelName: z.string().min(1, 'Model name is required'),
  modelDescription: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be positive'),
  dimensions: z.object({
    length: z.number().min(0),
    width: z.number().min(0),
    height: z.number().min(0),
  }),
  weight: z.number().min(0),
  modelFileGLB: fileSchema.optional(),
  modelFileUSD: fileSchema.optional(),
  thumbnailImage: uploadImageFileSchema.optional(),
})

export const materialFormSchema = z.object({
  type: z.literal('materials'),
  userId: z.string(),
  categoryID: z.string().min(1, 'Category ID is required'),
  isPublished: z.boolean().default(false),
  materialName: z.string().min(1, 'Material name is required'),
  materialDescription: z.string().min(1, 'Description is required'),
  materialPrice: z.number().min(0, 'Price must be positive'),
  dimensions: z
    .object({
      length: z.number().min(0),
      width: z.number().min(0),
      height: z.number().min(0),
    })
    .optional(),
  weight: z.number().min(0).optional(),
  baseColorMap: fileSchema.optional(),
  normalMap: fileSchema.optional(),
  roughnessMap: fileSchema.optional(),
  metallicMap: fileSchema.optional(),
  ambientOcclusionMap: fileSchema.optional(),
  heightMap: fileSchema.optional(),
  previewImage: uploadImageFileSchema.optional()
})

type ModelFormValues = z.infer<typeof modelFormSchema>
type MaterialFormValues = z.infer<typeof materialFormSchema>

export type ProductFormValues = ModelFormValues | MaterialFormValues
