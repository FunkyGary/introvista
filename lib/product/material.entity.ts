export interface Material {
  MaterialID: string
  MaterialName: string
  BaseColorMap: string | null
  NormalMap: string | null
  RoughnessMap: string | null
  MetallicMap: string | null
  AmbientOcclusionMap: string | null
  ThumbnailImage: string | null
  HeightMap: string | null
  MaterialPrice: number
  CategoryID: string
  Brand: string | null
  MaterialDescription: string
  PreviewImage: string | null
  CreatedDate: Date
  LastUpdated: Date
  PublishedAt: Date | null
  UserID: string
}
