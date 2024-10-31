interface CategoryChild {
  categoryID: string
  categoryDetail: string
}

export interface Category {
  categoryID: string
  tags: string[]
  categoryCode: string
  categoryTitle: string
  categorySubTitle: string
  children: CategoryChild[]
  categoryType: string
  createdDate: Date
  lastUpdated: Date
}
