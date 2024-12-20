import firebaseApp from '../firebase/firebase-config'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import {
  type Query,
  type DocumentData,
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

export interface ProductFilters {
  userId: string
  searchFilters: SearchFilters
}

interface SearchFilters {
  categoryID?: string | null
  searchQuery?: string
  priceRange?: PriceRange
  tags?: string
  brands?: string
  dimensions?: DimensionFilters
}

interface PriceRange {
  min?: string
  max?: string
}

interface DimensionFilters {
  length?: DimensionRange
  width?: DimensionRange
  height?: DimensionRange
}

interface DimensionRange {
  min?: string
  max?: string
}

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
        isPublished: data.isPublished || false,
        createdDate: (data.createdDate as Timestamp)?.toDate() || new Date(),
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
        isPublished: data.isPublished || false,
        createdDate: (data.createdDate as Timestamp)?.toDate() || new Date(),
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

        const data = productDoc.data()

        // Helper function to safely get download URL
        const getUrlFromPath = async (path: string | null | undefined) => {
          if (!path) return { name: '', url: '' }
          try {
            const fileRef = ref(storage, path)
            const filename = fileRef.name
            const url = await getDownloadURL(fileRef)
            return { name: filename, url }
          } catch (error) {
            console.error(`Error getting download URL for path ${path}:`, error)
            return { name: '', url: '' }
          }
        }

        if (collection === 'models') {
          const modelData = {
            type: 'models',
            itemID: productDoc.id,
            itemName: data?.itemName,
            itemDescription: data?.itemDescription,
            brand: data?.brand,
            price: data?.price,
            categoryID: data?.categoryID,
            userId: data?.userId,
            isPublished: data?.isPublished,
            dimensions: data?.dimensions,
            weight: data?.weight,
            tags: data?.tags,
            thumbnailImage: await getUrlFromPath(data?.thumbnailImage),
            itemFiles: {
              modelFileGLB: await getUrlFromPath(data?.itemFiles?.modelFileGLB),
              modelFileUSD: await getUrlFromPath(data?.itemFiles?.modelFileUSD),
            },
          } as ModelData
          return modelData
        } else {
          const materialData = {
            type: 'materials',
            materialID: productDoc.id,
            materialName: data?.materialName,
            materialDescription: data?.materialDescription,
            materialPrice: data?.materialPrice,
            brand: data?.brand,
            isPublished: data?.isPublished,
            categoryID: data?.categoryID,
            userId: data?.userId,
            dimensions: data?.dimensions,
            weight: data?.weight,
            tags: data?.tags,
            previewImage: await getUrlFromPath(data?.previewImage),
            textureMaps: {
              baseColorMap: await getUrlFromPath(
                data?.textureMaps?.baseColorMap
              ),
              normalMap: await getUrlFromPath(data?.textureMaps?.normalMap),
              roughnessMap: await getUrlFromPath(
                data?.textureMaps?.roughnessMap
              ),
              metallicMap: await getUrlFromPath(data?.textureMaps?.metallicMap),
              ambientOcclusionMap: await getUrlFromPath(
                data?.textureMaps?.ambientOcclusionMap
              ),
              heightMap: await getUrlFromPath(data?.textureMaps?.heightMap),
            },
          } as MaterialData
          return materialData
        }
      })
    )

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

    const cleanedFiles = Object.fromEntries(
      Object.entries(files).filter(([_, file]) => file !== null)
    )
    const uploadedUrls = await uploadFiles(cleanedFiles)

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
    const docRef = doc(db, COLLECTIONS[type], id)
    const currentDoc = await getDoc(docRef)
    const currentData = currentDoc.data()

    const files =
      type === 'models'
        ? extractModelFiles(data as ModelFormValues)
        : extractMaterialFiles(data as MaterialFormValues)

    const cleanedFiles = Object.fromEntries(
      Object.entries(files).filter(([_, file]) => file !== null)
    )

    const uploadedUrls = await uploadFiles(cleanedFiles)

    let mergedUrls = {}
    if (type === 'models') {
      mergedUrls = {
        thumbnailImage:
          uploadedUrls.thumbnailImage || currentData?.thumbnailImage,
        itemFiles: {
          additionalFiles: currentData?.itemFiles?.additionalFiles,
          modelFileGLB:
            uploadedUrls.modelFileGLB || currentData?.itemFiles?.modelFileGLB,
          modelFileUSD:
            uploadedUrls.modelFileUSD || currentData?.itemFiles?.modelFileUSD,
        },
      }
    } else {
      mergedUrls = {
        previewImage: uploadedUrls.previewImage || currentData?.previewImage,
        textureMaps: {
          baseColorMap:
            uploadedUrls.baseColorMap || currentData?.textureMaps?.baseColorMap,
          normalMap:
            uploadedUrls.normalMap || currentData?.textureMaps?.normalMap,
          roughnessMap:
            uploadedUrls.roughnessMap || currentData?.textureMaps?.roughnessMap,
          metallicMap:
            uploadedUrls.metallicMap || currentData?.textureMaps?.metallicMap,
          ambientOcclusionMap:
            uploadedUrls.ambientOcclusionMap ||
            currentData?.textureMaps?.ambientOcclusionMap,
          heightMap:
            uploadedUrls.heightMap || currentData?.textureMaps?.heightMap,
        },
      }
    }

    const updatedData = {
      ...data,
      ...mergedUrls,
      createdDate: currentData?.createdDate,
      lastUpdated: serverTimestamp(),
    }

    await updateDoc(docRef, updatedData)
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
  const filename = file.name
  const fileRef = ref(storage, `products/images/${filename}`)
  const snapshot = await uploadBytes(fileRef, file)
  return snapshot.ref.fullPath
}

const uploadProductFile = async (file: File): Promise<string> => {
  const filename = file.name
  const fileRef = ref(storage, `products/files/${filename}`)
  const snapshot = await uploadBytes(fileRef, file)
  return snapshot.ref.fullPath
}

const extractModelFiles = (data: ModelFormValues) => {
  const files: Record<string, File | null> = {}

  if (Array.isArray(data.thumbnailImage) && data.thumbnailImage[0]?.file) {
    files.thumbnailImage = data.thumbnailImage[0].file
  }

  if (data.itemFiles) {
    if (data.itemFiles.modelFileGLB instanceof File) {
      files.modelFileGLB = data.itemFiles.modelFileGLB
    }
    if (data.itemFiles.modelFileUSD instanceof File) {
      files.modelFileUSD = data.itemFiles.modelFileUSD
    }
  }

  return files
}

const extractMaterialFiles = (data: MaterialFormValues) => {
  const files: Record<string, File | null> = {}

  if (Array.isArray(data.previewImage) && data.previewImage[0]?.file) {
    files.previewImage = data.previewImage[0].file
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
      if (data.textureMaps?.[mapType] instanceof File) {
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

// Updated function with new interface
export const filterProducts = async (filters: ProductFilters) => {
  try {
    // Base queries for both collections
    const modelsBaseQuery = query(
      collection(db, COLLECTIONS.models),
      where('userId', '==', filters.userId)
    )
    const materialsBaseQuery = query(
      collection(db, COLLECTIONS.materials),
      where('userId', '==', filters.userId)
    )

    // Build queries using the helper function
    const modelsQuery = buildQuery(modelsBaseQuery, filters, {
      nameField: 'itemName',
    })
    const materialsQuery = buildQuery(materialsBaseQuery, filters, {
      nameField: 'materialName',
    })

    // Fetch data
    const [modelsSnapshot, materialsSnapshot] = await Promise.all([
      getDocs(modelsQuery),
      getDocs(materialsQuery),
    ])

    // Transform and filter results
    const models = modelsSnapshot.docs.map((doc) => ({
      itemID: doc.id,
      type: 'model',
      itemName: doc.data().itemName,
      isPublished: doc.data().isPublished,
      price: doc.data().price,
      createdDate:
        (doc.data().createdDate as Timestamp)?.toDate() || new Date(),
    }))

    const materials = materialsSnapshot.docs.map((doc) => ({
      materialID: doc.id,
      type: 'material',
      materialName: doc.data().materialName,
      isPublished: doc.data().isPublished,
      materialPrice: doc.data().materialPrice,
      createdDate:
        (doc.data().createdDate as Timestamp)?.toDate() || new Date(),
    }))

    const products = [...models, ...materials]

    console.log(products)

    return products
  } catch (error) {
    console.error('Error filtering products:', error)
    throw error
  }
}

const buildQuery = (
  baseQuery: Query<DocumentData>,
  filters: ProductFilters,
  fieldMappings: { nameField: string }
): Query<DocumentData> => {
  let queryRef = baseQuery

  // Name filter
  if (filters.searchFilters.searchQuery !== '') {
    queryRef = query(
      queryRef,
      where(fieldMappings.nameField, '==', filters.searchFilters.searchQuery)
    )
  }

  // Tags filter
  if (filters.searchFilters.tags !== '') {
    queryRef = query(
      queryRef,
      where('tags', 'array-contains', filters.searchFilters.tags)
    )
  }

  // Brand filter
  if (filters.searchFilters.brands !== '') {
    queryRef = query(
      queryRef,
      where('brand', '==', filters.searchFilters.brands)
    )
  }

  // Category ID filter
  if (filters.searchFilters.categoryID !== '') {
    queryRef = query(
      queryRef,
      where('categoryID', '==', filters.searchFilters.categoryID)
    )
  }

  // Price range filter
  if (filters.searchFilters.priceRange) {
    const { min, max } = filters.searchFilters.priceRange
    const priceField =
      fieldMappings.nameField === 'itemName' ? 'price' : 'materialPrice'

    if (min !== '' && min !== undefined) {
      queryRef = query(queryRef, where(priceField, '>=', Number(min)))
    }

    if (max !== '' && max !== undefined) {
      queryRef = query(queryRef, where(priceField, '<=', Number(max)))
    }
  }

  // Dimensions filter
  if (filters.searchFilters.dimensions) {
    const { length, width, height } = filters.searchFilters.dimensions

    // Length filter
    if (length?.min !== undefined && length?.min !== '') {
      queryRef = query(
        queryRef,
        where('dimensions.length', '>=', Number(length.min))
      )
    }
    if (length?.max !== undefined && length?.max !== '') {
      queryRef = query(
        queryRef,
        where('dimensions.length', '<=', Number(length.max))
      )
    }

    // Width filter
    if (width?.min !== undefined && width?.min !== '') {
      queryRef = query(
        queryRef,
        where('dimensions.width', '>=', Number(width.min))
      )
    }
    if (width?.max !== undefined && width?.max !== '') {
      queryRef = query(
        queryRef,
        where('dimensions.width', '<=', Number(width.max))
      )
    }

    // Height filter
    if (height?.min !== undefined && height?.min !== '') {
      queryRef = query(
        queryRef,
        where('dimensions.height', '>=', Number(height.min))
      )
    }
    if (height?.max !== undefined && height?.max !== '') {
      queryRef = query(
        queryRef,
        where('dimensions.height', '<=', Number(height.max))
      )
    }
  }

  return queryRef
}
