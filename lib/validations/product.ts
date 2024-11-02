import { z } from 'zod'

export const modelFormSchema = z.object({
  type: z.literal('models'),
  userId: z.string(),
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
  modelFiles: z
    .object({
      modelFileGLB: z.string().nullable(),
      modelFileUSD: z.string().nullable(),
      additionalFiles: z.array(z.string()).nullable(),
    })
    .optional(),
  thumbnailImage: z.string().nullable(),
})

export const materialFormSchema = z.object({
  type: z.literal('materials'),
  userId: z.string(),
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
  textureMaps: z
    .object({
      baseColorMap: z.string().nullable(),
      normalMap: z.string().nullable(),
      roughnessMap: z.string().nullable(),
      metallicMap: z.string().nullable(),
      ambientOcclusionMap: z.string().nullable(),
      heightMap: z.string().nullable(),
    })
    .optional(),
  previewImage: z.string().nullable(),
})

export const productFormSchema = modelFormSchema.or(materialFormSchema)
export type ProductFormValues = z.infer<typeof productFormSchema>
