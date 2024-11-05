interface BaseProduct {
  isPublished: boolean
  createdDate: Date
  lastUpdated: Date
  supplierID: string
}

export interface ModelProduct extends BaseProduct {
  type: 'model'
  itemID: string
  itemName: string
  price: number
  modelDescription: string
  thumbnailImage: string | null
  modelFiles: {
    modelFileGLB: string | null
    modelFileUSD: string | null
  }
}

export interface MaterialProduct extends BaseProduct {
  type: 'material'
  materialID: string
  materialName: string
  materialPrice: number
  materialDescription: string
  previewImage: string | null
  textureMaps: {
    baseColorMap: string | null
    normalMap: string | null
    roughnessMap: string | null
  }
}

export type Product = ModelProduct | MaterialProduct

export type ProductType = 'models' | 'materials'

export interface ModelData {
  type: 'models'
  itemName: string
  itemDescription: string
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
  thumbnailImage?: File | null
  itemFiles?: {
    modelFileGLB?: File | null
    modelFileUSD?: File | null
    additionalFiles?: File | null
  }
}

export interface MaterialData {
  type: 'materials'
  materialName: string
  materialDescription: string
  materialPrice: number
  categoryID: string
  userId: string
  isPublished: boolean
  dimensions?: {
    length: number
    width: number
    height: number
  }
  weight?: number
  previewImage?: File | null
  textureMaps?: {
    baseColorMap?: File | null
    normalMap?: File | null
    roughnessMap?: File | null
    metallicMap?: File | null
    ambientOcclusionMap?: File | null
    heightMap?: File | null
  }
}

export type ProductData = ModelData | MaterialData
