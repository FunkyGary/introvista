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


export interface Product {
  productID: string
  type: 'model' | 'material'
  tags: string[]
  name: string
  categoryID: string
  supplierID: string
  brandID: string
  description: string
  files?: {
    modelFileGLB?: string | null
    modelFileUSD?: string | null
    additionalFiles?: string[] | null
  }
  textureMaps?: {
    baseColorMap?: string | null
    normalMap?: string | null
    roughnessMap?: string | null
    metallicMap?: string | null
    ambientOcclusionMap?: string | null
    heightMap?: string | null
  }
  thumbnailImage?: string | null
  previewImage?: string | null
  dimensions?: {
    length?: number
    width?: number
    height?: number
  }
  weight?: number
  price: number
  isPublished: boolean
  createdDate: Date
  lastUpdated: Date
  userId: string
}

