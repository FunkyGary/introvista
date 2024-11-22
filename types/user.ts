export interface User {
  id: string
  name?: string
  avatar?: string
  email?: string

  [key: string]: unknown
}

interface SupplierInfo {
  companyName: string
  taxID: string
  companyDescription?: string
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

export interface UserData {
  userID: string
  role: string
  tags: string[]
  username: string
  email: string
  passwordHash: string
  profileImageUrl?: string | File
  contactInfo?: {
    phone?: string
    address?: string
    website?: string
  }
  supplierInfo?: SupplierInfo
  designerInfo?: DesignerInfo
  preferences?: {
    language: string
    currency?: string
    notificationSettings?: {
      emailNotifications: boolean
      smsNotifications: boolean
    }
  }
  createdDate: Date
  lastLoginDate?: Date
  lastUpdated: Date
}
