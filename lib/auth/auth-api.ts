import "reflect-metadata"
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
} from "firebase/auth"
import firebaseApp from "../firebase/firebase-config"
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
  where,
  setDoc,
} from "firebase/firestore"
import type {
  ResetPasswordParams,
  SignInWithPasswordParams,
  SignUpParams,
  UpdatePasswordParams,
  UpdateEmailParams,
} from "./client"
import type { User, UserData } from "@/types/user"
import { FirebaseError } from "firebase/app"
import { UserRole } from "@/types/user-role"
import { injectable } from "inversify"

@injectable()
class AuthApi {
  userCollectionName = "users"
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

  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        params.email,
        params.password
      )
      await updateProfile(userCredential.user, {
        displayName: params.username,
      })

      const userData = {
        userID: userCredential.user.uid,
        email: params.email,
        username: params.username,
        role: params.role,
        contactInfo: params.contactInfo,
        supplierInfo: params.supplierInfo,
        designerInfo: params.designerInfo,
        preferences: params.preferences,
        createDate: serverTimestamp(),
        updateDate: serverTimestamp(),
      }

      await setDoc(
        doc(this.db, this.userCollectionName, userCredential.user.uid),
        userData
      )
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

      const userQuery = query(
        collection(this.db, this.userCollectionName),
        where("email", "==", email)
      )
      const userQuerySnapshot = await getDocs(userQuery)

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
      return { error: "Not logged in" }
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
        superAdmin: !!idTokenResult.claims.superAdmin,
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
        return { error: "User not found" }
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
        return { error: "User not found" }
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
    const email = firebaseUser.email ?? ""
    const username = firebaseUser.displayName
    const avatar = firebaseUser.photoURL || undefined

    return {
      id: firebaseUser.uid,
      username,
      avatar,
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

    return "Something went wrong"
  }

  private formatFirebaseErrorCode(errorCode: string): string {
    switch (errorCode) {
      case "auth/invalid-credential":
        return "Email or password is invalid"
      case "auth/email-already-in-use":
        return "Email already in use"
      case "auth/invalid-email":
        return "Invalid email"
      case "auth/operation-not-allowed":
        return "Operation not allowed"
      case "auth/weak-password":
        return "Weak password"
      case "auth/user-disabled":
        return "User disabled"
      case "auth/user-not-found":
        return "User not found"
      case "auth/wrong-password":
        return "Wrong password"
      default:
        return "Something went wrong"
    }
  }

  async createUser(
    userData: UserData
  ): Promise<{ error?: string; id?: string }> {
    try {
      const docRef = await addDoc(
        collection(this.db, this.userCollectionName),
        {
          ...userData,
          createdDate: serverTimestamp(),
          updatedDate: serverTimestamp(),
        }
      )
      return { id: docRef.id }
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }
  }

  async getUserById(
    userId: string
  ): Promise<{ data?: UserData; error?: string }> {
    try {
      const q = query(
        collection(this.db, this.userCollectionName),
        where("userID", "==", userId)
      )
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        return { error: "User not found" }
      }

      const userData = querySnapshot.docs[0].data() as UserData
      return { data: userData }
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }
  }

  async getAllUsers(): Promise<{ data?: UserData[]; error?: string }> {
    try {
      const querySnapshot = await getDocs(
        collection(this.db, this.userCollectionName)
      )
      const users = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      })) as UserData[]

      return { data: users }
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }
  }

  async updateUser(
    userId: string,
    userData: Partial<UserData>
  ): Promise<{ error?: string }> {
    try {
      const q = query(
        collection(this.db, this.userCollectionName),
        where("userID", "==", userId)
      )
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        return { error: "User not found" }
      }

      await updateDoc(querySnapshot.docs[0].ref, {
        ...userData,
        updatedAt: serverTimestamp(),
      })

      return {}
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }
  }

  async deleteUser(userId: string): Promise<{ error?: string }> {
    try {
      const q = query(
        collection(this.db, this.userCollectionName),
        where("userID", "==", userId)
      )
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        return { error: "User not found" }
      }

      await deleteDoc(querySnapshot.docs[0].ref)
      return {}
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }
  }
}

export default AuthApi
