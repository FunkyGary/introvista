export interface ModelSchema {
  itemID: string
  tags: string[]
  itemName: string
  categoryID: string
  supplierID: string
  brandID: string
  itemDescription: string
  itemFiles: {
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
  type: 'models'
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
  type: 'materials'
}
