import 'reflect-metadata'
import {
  type Firestore,
  getFirestore,
  collection,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore'
import {
  FirebaseStorage,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage'
import firebaseApp from '../firebase/firebase-config'
import {
  MaterialProductCreateDto,
  ModelProductCreateDto,
} from './product-create.dto'
import { FirebaseError } from 'firebase/app'
import { parseFirestoreErrorCode } from '../firebase/parse-firestore-error-code'
import { injectable } from 'inversify'
import { FurnitureModel } from './model.entity'
import { Material } from './material.entity'

@injectable()
class ProductApi {
  furnitureModelCollectionName = 'furnitureModels'
  materialCollectionName = 'materials'

  db: Firestore
  storage: FirebaseStorage

  constructor() {
    this.db = getFirestore(firebaseApp)
    this.storage = getStorage(firebaseApp)
  }

  async getFurnitureModels(): Promise<FurnitureModel[]> {
    const furnitureModels = await getDocs(
      collection(this.db, this.furnitureModelCollectionName)
    )
    return furnitureModels.docs.map((doc) => {
      const data = doc.data()
      const furnitureModel: FurnitureModel = {
        ModelID: doc.id,
        ModelName: data.ModelName,
        CategoryID: data.CategoryID,
        Brand: data.Brand,
        ModelDescription: data.ModelDescription,
        ModelFileGLB: data.ModelFileGLB,
        ModelFileUSD: data.ModelFileUSD,
        ThumbnailImage: data.ThumbnailImage,
        Dimensions: data.Dimensions,
        Weight: data.Weight,
        MaterialIDs: data.MaterialIDs,
        Price: data.Price,
        StockQuantity: data.StockQuantity,
        CreatedDate: (data.CreatedDate as Timestamp).toDate(),
        LastUpdated: (data.LastUpdated as Timestamp).toDate(),
        PublishedAt: (data.PublishedAt as Timestamp | null)?.toDate() || null,
        UserID: data.UserID,
      }

      return furnitureModel
    })
  }

  async getMaterials(): Promise<Material[]> {
    const materials = await getDocs(
      collection(this.db, this.materialCollectionName)
    )
    return materials.docs.map((doc) => {
      const data = doc.data()
      const material: Material = {
        MaterialID: doc.id,
        MaterialName: data.MaterialName,
        BaseColorMap: data.BaseColorMap,
        NormalMap: data.NormalMap,
        RoughnessMap: data.RoughnessMap,
        MetallicMap: data.MetallicMap,
        AmbientOcclusionMap: data.AmbientOcclusionMap,
        ThumbnailImage: data.ThumbnailImage,
        HeightMap: data.HeightMap,
        MaterialPrice: data.MaterialPrice,
        CategoryID: data.CategoryID,
        Brand: data.Brand,
        MaterialDescription: data.MaterialDescription,
        PreviewImage: data.PreviewImage,
        CreatedDate: (data.CreatedDate as Timestamp).toDate(),
        LastUpdated: (data.LastUpdated as Timestamp).toDate(),
        PublishedAt: (data.PublishedAt as Timestamp | null)?.toDate() || null,
        UserID: data.UserID,
      }

      return material
    })
  }

  async createFurnitureModelProduct(
    {
      modelFileGLB,
      modelFileUSD,
      thumbnailImages,
      ...data
    }: ModelProductCreateDto,
    userId: string
  ): Promise<{ productId?: string; error?: string }> {
    try {
      const [thumbnailImageUrl, modelFileGLBUrl, modelFileUSDUrl] =
        await Promise.all([
          thumbnailImages.length > 0
            ? this.uploadProductImage(thumbnailImages[0].file)
            : null,
          modelFileGLB ? this.uploadProductFile(modelFileGLB) : null,
          modelFileUSD ? this.uploadProductFile(modelFileUSD) : null,
        ])

      const furnitureModel: Omit<
        FurnitureModel,
        'ModelID' | 'CreatedDate' | 'LastUpdated' | 'PublishedAt'
      > = {
        ModelName: data.modelName,
        CategoryID: data.modelCategory,
        Brand: data.brand,
        ModelDescription: data.description,
        ModelFileGLB: modelFileGLBUrl,
        ModelFileUSD: modelFileUSDUrl,
        ThumbnailImage: thumbnailImageUrl,
        Dimensions: data.dimensions,
        Weight: data.weight,
        MaterialIDs: data.material,
        Price: data.price,
        StockQuantity: data.stockQuantity,
        UserID: userId,
      }

      const docRef = await addDoc(
        collection(this.db, this.furnitureModelCollectionName),
        {
          ...furnitureModel,
          CreatedDate: serverTimestamp(),
          LastUpdated: serverTimestamp(),
          PublishedAt: null,
        }
      )
      return {
        productId: docRef.id,
      }
    } catch (error) {
      console.error(error)
      if (error instanceof FirebaseError) {
        return { error: parseFirestoreErrorCode(error.code) }
      }
      if (error instanceof Error) {
        return { error: error.message }
      }

      return { error: 'Something went wrong' }
    }
  }

  async createMaterialProduct(
    {
      baseColorMap,
      normalMap,
      roughnessMap,
      metallicMap,
      ambientOcclusionMap,
      heightMap,
      thumbnailImages,
      ...data
    }: MaterialProductCreateDto,
    userId: string
  ): Promise<{ productId?: string; error?: string }> {
    try {
      const [
        thumbnailImageUrl,
        baseColorMapUrl,
        normalMapUrl,
        roughnessMapUrl,
        metallicMapUrl,
        ambientOcclusionMapUrl,
        heightMapUrl,
      ] = await Promise.all([
        thumbnailImages.length > 0
          ? this.uploadProductImage(thumbnailImages[0].file)
          : null,
        baseColorMap ? this.uploadProductFile(baseColorMap) : null,
        normalMap ? this.uploadProductFile(normalMap) : null,
        roughnessMap ? this.uploadProductFile(roughnessMap) : null,
        metallicMap ? this.uploadProductFile(metallicMap) : null,
        ambientOcclusionMap
          ? this.uploadProductFile(ambientOcclusionMap)
          : null,
        heightMap ? this.uploadProductFile(heightMap) : null,
      ])

      const material: Omit<
        Material,
        'MaterialID' | 'CreatedDate' | 'LastUpdated' | 'PublishedAt'
      > = {
        MaterialName: data.materialName,
        BaseColorMap: baseColorMapUrl,
        NormalMap: normalMapUrl,
        RoughnessMap: roughnessMapUrl,
        MetallicMap: metallicMapUrl,
        AmbientOcclusionMap: ambientOcclusionMapUrl,
        ThumbnailImage: thumbnailImageUrl,
        HeightMap: heightMapUrl,
        MaterialPrice: data.materialPrice,
        CategoryID: data.category,
        Brand: null,
        MaterialDescription: data.materialDescription,
        PreviewImage: null,
        UserID: userId,
      }

      const docRef = await addDoc(
        collection(this.db, this.materialCollectionName),
        {
          ...material,
          CreatedDate: serverTimestamp(),
          LastUpdated: serverTimestamp(),
          PublishedAt: null,
        }
      )
      return {
        productId: docRef.id,
      }
    } catch (error) {
      console.error(error)
      if (error instanceof FirebaseError) {
        return { error: parseFirestoreErrorCode(error.code) }
      }
      if (error instanceof Error) {
        return { error: error.message }
      }

      return { error: 'Something went wrong' }
    }
  }

  // Delete furniture model by ID
  async deleteFurnitureModel(
    modelId: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await deleteDoc(doc(this.db, this.furnitureModelCollectionName, modelId))
      return { success: true }
    } catch (error) {
      console.error(error)
      if (error instanceof FirebaseError) {
        return { success: false, error: parseFirestoreErrorCode(error.code) }
      }
      return { success: false, error: 'Something went wrong' }
    }
  }

  // Delete material by ID
  async deleteMaterial(
    materialId: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await deleteDoc(doc(this.db, this.materialCollectionName, materialId))
      return { success: true }
    } catch (error) {
      console.error(error)
      if (error instanceof FirebaseError) {
        return { success: false, error: parseFirestoreErrorCode(error.code) }
      }
      return { success: false, error: 'Something went wrong' }
    }
  }

  // update model and material by Product ID
  async updateDocumentByProductId(
    ProductId: string,
    updatedData: Partial<FurnitureModel | Material>,
    colelctionName: string
  ): Promise<{ success: boolean; error?: string }> {
    const docRef = doc(this.db, colelctionName, ProductId)
    try {
      await updateDoc(docRef, { ...updatedData, LastUpdated: serverTimestamp() })
      return { success: true }
    } catch (error) {
      console.error(error)
      if (error instanceof FirebaseError) {
        return { success: false, error: parseFirestoreErrorCode(error.code) }
      }
      return { success: false, error: 'Something went wrong' }
    }
  }


  private async uploadProductImage(file: File): Promise<string> {
    const filename = file.name
    const fileRef = ref(this.storage, `products/images/${filename}`)
    const snapshot = await uploadBytes(fileRef, file)
    return getDownloadURL(snapshot.ref)
  }

  private async uploadProductFile(file: File): Promise<string> {
    const filename = file.name
    const fileRef = ref(this.storage, `products/files/${filename}`)
    const snapshot = await uploadBytes(fileRef, file)
    return getDownloadURL(snapshot.ref)
  }
}

export default ProductApi
