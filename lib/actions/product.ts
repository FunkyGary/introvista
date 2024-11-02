import firebaseApp, { db } from '../firebase/firebase-config'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  getFirestore,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'

import { Model, Material } from 'types/product'

const COLLECTIONS = {
  models: 'models',
  materials: 'materials',
} as const

// Get products
export const getProducts = async (type: 'models' | 'materials') => {
  try {
    const snapshot = await getDocs(collection(db, COLLECTIONS[type]))
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

// Create product
export const createProduct = async (type: 'models' | 'materials', data: any) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS[type]), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return { id: docRef.id }
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

// Update product
export const updateProduct = async (type: 'models' | 'materials', id: string, data: any) => {
  try {
    const docRef = doc(db, COLLECTIONS[type], id)
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    })
    return { success: true }
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

// Delete product
export const deleteProduct = async (type: 'models' | 'materials', id: string) => {
  try {
    await deleteDoc(doc(db, COLLECTIONS[type], id))
    return { success: true }
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}
