export interface Material {
    materialID: string;
    tags: string[];
    materialName: string;
    categoryID: string;
    supplierID: string;
    brand: string;
    materialDescription: string;
    textureMaps: {
        baseColorMap: string | null;
        normalMap: string | null;
        roughnessMap: string | null;
        metallicMap: string | null;
        ambientOcclusionMap?: string | null;
        heightMap?: string | null;
    };
    previewImage: string | null;
    dimensions?: {
        length?: number;
        width?: number;
        height?: number;
    };
    weight?: number;
    materialPrice: number;
    isPublished: boolean;
    createdDate: Date;
    lastUpdated: Date;
}
