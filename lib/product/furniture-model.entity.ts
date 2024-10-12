export interface FurnitureModel {
  ModelID: string;
  ModelName: string;
  CategoryID: string;
  Brand: string;
  ModelDescription: string;
  ModelFileGLB: string | null
  ModelFileUSD: string | null
  ThumbnailImage: string | null
  Dimensions: string;
  Weight: number;
  MaterialIDs: string | null;
  Price: number;
  StockQuantity: number;
  CreatedDate: Date;
  LastUpdated: Date;
  UserID: string;
}