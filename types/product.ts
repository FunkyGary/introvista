export interface ModelProduct {
  type: 'model'
  itemID: string
  itemName: string
  price: number
  isPublished: boolean
  createdDate: Date
}

export interface MaterialProduct {
  type: 'material'
  materialID: string
  materialName: string
  materialPrice: number
  isPublished: boolean
  createdDate: Date
}

export type Product = ModelProduct | MaterialProduct

export type ProductType = 'models' | 'materials'

type FileData = { name: string; url: string }

export interface ModelData {
  type: 'models'
  itemName: string
  itemDescription: string
  brand: string
  price: number
  categoryID: string
  userId: string
  isPublished: boolean
  dimensions: {
    length: number
    width: number
    height: number
  }
  weight: number
  thumbnailImage?: [] | null | string | FileData
  itemFiles?: {
    modelFileGLB?: File | null | string | FileData
    modelFileUSD?: File | null | string | FileData
    additionalFiles?: File | null | string | FileData
  }
}

export interface MaterialData {
  type: 'materials'
  materialName: string
  materialDescription: string
  materialPrice: number
  brand: string
  categoryID: string
  userId: string
  isPublished: boolean
  dimensions?: {
    length: number
    width: number
    height: number
  }
  weight?: number
  previewImage?: [] | null | string | FileData
  textureMaps?: {
    baseColorMap?: File | null | string | FileData
    normalMap?: File | null | string | FileData
    roughnessMap?: File | null | string | FileData
    metallicMap?: File | null | string | FileData
    ambientOcclusionMap?: File | null | string | FileData
    heightMap?: File | null | string | FileData
  }
}

export type ProductData = ModelData | MaterialData
