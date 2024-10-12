import {
  type Firestore,
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";
import {
  FirebaseStorage,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import firebaseApp from "../firebase/firebase-config";
import {
  MaterialProductCreateDto,
  ModelProductCreateDto,
  ProductCreateDto,
} from "./product-create.dto";
import { FirebaseError } from "firebase/app";
import { parseFirestoreErrorCode } from "../firebase/parse-firestore-error-code";
import { injectable } from "inversify";

@injectable()
class ProductApi {
  collectionName = "products";
  db: Firestore;
  storage: FirebaseStorage;

  constructor() {
    this.db = getFirestore(firebaseApp);
    this.storage = getStorage(firebaseApp);
  }

  async createModelProduct(
    {
      modelFileGLB,
      modelFileUSD,
      thumbnailImages,
      ...data
    }: ModelProductCreateDto,
    userId: string
  ): Promise<{ productId?: string; error?: string }> {
    try {
      const [modelFileGLBUrl, modelFileUSDUrl, thumbnailImageUrl] =
        await Promise.all([
          modelFileGLB ? this.uploadProductImage(modelFileGLB) : null,
          modelFileUSD ? this.uploadProductImage(modelFileUSD) : null,
          thumbnailImages.length > 0
            ? this.uploadProductImage(thumbnailImages[0].file)
            : null,
        ]);

      const docRef = await addDoc(collection(this.db, this.collectionName), {
        ...data,
        modelFileGLBUrl,
        modelFileUSDUrl,
        thumbnailImageUrl,
        userId,
        category: "furnitureModel",
      });
      return {
        productId: docRef.id,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        return { error: parseFirestoreErrorCode(error.code) };
      }
      if (error instanceof Error) {
        return { error: error.message };
      }

      return { error: "Something went wrong" };
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
        baseColorMapUrl,
        normalMapUrl,
        roughnessMapUrl,
        metallicMapUrl,
        ambientOcclusionMapUrl,
        heightMapUrl,
        thumbnailImageUrl,
      ] = await Promise.all([
        baseColorMap ? this.uploadProductImage(baseColorMap) : null,
        normalMap ? this.uploadProductImage(normalMap) : null,
        roughnessMap ? this.uploadProductImage(roughnessMap) : null,
        metallicMap ? this.uploadProductImage(metallicMap) : null,
        ambientOcclusionMap
          ? this.uploadProductImage(ambientOcclusionMap)
          : null,
        heightMap ? this.uploadProductImage(heightMap) : null,
        thumbnailImages.length > 0
          ? this.uploadProductImage(thumbnailImages[0].file)
          : null,
      ]);

      const docRef = await addDoc(collection(this.db, this.collectionName), {
        ...data,
        baseColorMapUrl,
        normalMapUrl,
        roughnessMapUrl,
        metallicMapUrl,
        ambientOcclusionMapUrl,
        heightMapUrl,
        thumbnailImageUrl,
        userId,
        category: "material",
      });
      return {
        productId: docRef.id,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        return { error: parseFirestoreErrorCode(error.code) };
      }
      if (error instanceof Error) {
        return { error: error.message };
      }

      return { error: "Something went wrong" };
    }
  }

  private async uploadProductImage(file: File): Promise<string> {
    const filename = file.name;
    const fileRef = ref(this.storage, `products/images/${filename}`);
    const snapshot = await uploadBytes(fileRef, file);
    return getDownloadURL(snapshot.ref);
  }
}

export default ProductApi;
