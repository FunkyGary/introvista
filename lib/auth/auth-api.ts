import {
  type User as FirebaseUser,
  type Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  updatePassword,
  updateEmail,
  onAuthStateChanged,
  signOut,
  getAuth,
} from 'firebase/auth'
import firebaseApp from '../firebase/firebase-config'
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
  query,
  where
} from 'firebase/firestore'
import type {
  ResetPasswordParams,
  SignInWithPasswordParams,
  SignUpParams,
  UpdatePasswordParams,
  UpdateEmailParams,
} from './client'
import type { User, UserData } from '@/types/user'
import { FirebaseError } from 'firebase/app'
import { UserRole } from '@/types/user-role'
import { injectable } from 'inversify'

@injectable()
class AuthApi {
  userCollectionName = 'users'
  auth: Auth
  user: User | null
  db: Firestore

  constructor() {
    this.auth = getAuth(firebaseApp)
    this.user = null
    this.onUserChange((user) => {
      this.user = user
    })

    this.db = getFirestore(firebaseApp)
  }

  async signUp({
    firstName,
    lastName,
    email,
    password,
  }: SignUpParams): Promise<{ error?: string }> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      )
      await updateProfile(userCredential.user, {
        displayName: `${firstName},${lastName}`,
      })

      const userData = {
        userID: userCredential.user.uid,
        role: 'user',
        tags: [],
        username: `${firstName} ${lastName}`,
        email: userCredential.user.email as string,
        passwordHash: userCredential.user.email as string,
      }
      await addDoc(collection(this.db, this.userCollectionName), userData)
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }

    return {}
  }

  async signInWithPassword({
    email,
    password,
  }: SignInWithPasswordParams): Promise<{ error?: string }> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password)

      // get user data by email from firestore
      const userQuery = query(
        collection(this.db, this.userCollectionName),
        where('email', '==', email)
      )
      const userQuerySnapshot = await getDocs(userQuery)

      // update last login timestamp
      userQuerySnapshot.docs.map((doc) => {
        return { lastLoginDate: serverTimestamp() }
      })
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }

    return {}
  }

  async updateProfile(data: Partial<User>): Promise<{ error?: string }> {
    if (!this.auth.currentUser) {
      return { error: 'Not logged in' }
    }

    try {
      await updateProfile(this.auth.currentUser, {
        displayName: data.name,
        photoURL: data.avatar,
      })
      return {}
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    try {
      const currentFirebaseUser = await new Promise<FirebaseUser | null>(
        (resolve, reject) => {
          onAuthStateChanged(this.auth, (user) => {
            return resolve(user)
          })
        }
      )
      if (!currentFirebaseUser) {
        return { data: null }
      }

      return {
        data: this.mapFirebaseUserToUser(currentFirebaseUser),
      }
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }
  }

  async getUserRole(): Promise<{ data?: UserRole | null; error?: string }> {
    try {
      const currentFirebaseUser = await new Promise<FirebaseUser | null>(
        (resolve, reject) => {
          onAuthStateChanged(this.auth, (user) => {
            return resolve(user)
          })
        }
      )
      if (!currentFirebaseUser) {
        return { data: null }
      }

      const idTokenResult = await currentFirebaseUser.getIdTokenResult()
      const userRole = {
        manufacturer: !!idTokenResult.claims.manufacturer,
        admin: !!idTokenResult.claims.admin,
        supplier: !!idTokenResult.claims.supplier,
        designer: !!idTokenResult.claims.designer,
      } satisfies UserRole

      return {
        data: userRole,
      }
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }
  }

  onUserChange(callback: (user: User | null) => void): void {
    onAuthStateChanged(this.auth, (user) => {
      if (!user) {
        callback(null)
        return
      }

      callback(this.mapFirebaseUserToUser(user))
    })
  }

  async resetPassword({
    email,
  }: ResetPasswordParams): Promise<{ error?: string }> {
    try {
      await sendPasswordResetEmail(this.auth, email)
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }

    return {}
  }

  async updatePassword({
    oldPassword,
    newPassword,
  }: UpdatePasswordParams): Promise<{ error?: string }> {
    try {
      const user = this.auth.currentUser
      if (!user) {
        return { error: 'User not found' }
      }

      await updatePassword(user, newPassword)
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }

    return {}
  }

  async updateEmail({
    newEmail,
  }: UpdateEmailParams): Promise<{ error?: string }> {
    try {
      const user = this.auth.currentUser

      if (!user) {
        return { error: 'User not found' }
      }

      await updateEmail(user, newEmail)
      await sendEmailVerification(user)
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }

    return {}
  }

  async signOut(): Promise<{ error?: string }> {
    try {
      await signOut(this.auth)
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }

    return {}
  }

  private mapFirebaseUserToUser(firebaseUser: FirebaseUser): User {
    const email = firebaseUser.email ?? ''
    const displayName = firebaseUser.displayName
    const firstName = displayName?.split(',')[0] ?? ''
    const lastName = displayName?.split(',')[1] ?? ''
    const avatar = firebaseUser.photoURL || undefined

    return {
      id: firebaseUser.uid,
      name: `${firstName} ${lastName}`,
      avatar,
      firstName,
      lastName,
      email,
    }
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof FirebaseError) {
      return this.formatFirebaseErrorCode(error.code)
    }
    if (error instanceof Error) {
      return error.message
    }

    return 'Something went wrong'
  }

  private formatFirebaseErrorCode(errorCode: string): string {
    switch (errorCode) {
      case 'auth/invalid-credential':
        return 'Email or password is invalid'
      case 'auth/email-already-in-use':
        return 'Email already in use'
      case 'auth/invalid-email':
        return 'Invalid email'
      case 'auth/operation-not-allowed':
        return 'Operation not allowed'
      case 'auth/weak-password':
        return 'Weak password'
      case 'auth/user-disabled':
        return 'User disabled'
      case 'auth/user-not-found':
        return 'User not found'
      case 'auth/wrong-password':
        return 'Wrong password'
      default:
        return 'Something went wrong'
    }
  }
}

export default AuthApi
