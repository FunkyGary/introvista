export interface Brand {
  brandID: string
  tags: string[]
  brandName: string
  brandDescription: string
  logoImage: string
  createdDate: Date
  lastUpdated: Date
}

export interface Supplier {
  supplierID: string
  tags: string[]
  supplierName: string
  itemIDs: string[]
  materialIDs: string[]
  contactInformation: string
  supplierDescription: string
  createdDate: Date
  lastUpdated: Date
}
