export interface Model {
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
}