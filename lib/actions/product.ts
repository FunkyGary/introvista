import firebaseApp from '../firebase/firebase-config'
import {
  FirebaseStorage,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage'
import {
  collection,
  writeBatch,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  where,
  query,
  orderBy,
  getFirestore,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { Model, Material } from 'types/product'

const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

const COLLECTIONS = {
  models: 'models',
  materials: 'materials',
} as const

interface BaseProduct {
  isPublished: boolean
  createdDate: Date
  lastUpdated: Date
  supplierID: string
}

interface ModelProduct extends BaseProduct {
  type: 'model'
  modelID: string
  modelName: string
  price: number
  modelDescription: string
  thumbnailImage: string | null
  modelFiles: {
    modelFileGLB: string | null
    modelFileUSD: string | null
  }
}

interface MaterialProduct extends BaseProduct {
  type: 'material'
  materialID: string
  materialName: string
  materialPrice: number
  materialDescription: string
  previewImage: string | null
  textureMaps: {
    baseColorMap: string | null
    normalMap: string | null
    roughnessMap: string | null
  }
}

export type Product = ModelProduct | MaterialProduct

// Get products by user
export const getUserProducts = async (userId: string) => {
  try {
    const productsQuery = query(
      collection(db, 'products'),
      where('userId', '==', userId)
    )
    const productsSnapshot = await getDocs(productsQuery)

    const products = productsSnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        productID: doc.id,
        type: data.type,
        name: data.name,
        price: data.price,
        description: data.description,
        image: data.image || null,
        isPublished: data.isPublished || false,
        createdDate: (data.createdDate as Timestamp)?.toDate() || new Date(),
        lastUpdated: (data.lastUpdated as Timestamp)?.toDate() || new Date(),
        supplierID: data.supplierID || '',
      }
    })

    const sortedProducts = products.sort(
      (a, b) => b.createdDate.getTime() - a.createdDate.getTime()
    )

    return sortedProducts
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

// Create product
export const createProduct = async (
  type: 'models' | 'materials',
  data: any,
  files: {
    [key: string]: File | null
  }
) => {
  try {
    const uploadPromises = Object.entries(files).map(async ([key, file]) => {
      if (!file) return [key, null]

      const isImage = [
        'thumbnailImage',
        'previewImage',
        'baseColorMap',
        'normalMap',
        'roughnessMap',
        'metallicMap',
        'ambientOcclusionMap',
        'heightMap',
      ].includes(key)

      const url = await (isImage
        ? uploadProductImage(file)
        : uploadProductFile(file))

      return [key, url]
    })

    const uploadResults = await Promise.all(uploadPromises)
    const uploadedUrls = Object.fromEntries(uploadResults)

    const productData = {
      ...data,
      ...(type === 'models'
        ? {
            modelFiles: {
              modelFileGLB: uploadedUrls.modelFileGLB,
              modelFileUSD: uploadedUrls.modelFileUSD,
              additionalFiles: uploadedUrls.additionalFiles || null,
            },
            thumbnailImage: uploadedUrls.thumbnailImage,
          }
        : {
            textureMaps: {
              baseColorMap: uploadedUrls.baseColorMap,
              normalMap: uploadedUrls.normalMap,
              roughnessMap: uploadedUrls.roughnessMap,
              metallicMap: uploadedUrls.metallicMap,
              ambientOcclusionMap: uploadedUrls.ambientOcclusionMap,
              heightMap: uploadedUrls.heightMap,
            },
            previewImage: uploadedUrls.previewImage,
          }),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, 'products'), productData)
    return { id: docRef.id }
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

// Update product
export const updateProduct = async (
  type: 'models' | 'materials',
  id: string,
  data: any
) => {
  try {
    const docRef = doc(db, COLLECTIONS[type], id)
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })
    return { success: true }
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

// Delete product
export const deleteProduct = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'products', id))
    return { success: true }
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}

// Delete multiple products
export const deleteProducts = async (ids: string[]) => {
  try {
    const batch = writeBatch(db)

    ids.forEach((id) => {
      const productDocRef = doc(db, 'products', id)
      batch.delete(productDocRef)
    })

    // Commit the batch delete operation
    await batch.commit()
    console.log(`Successfully deleted products with IDs: ${ids.join(', ')}`)
    return { success: true }
  } catch (error) {
    console.error('Error deleting products:', error)
    return { success: false, message: 'Error deleting products' }
  }
}

// Upload product image and file
const uploadProductImage = async (file: File): Promise<string> => {
  const filename = file.name
  const fileRef = ref(storage, `products/images/${filename}`)
  const snapshot = await uploadBytes(fileRef, file)
  return getDownloadURL(snapshot.ref)
}

const uploadProductFile = async (file: File): Promise<string> => {
  const filename = file.name
  const fileRef = ref(storage, `products/files/${filename}`)
  const snapshot = await uploadBytes(fileRef, file)
  return getDownloadURL(snapshot.ref)
}

export const createProductWithoutFiles = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return { id: docRef.id }
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}
