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
}

export interface ModelDto {
  modelID: string;
  modelName: string;
  categoryID: string;
  brand: string;
  modelDescription: string;
  modelFileGLB: string | null;
  modelFileUSD: string | null;
  thumbnailImage: string | null;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  weight: number;
  materialIDs: string[];
  price: number;
  stockQuantity: number;
  createdDate: Date;
  lastUpdated: Date;
  publishedAt: Date | null;
  userID: string;
}
export interface FurnitureModel {
    ModelID: string;
    ModelName: string;
    CategoryID: string;
    Brand: string;
    ModelDescription: string;
    ModelFileGLB: string | null;
    ModelFileUSD: string | null;
    ThumbnailImage: string | null;
    Dimensions: string;
    Weight: number;
    MaterialIDs: string | null;
    Price: number;
    StockQuantity: number;
    CreatedDate: Date;
    LastUpdated: Date;
    PublishedAt: Date | null;
    UserID: string;
}

