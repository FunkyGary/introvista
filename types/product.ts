import { z } from 'zod'

export interface Model {
  modelID: string
  tags: string[]
  modelName: string
  categoryID: string
  supplierID: string
  brandID: string
  modelDescription: string
  modelFiles: {
    modelFileGLB: string | null
    modelFileUSD: string | null
    additionalFiles: string[] | null
  }
  thumbnailImage: string | null
  dimensions: {
    length: number
    width: number
    height: number
  }
  weight: number
  price: number
  isPublished: boolean
  createdDate: Date
  lastUpdated: Date
  userId: string
}

export interface Material {
  materialID: string
  tags: string[]
  materialName: string
  categoryID: string
  supplierID: string
  brandID: string
  materialDescription: string
  textureMaps: {
    baseColorMap: string | null
    normalMap: string | null
    roughnessMap: string | null
    metallicMap?: string | null
    ambientOcclusionMap?: string | null
    heightMap?: string | null
  }
  previewImage: string | null
  dimensions?: {
    length?: number
    width?: number
    height?: number
  }
  weight?: number
  materialPrice: number
  isPublished: boolean
  createdDate: Date
  lastUpdated: Date
  userId: string
}


const baseProductSchema = {
  tags: z.array(z.string()).default([]),
  categoryID: z.string().min(1, "Category is required"),
  supplierID: z.string().min(1, "Supplier is required"),
  brandID: z.string().min(1, "Brand is required"),
  isPublished: z.boolean().default(false),
  userId: z.string(),
}

export const modelFormSchema = z.object({
  type: z.literal('models'),
  modelName: z.string().min(1, "Model name is required"),
  modelDescription: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
  dimensions: z.object({
    length: z.number().min(0),
    width: z.number().min(0),
    height: z.number().min(0),
  }),
  weight: z.number().min(0),
  modelFiles: z.object({
    modelFileGLB: z.string().nullable(),
    modelFileUSD: z.string().nullable(),
    additionalFiles: z.array(z.string()).nullable(),
  }).optional(),
  thumbnailImage: z.string().nullable(),
  ...baseProductSchema
})

export const materialFormSchema = z.object({
  type: z.literal('materials'),
  materialName: z.string().min(1, "Material name is required"),
  materialDescription: z.string().min(1, "Description is required"),
  materialPrice: z.number().min(0, "Price must be positive"),
  dimensions: z.object({
    length: z.number().min(0),
    width: z.number().min(0),
    height: z.number().min(0),
  }).optional(),
  weight: z.number().min(0).optional(),
  textureMaps: z.object({
    baseColorMap: z.string().nullable(),
    normalMap: z.string().nullable(),
    roughnessMap: z.string().nullable(),
    metallicMap: z.string().nullable(),
    ambientOcclusionMap: z.string().nullable(),
    heightMap: z.string().nullable(),
  }).optional(),
  previewImage: z.string().nullable(),
  ...baseProductSchema
})

export const productFormSchema = z.discriminatedUnion('type', [
  modelFormSchema,
  materialFormSchema
])

export type ProductFormValues = z.infer<typeof productFormSchema>