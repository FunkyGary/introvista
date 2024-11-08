import firebaseApp from '../firebase/firebase-config'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import {
  getDoc,
  collection,
  writeBatch,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  where,
  query,
  getFirestore,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import {
  ModelData,
  MaterialData,
  ModelProduct,
  MaterialProduct,
  ProductType,
  Product,
  ProductData,
} from 'types/product'

import {
  ProductFormValues,
  MaterialFormValues,
  ModelFormValues,
} from '@/lib/validations/product'

const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

const COLLECTIONS = {
  models: 'models',
  materials: 'materials',
} as const

export const getUserProductsFromSingleCollection = async (userId: string) => {
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

// Get products by user
export const getUserProducts = async (userId: string) => {
  try {
    const modelsQuery = query(
      collection(db, COLLECTIONS.models),
      where('userId', '==', userId)
    )

    const materialsQuery = query(
      collection(db, COLLECTIONS.materials),
      where('userId', '==', userId)
    )

    const [modelsSnapshot, materialsSnapshot] = await Promise.all([
      getDocs(modelsQuery),
      getDocs(materialsQuery),
    ])

    // Transform models data
    const models: ModelProduct[] = modelsSnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        itemID: doc.id,
        type: 'model',
        itemName: data.itemName || '',
        price: data.price || 0,
        modelDescription: data.modelDescription || '',
        thumbnailImage: data.thumbnailImage || null,
        itemFiles: {
          modelFileGLB: data.modelFiles?.modelFileGLB || null,
          modelFileUSD: data.modelFiles?.modelFileUSD || null,
        },
        isPublished: data.isPublished || false,
        createdDate: (data.createdDate as Timestamp)?.toDate() || new Date(),
        lastUpdated: (data.lastUpdated as Timestamp)?.toDate() || new Date(),
        supplierID: data.supplierID,
      }
    })

    // Transform materials data
    const materials: MaterialProduct[] = materialsSnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        materialID: doc.id,
        type: 'material',
        materialName: data.materialName || '',
        materialPrice: data.materialPrice || 0,
        materialDescription: data.materialDescription || '',
        previewImage: data.previewImage || null,
        textureMaps: {
          baseColorMap: data.textureMaps?.baseColorMap || null,
          normalMap: data.textureMaps?.normalMap || null,
          roughnessMap: data.textureMaps?.roughnessMap || null,
        },
        isPublished: data.isPublished || false,
        createdDate: (data.createdDate as Timestamp)?.toDate() || new Date(),
        lastUpdated: (data.lastUpdated as Timestamp)?.toDate() || new Date(),
        supplierID: data.supplierID,
      }
    })

    // Combine and sort by creation date
    const allProducts: Product[] = [...models, ...materials].sort(
      (a, b) => b.createdDate.getTime() - a.createdDate.getTime()
    )

    return allProducts
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

// Get Product By ProductId from multiple collections
export const getProductByProductId = async (id: string) => {
  const collections = ['models', 'materials']
  try {
    const productDoc = await Promise.all(
      collections.map(async (collection) => {
        const productDocRef = doc(db, collection, id)
        const productDoc = await getDoc(productDocRef)
        if (!productDoc.exists()) return undefined

        const modelData = {
          type: 'models',
          itemID: productDoc.id,
          itemName: productDoc.data()?.itemName,
          itemDescription: productDoc.data()?.itemDescription,
          brand: productDoc.data()?.brand,
          price: productDoc.data()?.price,
          categoryID: productDoc.data()?.categoryID,
          userId: productDoc.data()?.userId,
          isPublished: productDoc.data()?.isPublished,
          dimensions: productDoc.data()?.dimensions,
          weight: productDoc.data()?.weight,
          tags: productDoc.data()?.tags,
        } as ModelData

        const materialData = {
          type: 'materials',
          materialID: productDoc.id,
          materialName: productDoc.data()?.materialName,
          materialDescription: productDoc.data()?.materialDescription,
          materialPrice: productDoc.data()?.materialPrice,
          brand: productDoc.data()?.brand,
          isPublished: productDoc.data()?.isPublished,
          categoryID: productDoc.data()?.categoryID,
          userId: productDoc.data()?.userId,
          dimensions: productDoc.data()?.dimensions,
          weight: productDoc.data()?.weight,
          tags: productDoc.data()?.tags,
        } as MaterialData

        const productData = collection === 'models' ? modelData : materialData

        return productData as ProductData
      })
    )

    // Return the product that exists
    return productDoc.find((doc) => doc !== undefined)
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

// Create product
export const createProduct = async (
  type: ProductType,
  data: ProductFormValues
) => {
  try {
    const files =
      type === 'models'
        ? extractModelFiles(data as ModelFormValues)
        : extractMaterialFiles(data as MaterialFormValues)

    console.log('Files to upload:', files)
    const uploadedUrls = await uploadFiles(files)
    
    const productData = prepareProductData(type, data, uploadedUrls)
    const docRef = await addDoc(collection(db, COLLECTIONS[type]), productData)
    return { id: docRef.id }
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

// Update product by Id
export const updateProduct = async (
  id: string,
  type: ProductType,
  data: ProductFormValues
) => {
  try {
    const files =
      type === 'models'
        ? extractModelFiles(data as ModelFormValues)
        : extractMaterialFiles(data as MaterialFormValues)

    const uploadedUrls = await uploadFiles(files)
    const docRef = doc(db, COLLECTIONS[type], id)

    const updatedData = prepareProductData(type, data, uploadedUrls)

    await updateDoc(docRef, {
      ...updatedData,
      lastUpdated: serverTimestamp(),
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
    const collections = ['models', 'materials']
    let deletedCount = 0

    const checkPromises = collections.map(async (collection) => {
      const docRef = doc(db, collection, id)
      const docSnapshot = await getDoc(docRef)
      return {
        collection,
        exists: docSnapshot.exists(),
        ref: docRef,
      }
    })

    const results = await Promise.all(checkPromises)

    const deletePromises = results
      .filter((result) => result.exists)
      .map(async (result) => {
        await deleteDoc(result.ref)
        deletedCount++
      })

    await Promise.all(deletePromises)

    if (deletedCount === 0) {
      return {
        success: false,
        message: 'Document not found in any collection',
      }
    }

    return {
      success: true,
      message: `Document deleted from ${deletedCount} collection(s)`,
      deletedCount,
    }
  } catch (error) {
    console.error('Error deleting product:', error)
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
      error,
    }
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
  if (!file) {
    console.error('No file provided for upload')
    return ''
  }

  const filename = file.name
  if (!filename) {
    console.error('File name is undefined')
    return ''
  }

  console.log(`Uploading image with filename: ${filename}`)

  const fileRef = ref(storage, `products/images/${filename}`)
  const snapshot = await uploadBytes(fileRef, file)

  console.log('Finished uploading image')

  // return snapshot.ref.toString()
  return getDownloadURL(snapshot.ref)
}

const uploadProductFile = async (file: File): Promise<string> => {
  const filename = file.name
  const fileRef = ref(storage, `products/files/${filename}`)
  const snapshot = await uploadBytes(fileRef, file)

  console.log('finished upload file')
  return snapshot.ref.toString()
  /* return getDownloadURL(snapshot.ref) */
}

const extractModelFiles = (data: ModelFormValues) => {
  const files: Record<string, File | null> = {}

  if (data.thumbnailImage) {
    files.thumbnailImage = data.thumbnailImage
  }

  if (data.itemFiles) {
    if (data.itemFiles.modelFileGLB) {
      files.modelFileGLB = data.itemFiles.modelFileGLB
    }
    if (data.itemFiles.modelFileUSD) {
      files.modelFileUSD = data.itemFiles.modelFileUSD
    }
  }

  return files
}

const extractMaterialFiles = (data: MaterialFormValues) => {
  const files: Record<string, File | null> = {}

  if (data.previewImage) {
    files.previewImage = data.previewImage
  }

  if (data.textureMaps) {
    const mapTypes = [
      'baseColorMap',
      'normalMap',
      'roughnessMap',
      'metallicMap',
      'ambientOcclusionMap',
      'heightMap',
    ] as const

    mapTypes.forEach((mapType) => {
      if (data.textureMaps?.[mapType]) {
        files[mapType] = data.textureMaps[mapType]
      }
    })
  }

  return files
}

const uploadFiles = async (files: Record<string, File | null>) => {
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
  console.log(Object.fromEntries(uploadResults));
  
  return Object.fromEntries(uploadResults)
}

const prepareProductData = (
  type: ProductType,
  data: ProductFormValues,
  uploadedUrls: Record<string, string | null>
) => {
  const baseData = {
    ...data,
    createdDate: serverTimestamp(),
    lastUpdated: serverTimestamp(),
  }

  if (type === 'models') {
    return {
      ...baseData,
      itemFiles: {
        modelFileGLB: uploadedUrls.modelFileGLB || null,
        modelFileUSD: uploadedUrls.modelFileUSD || null,
        additionalFiles: uploadedUrls.additionalFiles || null,
      },
      thumbnailImage: uploadedUrls.thumbnailImage || null,
    }
  } else {
    return {
      ...baseData,
      textureMaps: {
        baseColorMap: uploadedUrls.baseColorMap || null,
        normalMap: uploadedUrls.normalMap || null,
        roughnessMap: uploadedUrls.roughnessMap || null,
        metallicMap: uploadedUrls.metallicMap || null,
        ambientOcclusionMap: uploadedUrls.ambientOcclusionMap || null,
        heightMap: uploadedUrls.heightMap || null,
      },
      previewImage: uploadedUrls.previewImage || null,
    }
  }
}

export const createProductWithoutFiles = async (
  type: 'models' | 'materials',
  data: ProductFormValues
) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS[type]), {
      ...data,
      createdDate: serverTimestamp(),
      lastUpdated: serverTimestamp(),
    })
    return { id: docRef.id }
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}
