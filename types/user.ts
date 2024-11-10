export interface User {
  id: string
  name?: string
  avatar?: string
  email?: string

  [key: string]: unknown
}

interface SupplierInfo {
  supplierID: string
  companyName: string
  taxID: string
  companyDescription?: string
  materialsProvided: string[]
  brands: string[]
  productCatalog: [
    {
      productID: string
      name: string
      categoryID: string
      thumbnailUrl: string
      description: string
      specifications: {
        dimensions: string
        weight: number
        material: string
      }
      price: number
      availableStock: number
      lastUpdated: Date
    },
  ]
  createdDate: Date
  lastUpdated: Date
}

interface DesignerInfo {
  portfolioUrl: string
  favoriteCategories: string[]
  catalogAccessHistory: [
    {
      productID: string
      viewedDate: Date
    },
  ]
  savedItems: string[]
  createdDate: Date
  lastUpdated: Date
}

interface UserData {
  userID: string
  role: string
  tags: string[]
  username: string
  email: string
  passwordHash: string
  profileImageUrl?: string
  contactInfo: {
    phone: string
    address?: string
    website?: string
  }
  supplierInfo?: SupplierInfo
  designerInfo?: DesignerInfo
  preferences: {
    language: string
    currency: string
    notificationSettings: {
      emailNotifications: boolean
      smsNotifications: boolean
    }
  }
  createdDate: Date
  lastLoginDate: Date
  lastUpdated: Date
}
